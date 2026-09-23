<script setup lang="ts">
import type { CalendarEventViewModel } from '~/types/content'
import { calendarEventTypeLabels } from '~/utils/calendarData'

defineProps<{ events: CalendarEventViewModel[] }>()
</script>

<template>
  <div class="calendar-index">
    <header class="calendar-index__header">
      <h1>تقویم اطلاع‌رسانی و مجامع عمومی</h1>
      <p>تقویم رویدادهای افشای اطلاعات، گزارش‌های فصلی و مجامع عمومی هلدینگ ثاخت.</p>
    </header>

    <ul v-if="events.length" class="calendar-index__list">
      <li v-for="event in events" :key="event.title" class="calendar-index__row">
        <span class="calendar-index__date">{{ event.jalaliDate }}</span>
        <span class="calendar-index__type" :class="`calendar-index__type--${event.type}`">
          {{ calendarEventTypeLabels[event.type] }}
        </span>
        <component :is="event.href ? 'a' : 'span'" :href="event.href" class="calendar-index__title">
          {{ event.title }}
        </component>
      </li>
    </ul>
    <p v-else class="calendar-index__empty">رویدادی برای نمایش وجود ندارد.</p>
  </div>
</template>

<style scoped>
.calendar-index__header { padding-block: var(--space-4) var(--space-4); max-inline-size: 720px; }
.calendar-index__header h1 { font: var(--text-h2); margin-block-end: var(--space-2); }
.calendar-index__header p { font: var(--text-body); color: var(--color-text-muted); }

.calendar-index__list { display: flex; flex-direction: column; border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; margin-block-end: var(--space-8); }
.calendar-index__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-white);
}
.calendar-index__row + .calendar-index__row { border-block-start: 1px solid var(--color-border); }
.calendar-index__date { font: var(--text-label); color: var(--color-text); min-inline-size: 90px; }
.calendar-index__type { font: var(--text-label); padding: 2px var(--space-1); background: var(--color-surface); color: var(--color-text-muted); white-space: nowrap; }
.calendar-index__type--assembly { background: var(--color-tint); color: var(--color-primary); }
.calendar-index__type--disclosure { background: var(--badge-completed-bg); color: var(--badge-completed-text); }
.calendar-index__title { font: var(--text-body-sm); color: var(--color-text); text-decoration: none; flex: 1; }
a.calendar-index__title:hover { color: var(--color-primary); }
.calendar-index__empty { font: var(--text-body); color: var(--color-text-muted); padding-block: var(--space-6); }
</style>
