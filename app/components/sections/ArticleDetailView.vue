<script setup lang="ts">
import type { ArticleDetailViewModel } from '~/types/content'

const props = defineProps<{ article: ArticleDetailViewModel; hubLabel: string; hubHref: string }>()
</script>

<template>
  <div class="article-detail">
    <nav class="article-detail__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span>/</span>
      <NuxtLink :to="hubHref">{{ hubLabel }}</NuxtLink>
      <span>/</span>
      <span class="article-detail__breadcrumb-current">{{ props.article.title }}</span>
    </nav>

    <div class="article-detail__layout">
      <article class="article-detail__main">
        <div class="article-detail__meta-row">
          <span v-if="props.article.category" class="article-detail__category">{{ props.article.category }}</span>
          <span v-if="props.article.date" class="article-detail__date">{{ props.article.date }}</span>
        </div>

        <h1 class="article-detail__title">{{ props.article.title }}</h1>
        <p v-if="props.article.excerpt" class="article-detail__excerpt">{{ props.article.excerpt }}</p>

        <div v-if="props.article.image" class="article-detail__cover">
          <BaseImage :src="props.article.image.src" :alt="props.article.image.alt || props.article.title" />
        </div>

        <div v-if="props.article.audioUrl" class="article-detail__audio">
          <div class="article-detail__audio-label">
            <span>نسخه شنیداری مقاله</span>
          </div>
          <audio :src="props.article.audioUrl" controls class="article-detail__audio-player" />
        </div>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="article-detail__body" v-html="props.article.bodyHtml" />

        <div class="article-detail__comment-form">
          <h3>دیدگاه و پرسش‌های تخصصی شما</h3>
          <p class="article-detail__comment-hint">نظرات و سوالات شما پس از تایید مدیر سامانه نمایش داده خواهد شد.</p>
          <form class="article-detail__form" @submit.prevent>
            <div class="article-detail__form-row">
              <label>
                <span>نام و نام خانوادگی</span>
                <input type="text" placeholder="مثلاً: علی محمدی">
              </label>
              <label>
                <span>پست الکترونیکی</span>
                <input type="email" placeholder="example@domain.com">
              </label>
            </div>
            <label>
              <span>متن دیدگاه یا پرسش</span>
              <textarea rows="4" placeholder="دیدگاه تخصصی خود را بنویسید..." />
            </label>
            <BaseButton type="submit">ثبت و ارسال دیدگاه</BaseButton>
          </form>
        </div>
      </article>

      <aside class="article-detail__sidebar">
        <div v-if="props.article.related.length" class="article-detail__sidebar-box">
          <h3>مطالب مرتبط</h3>
          <ul class="article-detail__related-list">
            <li v-for="item in props.article.related" :key="item.slug">
              <NuxtLink :to="`${hubHref}/${item.slug}`">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="article-detail__sidebar-box article-detail__sidebar-box--cta">
          <span class="article-detail__cta-eyebrow">فرصت سرمایه‌گذاری</span>
          <h3>علاقه‌مند به دریافت اطلاعات پروژه‌های ثاخت هستید؟</h3>
          <p>کاتالوگ تخصصی و شرایط پیش‌فروش را از کارشناسان فروش دریافت نمایید.</p>
          <BaseButton :href="'/sales/consultation'" variant="inverse">درخواست مشاوره</BaseButton>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.article-detail__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font: var(--text-body-sm);
  color: var(--color-text-muted);
  padding-block: var(--space-2);
}
.article-detail__breadcrumb a { color: inherit; text-decoration: none; }
.article-detail__breadcrumb a:hover { color: var(--color-primary); }
.article-detail__breadcrumb-current { color: var(--color-text); font-weight: 600; }

.article-detail__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  padding-block: var(--space-4) var(--space-8);
}
@media (min-width: 1024px) {
  .article-detail__layout { grid-template-columns: 2fr 1fr; align-items: start; }
}

.article-detail__main {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: var(--space-3);
}
@media (min-width: 768px) { .article-detail__main { padding: var(--space-6); } }

.article-detail__meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-block-end: var(--space-2);
}
.article-detail__category {
  padding: 4px var(--space-2);
  background: var(--color-tint);
  color: var(--color-primary);
  font: var(--text-label);
}
.article-detail__date { font: var(--text-body-sm); color: var(--color-text-muted); }

.article-detail__title { font: var(--text-h2); margin-block-end: var(--space-2); }
.article-detail__excerpt {
  font: var(--text-body);
  color: var(--color-text-muted);
  padding-block-end: var(--space-3);
  border-block-end: 1px solid var(--color-border);
  margin-block-end: var(--space-3);
}

.article-detail__cover { margin-block-end: var(--space-3); border: 1px solid var(--color-border); }
.article-detail__cover :deep(img) { inline-size: 100%; block-size: auto; display: block; }

.article-detail__audio {
  margin-block-end: var(--space-4);
  padding: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
.article-detail__audio-label { font: var(--text-label); color: var(--color-primary); margin-block-end: var(--space-1); }
.article-detail__audio-player { inline-size: 100%; }

.article-detail__body { font: var(--text-body); color: var(--color-text); }
.article-detail__body :deep(h2) { font: var(--text-h3); margin-block: var(--space-4) var(--space-1); border-inline-start: 4px solid var(--color-primary); padding-inline-start: var(--space-1); }
.article-detail__body :deep(h3) { font: var(--text-h3); margin-block: var(--space-3) var(--space-1); }
.article-detail__body :deep(p) { margin-block-end: var(--space-2); }
.article-detail__body :deep(blockquote) {
  margin-block: var(--space-3);
  padding: var(--space-3);
  background: var(--color-tint);
  border-inline-start: 4px solid var(--color-primary);
  font-weight: 700;
}
.article-detail__body :deep(ul) { margin-block: var(--space-2); padding-inline-start: var(--space-3); display: flex; flex-direction: column; gap: 6px; }

.article-detail__comment-form { margin-block-start: var(--space-6); padding-block-start: var(--space-4); border-block-start: 1px solid var(--color-border); }
.article-detail__comment-hint { font: var(--text-body-sm); color: var(--color-text-muted); margin-block: var(--space-1) var(--space-3); }
.article-detail__form { display: flex; flex-direction: column; gap: var(--space-2); }
.article-detail__form-row { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }
@media (min-width: 640px) { .article-detail__form-row { grid-template-columns: 1fr 1fr; } }
.article-detail__form label { display: flex; flex-direction: column; gap: 6px; font: var(--text-label); }
.article-detail__form input,
.article-detail__form textarea {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-1) var(--space-2);
  font: var(--text-body-sm);
  border-radius: var(--radius-none);
}

.article-detail__sidebar { display: flex; flex-direction: column; gap: var(--space-3); }
.article-detail__sidebar-box { background: var(--color-white); border: 1px solid var(--color-border); padding: var(--space-3); }
.article-detail__sidebar-box h3 { font: var(--text-h3); margin-block-end: var(--space-2); }
.article-detail__related-list { display: flex; flex-direction: column; gap: var(--space-1); }
.article-detail__related-list a { color: var(--color-text); text-decoration: none; font: var(--text-body-sm); }
.article-detail__related-list a:hover { color: var(--color-primary); }

.article-detail__sidebar-box--cta { background: var(--color-ink); color: var(--color-white); }
.article-detail__cta-eyebrow { display: inline-block; font: var(--text-label); color: var(--color-tint); margin-block-end: var(--space-1); }
.article-detail__sidebar-box--cta p { font: var(--text-body-sm); color: var(--color-surface); margin-block: var(--space-1) var(--space-3); }
</style>
