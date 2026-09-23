<script setup lang="ts">
// Nuxt's global error page — covers both /404 and /500 (docs/page-templates
// -icd3d.md #18 "11-error-system"). The 500 branch must render with zero
// WebGL/3D per docs/01-sitemap.md §9 and §12 row 52.
const props = defineProps<{ error: { statusCode: number; message?: string } }>()

const is404 = computed(() => props.error.statusCode === 404)

const popularLinks = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'پروژه‌ها', href: '/projects' },
  { label: 'دیده‌بان ثاخت', href: '/ir' },
  { label: 'تماس با ما', href: '/contact' },
]

function reset() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <BaseContainer class="error-page">
      <p class="error-page__code isolate-ltr">{{ error.statusCode }}</p>
      <h1 class="error-page__title">
        {{ is404 ? 'صفحه مورد نظر یافت نشد' : 'خطایی در سرور رخ داد' }}
      </h1>
      <p class="error-page__desc">
        {{ is404
          ? 'ممکن است آدرس اشتباه وارد شده باشد یا صفحه جابه‌جا شده باشد.'
          : 'لطفاً چند لحظه دیگر دوباره تلاش کنید.' }}
      </p>

      <form class="error-page__search" role="search" @submit.prevent="navigateTo(`/search`)">
        <label for="error-search" class="visually-hidden">جستجو در سایت</label>
        <input id="error-search" type="search" placeholder="جستجو در ثاخت" name="q">
        <BaseButton type="submit">جستجو</BaseButton>
      </form>

      <nav aria-label="صفحات پرتردد" class="error-page__links">
        <NuxtLink v-for="l in popularLinks" :key="l.href" :to="l.href" @click.prevent="reset(); navigateTo(l.href)">
          {{ l.label }}
        </NuxtLink>
      </nav>
    </BaseContainer>
  </NuxtLayout>
</template>

<style scoped>
.error-page { padding-block: var(--space-12); text-align: center; }
.error-page__code { font: var(--text-h1-mobile); color: var(--color-primary); }
.error-page__title { font: var(--text-h2); margin-block: var(--space-2); }
.error-page__desc { color: var(--color-text-muted); margin-block-end: var(--space-4); }
.error-page__search { display: flex; gap: var(--space-1); justify-content: center; margin-block-end: var(--space-4); }
.error-page__search input {
  font: var(--text-body-sm);
  border: 1px solid var(--color-border);
  padding-inline: var(--space-2);
  min-inline-size: 240px;
}
.error-page__links { display: flex; gap: var(--space-3); justify-content: center; }
.error-page__links a { color: var(--color-primary); text-decoration: none; font: var(--text-body-sm); }
</style>
