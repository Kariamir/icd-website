<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { searchSite, searchContentTypeLabels } from '~/utils/searchData'

const props = defineProps<{ initialQuery: string }>()

const query = ref(props.initialQuery)
const results = computed(() => searchSite(query.value))

watch(() => props.initialQuery, (next) => {
  query.value = next
})
</script>

<template>
  <div class="search-results">
    <header class="search-results__header">
      <h1>جستجوی سایت</h1>
      <form class="search-results__form" @submit.prevent>
        <input
          v-model="query"
          type="search"
          placeholder="جستجوی پروژه‌ها، اخبار، افراد و صفحات..."
          aria-label="جستجو در سایت"
        >
      </form>
    </header>

    <p v-if="!query.trim()" class="search-results__hint">عبارت مورد نظر خود را برای جستجو در سایت وارد کنید.</p>
    <p v-else-if="!results.length" class="search-results__hint">نتیجه‌ای برای «{{ query }}» یافت نشد.</p>

    <ul v-else class="search-results__list">
      <li v-for="item in results" :key="item.href + item.title" class="search-results__item">
        <NuxtLink :to="item.href">
          <span class="search-results__type">{{ searchContentTypeLabels[item.contentType] }}</span>
          <h2>{{ item.title }}</h2>
          <p v-if="item.excerpt">{{ item.excerpt }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-results__header { padding-block: var(--space-4) var(--space-3); max-inline-size: 720px; }
.search-results__header h1 { font: var(--text-h2); margin-block-end: var(--space-3); }
.search-results__form input {
  inline-size: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  padding: var(--space-2) var(--space-3);
  font: var(--text-body);
  border-radius: var(--radius-none);
}
.search-results__form input:focus { outline: 2px solid var(--color-primary); outline-offset: 2px; }

.search-results__hint { font: var(--text-body); color: var(--color-text-muted); padding-block: var(--space-4); }

.search-results__list { display: flex; flex-direction: column; border: 1px solid var(--color-border); margin-block: var(--space-3) var(--space-8); }
.search-results__item + .search-results__item { border-block-start: 1px solid var(--color-border); }
.search-results__item a { display: block; padding: var(--space-2) var(--space-3); background: var(--color-white); text-decoration: none; color: inherit; }
.search-results__item a:hover { background: var(--color-surface); }
.search-results__type { font: var(--text-label); color: var(--color-primary); }
.search-results__item h2 { font: var(--text-h3); margin-block: 4px; }
.search-results__item p { font: var(--text-body-sm); color: var(--color-text-muted); }
</style>
