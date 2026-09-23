<script setup lang="ts">
import type { BoardMemberViewModel } from '~/types/content'

defineProps<{ member: BoardMemberViewModel }>()
</script>

<template>
  <article class="board-member">
    <nav class="board-member__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span>/</span>
      <NuxtLink to="/about/board">مدیران و اعضای هیات‌مدیره</NuxtLink>
      <span>/</span>
      <span>{{ member.name }}</span>
    </nav>

    <div class="board-member__layout">
      <div v-if="member.image" class="board-member__media">
        <BaseImage :src="member.image.src" :alt="member.image.alt || member.name" />
      </div>
      <div class="board-member__body">
        <h1>{{ member.name }}</h1>
        <p class="board-member__role">{{ member.role }}</p>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="board-member__bio" v-html="member.bioHtml" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.board-member__breadcrumb { display: flex; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.board-member__breadcrumb a { color: inherit; text-decoration: none; }
.board-member__breadcrumb a:hover { color: var(--color-primary); }

.board-member__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-4); padding-block: var(--space-3) var(--space-8); max-inline-size: 880px; }
@media (min-width: 640px) { .board-member__layout { grid-template-columns: 220px 1fr; } }
.board-member__media { aspect-ratio: 1 / 1; inline-size: 100%; max-inline-size: 220px; border: 1px solid var(--color-border); overflow: hidden; }
.board-member__media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.board-member__body h1 { font: var(--text-h2); margin-block-end: var(--space-1); }
.board-member__role { font: var(--text-label); color: var(--color-primary); margin-block-end: var(--space-3); }
.board-member__bio { font: var(--text-body); color: var(--color-text-muted); }
</style>
