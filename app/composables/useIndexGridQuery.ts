import type { LocationQuery, LocationQueryRaw } from 'vue-router'
import type { ComputedRef, Ref } from 'vue'

/**
 * Shared state for the `02a-index-card-grid` family (project status indexes,
 * sales unit lists, board / honors / careers). Filters, sort and page live in
 * the URL query (docs/page-templates-icd3d.md §4: "real filter and pagination
 * on URL parameter"), so every filtered view is shareable and SSR-rendered.
 *
 * - `draft` is what the filter-panel controls are bound to; `apply()` commits
 *   it to the URL (the mockup's «اعمال فیلتر» button), `reset()` clears it.
 * - `setNow()` commits a single key immediately (sort pills).
 * - Values equal to their default are left out of the URL.
 */
export type IndexQueryValue = string | number

function first(raw: LocationQuery[string] | undefined): string | undefined {
  const v = Array.isArray(raw) ? raw[0] : raw
  return v == null ? undefined : String(v)
}

export function useIndexGridQuery<T extends Record<string, IndexQueryValue>>(defaults: T) {
  const route = useRoute()
  const router = useRouter()
  const keys = Object.keys(defaults) as (keyof T & string)[]

  function parse(query: LocationQuery): T {
    const out = { ...defaults }
    for (const k of keys) {
      const raw = first(query[k])
      if (raw === undefined || raw === '') continue
      if (typeof defaults[k] === 'number') {
        const n = Number(raw)
        if (Number.isFinite(n)) (out as Record<string, IndexQueryValue>)[k] = n
      }
      else {
        (out as Record<string, IndexQueryValue>)[k] = raw
      }
    }
    return out
  }

  const applied = computed(() => parse(route.query))
  const draft = reactive({ ...applied.value }) as T

  // Keep the draft in step with URL changes (back/forward, sort pills) without
  // discarding un-applied edits to other fields.
  watch(applied, (next, prev) => {
    for (const k of keys) {
      if (next[k] !== prev[k]) draft[k] = next[k]
    }
  })

  /** Build a query object for `values`, dropping defaults and the page. */
  function buildQuery(values: T, base: LocationQuery = route.query): LocationQueryRaw {
    const q: LocationQueryRaw = {}
    for (const [k, v] of Object.entries(base)) {
      if (k !== 'page' && !(keys as string[]).includes(k)) q[k] = v
    }
    for (const k of keys) {
      if (values[k] !== defaults[k]) q[k] = String(values[k])
    }
    return q
  }

  function apply() {
    return router.replace({ query: buildQuery(draft) })
  }

  function reset() {
    Object.assign(draft, defaults)
    return router.replace({ query: buildQuery(defaults) })
  }

  function setNow<K extends keyof T & string>(key: K, value: T[K]) {
    draft[key] = value
    return router.replace({ query: buildQuery({ ...applied.value, [key]: value }) })
  }

  const isDirty = computed(() => keys.some(k => draft[k] !== applied.value[k]))
  const activeCount = computed(() => keys.filter(k => applied.value[k] !== defaults[k]).length)

  return { applied, draft, apply, reset, setNow, buildQuery, isDirty, activeCount }
}

/**
 * Page-number pagination plus the mockup's «بارگذاری بیشتر» button. The page
 * number lives in `?page=`; «load more» appends the following page(s) below
 * the current one without changing the URL.
 */
export function useIndexGridPaging<I>(list: ComputedRef<I[]> | Ref<I[]>, pageSize: number) {
  const route = useRoute()
  const router = useRouter()
  const extraPages = ref(0)

  const pageCount = computed(() => Math.max(1, Math.ceil(list.value.length / pageSize)))
  const page = computed(() => {
    const n = Number(first(route.query.page))
    return Number.isFinite(n) ? Math.min(Math.max(1, Math.floor(n)), pageCount.value) : 1
  })
  const lastShownPage = computed(() => Math.min(page.value + extraPages.value, pageCount.value))
  const visible = computed(() => list.value.slice((page.value - 1) * pageSize, lastShownPage.value * pageSize))
  const canLoadMore = computed(() => lastShownPage.value < pageCount.value)

  watch(() => route.query, () => { extraPages.value = 0 })

  function goTo(n: number) {
    const target = Math.min(Math.max(1, n), pageCount.value)
    const query: LocationQueryRaw = { ...route.query }
    if (target === 1) delete query.page
    else query.page = String(target)
    extraPages.value = 0
    return router.replace({ query })
  }

  function loadMore() {
    if (canLoadMore.value) extraPages.value += 1
  }

  return { page, pageCount, lastShownPage, visible, canLoadMore, goTo, loadMore, pageSize }
}

/** Persian-digit number formatting shared by the index family. */
export function faNum(n: number) {
  return n.toLocaleString('fa-IR')
}
