<script setup lang="ts">
import type { FaqGroupViewModel } from '~/utils/faqData'

// Grouped accordion from `project_detail_page_template/05d_faq_accordion`:
// a dot + title header per group, and per item a topic chip, the question,
// and a +/× toggle; the open item gets a brand-blue border. Pure UI — the
// filtering (tabs/search) lives in the parent (`FaqCenter.vue`).
const props = defineProps<{
  groups: FaqGroupViewModel[]
  /** Item opened on first render; defaults to the first item. */
  defaultOpenId?: string
}>()

const uid = useId()
const openIds = reactive(new Set<string>())
const initial = props.defaultOpenId ?? props.groups[0]?.items[0]?.id
if (initial) openIds.add(initial)

function toggle(id: string) {
  if (openIds.has(id)) openIds.delete(id)
  else openIds.add(id)
}
</script>

<template>
  <div class="faq-accordion">
    <section v-for="group in groups" :key="group.key" class="faq-accordion__group" :aria-labelledby="`${uid}-${group.key}`">
      <h2 :id="`${uid}-${group.key}`" class="faq-accordion__group-title">
        <span class="faq-accordion__group-dot" aria-hidden="true" />
        {{ group.title }}
      </h2>
      <div
        v-for="item in group.items"
        :key="item.id"
        class="faq-accordion__item"
        :class="{ 'is-open': openIds.has(item.id) }"
      >
        <button
          :id="`${uid}-${item.id}-q`"
          type="button"
          class="faq-accordion__trigger"
          :aria-expanded="openIds.has(item.id)"
          :aria-controls="`${uid}-${item.id}-a`"
          @click="toggle(item.id)"
        >
          <span class="faq-accordion__question">
            <span class="faq-accordion__tag">{{ item.tag }}</span>
            {{ item.question }}
          </span>
          <span class="faq-accordion__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </button>
        <div
          :id="`${uid}-${item.id}-a`"
          class="faq-accordion__panel"
          role="region"
          :aria-labelledby="`${uid}-${item.id}-q`"
          :aria-hidden="!openIds.has(item.id)"
        >
          <div class="faq-accordion__panel-inner">
            <p class="faq-accordion__answer">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-accordion { display: flex; flex-direction: column; gap: var(--space-6); }
.faq-accordion__group { display: flex; flex-direction: column; gap: 12px; }
.faq-accordion__group-title { display: flex; align-items: center; gap: 10px; padding-block-end: var(--space-1); border-block-end: 1px solid var(--color-border); font: 700 18px/1.5 var(--font-body); color: var(--color-ink); }
.faq-accordion__group-dot { inline-size: 10px; block-size: 10px; border-radius: 50%; background: var(--color-brand-blue); flex-shrink: 0; }

.faq-accordion__item { overflow: hidden; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-white); box-shadow: 0 1px 2px rgb(4 28 44 / 5%); transition: border-color 200ms ease; }
.faq-accordion__item:hover { border-color: color-mix(in srgb, var(--color-brand-blue) 35%, var(--color-border)); }
.faq-accordion__item.is-open { border-color: color-mix(in srgb, var(--color-brand-blue) 45%, transparent); }

.faq-accordion__trigger { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); inline-size: 100%; padding: var(--space-2) 20px; border: none; background: none; color: var(--color-ink); font: 600 15px/1.7 var(--font-body); text-align: start; cursor: pointer; }
.faq-accordion__trigger:focus-visible { outline: 2px solid var(--color-brand-blue); outline-offset: -2px; border-radius: var(--radius-md); }
.faq-accordion__item.is-open .faq-accordion__trigger { color: var(--color-brand-blue); font-weight: 700; }
.faq-accordion__question { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); }
.faq-accordion__tag { flex-shrink: 0; padding: 2px 8px; border-radius: var(--radius-xs); background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; font-weight: 400; }
.faq-accordion__item.is-open .faq-accordion__tag { background: var(--color-tint); color: var(--color-brand-blue); font-weight: 600; }
.faq-accordion__icon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; inline-size: 28px; block-size: 28px; border-radius: 50%; background: var(--color-surface); color: var(--color-text-muted); transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms ease, color 200ms ease; }
.faq-accordion__item.is-open .faq-accordion__icon { transform: rotate(45deg); background: var(--color-tint); color: var(--color-brand-blue); }

.faq-accordion__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 350ms ease-out; }
.faq-accordion__item.is-open .faq-accordion__panel { grid-template-rows: 1fr; }
.faq-accordion__panel-inner { min-block-size: 0; overflow: hidden; }
.faq-accordion__answer { margin: 0 20px; padding-block: var(--space-1) 20px; border-block-start: 1px solid var(--color-surface-alt); font: var(--text-body-sm); line-height: 1.9; color: var(--color-text-muted); opacity: 0; transition: opacity 250ms ease-in-out; }
.faq-accordion__item.is-open .faq-accordion__answer { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .faq-accordion__panel, .faq-accordion__answer, .faq-accordion__icon { transition: none; }
}
</style>
