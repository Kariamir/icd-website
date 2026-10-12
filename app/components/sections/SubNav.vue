<script setup lang="ts">
/*
 * Cluster tab strip under the hero (ADR-015). Keeps every page of a cluster
 * one click apart — the sales and IR clusters each have one designed landing
 * page plus sub-pages that would otherwise be reachable only from the menu.
 *
 * An item matches on path and, when its href carries a query, on that query
 * too, so «پیش‌فروش» (/sales?status=pre-sale) and «همه واحدها» (/sales)
 * highlight correctly on the same route.
 */
import type { NavItem } from '~/utils/routes'

const props = defineProps<{ items: NavItem[], label: string }>()
const route = useRoute()

function isActive(href: string) {
  const [path, qs] = href.split('?') as [string, string | undefined]
  if (route.path !== path) return false
  const want = new URLSearchParams(qs ?? '')
  const keys = new Set([...want.keys(), ...props.items.flatMap(i => [...new URLSearchParams(i.href.split('?')[1] ?? '').keys()])])
  for (const k of keys) {
    if ((want.get(k) ?? '') !== String(route.query[k] ?? '')) return false
  }
  return true
}
</script>

<template>
  <nav class="sticky top-20 z-40 border-b border-border bg-surface-container-lowest/95 backdrop-blur" :aria-label="label">
    <ul class="mx-auto flex w-full max-w-[1440px] gap-1 overflow-x-auto px-space-lg [scrollbar-width:none] md:px-margin">
      <li v-for="item in items" :key="item.href" class="shrink-0">
        <NuxtLink
          :to="item.href"
          class="relative flex h-14 items-center px-4 text-label-lg font-label-lg transition-colors"
          :class="isActive(item.href) ? 'text-primary-container' : 'text-secondary hover:text-ink'"
          :aria-current="isActive(item.href) ? 'page' : undefined"
        >
          {{ item.label }}
          <span v-if="isActive(item.href)" class="absolute inset-x-4 bottom-0 h-0.5 rounded-pill bg-primary-container" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
