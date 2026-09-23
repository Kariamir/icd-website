<script setup lang="ts">
import type { TimelineEraViewModel } from '~/utils/timelineData'

defineProps<{ eras: TimelineEraViewModel[] }>()
</script>

<template>
  <div class="history-timeline">
    <header class="history-timeline__header">
      <h1>معرفی شرکت و تاریخچه</h1>
      <p>مروری بر مسیر چهار دهه‌ای هلدینگ ساختمانی ثاخت، از تاسیس تا امروز.</p>
    </header>

    <div class="history-timeline__eras">
      <section v-for="era in eras" :id="era.id" :key="era.id" class="history-timeline__era">
        <div class="history-timeline__era-badge">
          <span class="history-timeline__era-label">{{ era.label }}</span>
          <span class="history-timeline__era-years">{{ era.yearRange }}</span>
          <span class="history-timeline__era-description">{{ era.description }}</span>
        </div>

        <ol class="history-timeline__items">
          <li v-for="item in era.items" :key="item.title" class="history-timeline__item">
            <div class="history-timeline__item-meta">
              <span class="history-timeline__item-tag">{{ item.tag }}</span>
              <span class="history-timeline__item-years">{{ item.yearRange }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="item.bodyHtml" />
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
.history-timeline__header { max-inline-size: 760px; padding-block: var(--space-6) var(--space-4); }
.history-timeline__header h1 { font: var(--text-h2); margin-block-end: var(--space-2); }
.history-timeline__header p { font: var(--text-body); color: var(--color-text-muted); }

.history-timeline__eras {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  border-inline-start: 2px solid var(--color-border);
  padding-inline-start: var(--space-4);
  margin-inline-start: var(--space-1);
  padding-block-end: var(--space-8);
}

.history-timeline__era-badge {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  background: var(--color-ink);
  color: var(--color-white);
  padding: var(--space-2) var(--space-3);
  margin-inline-start: calc(-1 * var(--space-4) - 1px);
  margin-block-end: var(--space-3);
}
.history-timeline__era-label { font: var(--text-label); color: var(--color-tint); }
.history-timeline__era-years { font: 700 24px/1.2 var(--font-body); }
.history-timeline__era-description { font: var(--text-body-sm); color: var(--color-surface); }

.history-timeline__items { display: flex; flex-direction: column; gap: var(--space-3); }
.history-timeline__item {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
}
.history-timeline__item-meta { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-2); }
.history-timeline__item-tag { font: var(--text-label); color: var(--color-primary); background: var(--color-tint); padding: 2px var(--space-1); }
.history-timeline__item-years { font: var(--text-label); color: var(--color-text); }
.history-timeline__item h3 { font: var(--text-h3); margin-block-end: var(--space-1); }
.history-timeline__item :deep(p) { font: var(--text-body-sm); color: var(--color-text-muted); }
</style>
