<script setup lang="ts">
// Homepage — 9 fixed blocks per docs/01-sitemap.md v1.5 §3.1. Blocks 0-8 map
// 1:1 to the sections below; do not reorder or drop a block without sitemap
// approval. v1.4 removed the CEO message block (ADR-010); v1.5 moved
// «خانواده ثاخت» up to block 2, before the featured projects (ADR-011).
const { hero, stats, featuredProjects, news, subsidiaries } = useHomeContent()

useSeoMeta({
  title: 'ثاخت — هلدینگ ساخت‌وساز و املاک',
  description: hero.description,
})
</script>

<template>
  <div class="home">
    <!-- Block 0: هیرو -->
    <HeroSection :hero="hero" three-d />

    <!-- Block 1: ثاخت در یک نگاه -->
    <StatBar :stats="stats" />

    <!-- Block 2: خانواده ثاخت — before the projects (ADR-011) -->
    <BaseContainer class="home__section">
      <h2 class="home__heading">خانواده ثاخت</h2>
      <ul class="home__subsidiaries">
        <li v-for="s in subsidiaries" :key="s">
          <NuxtLink to="/companies" class="home__subsidiary">{{ s }}</NuxtLink>
        </li>
      </ul>
    </BaseContainer>

    <!-- Block 3: پروژه‌های شاخص -->
    <BaseContainer class="home__section">
      <h2 class="home__heading">پروژه‌های شاخص</h2>
      <div class="home__project-row">
        <ProjectCard v-for="p in featuredProjects" :key="p.slug" :project="p" />
      </div>
      <BaseButton href="/projects" variant="secondary">مشاهده همه پروژه‌ها</BaseButton>
    </BaseContainer>

    <!-- Block 4: بنر فروش و پیش‌فروش -->
    <CtaSection title="پیش‌فروش پروژه‌های در حال ساخت آغاز شد" :action="{ label: 'مشاوره خرید', href: '/sales/consultation' }" />

    <!-- Block 5: ویجت دیده‌بان ثاخت -->
    <BaseContainer class="home__section">
      <h2 class="home__heading">دیده‌بان ثاخت</h2>
      <!-- Live price widget — needs the /ir/symbol data source (server-side
           polling per docs/technical-requirements-icd3d.md §6); tracked in
           the Project Progress Checklist under IR. -->
      <p class="home__placeholder">ویجت قیمت لحظه‌ای نماد ثاخت + آخرین اطلاعیه کدال (در انتظار اتصال داده).</p>
      <BaseButton href="/ir" variant="secondary">اطلاعات سرمایه‌گذاران</BaseButton>
    </BaseContainer>


    <!-- Block 6: نبض ثاخت -->
    <BaseContainer class="home__section">
      <h2 class="home__heading">نبض ثاخت</h2>
      <div class="home__news-row">
        <article v-for="n in news" :key="n.slug" class="home__news-card">
          <p class="home__news-type">{{ n.contentType }}</p>
          <h3>{{ n.title }}</h3>
          <p class="home__news-date isolate-ltr">{{ n.date }}</p>
        </article>
      </div>
      <BaseButton href="/media?category=news" variant="secondary">مشاهده همه اخبار</BaseButton>
    </BaseContainer>

    <!-- Block 7: افتخارات و اعتماد (trust signal only — no CTA) -->
    <section class="home__honors">
      <BaseContainer>
        <p class="home__honors-label">عضو هلدینگ غدیر · پذیرفته‌شده در بورس اوراق بهادار تهران</p>
      </BaseContainer>
    </section>


    <!-- Block 8: بنر پایانی مشاوره + خبرنامه -->
    <CtaSection title="برای مشاوره سرمایه‌گذاری با ما در تماس باشید" :action="{ label: 'درخواست مشاوره', href: '/sales/consultation' }" />
  </div>
</template>

<style scoped>
.home__section { padding-block: var(--space-6); }
.home__heading { font: var(--text-h2); font-size: 28px; margin-block-end: var(--space-3); }
.home__project-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-block-end: var(--space-3); }
.home__placeholder { color: var(--color-text-muted); font: var(--text-body-sm); margin-block-end: var(--space-2); }
.home__news-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-block-end: var(--space-3); }
.home__news-card { border: 1px solid var(--color-border); padding: var(--space-3); }
.home__news-type { font: var(--text-label); color: var(--color-primary); margin-block-end: 4px; }
.home__news-date { font: var(--text-body-sm); color: var(--color-text-muted); display: block; margin-block-start: 4px; }
.home__honors { background: var(--color-surface-alt); padding-block: var(--space-4); }
.home__honors-label { text-align: center; font: var(--text-body-sm); color: var(--color-text-muted); }
.home__subsidiaries { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2); }
.home__subsidiary { display: block; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-3) var(--space-2); text-align: center; font: var(--text-body-sm); color: var(--color-ink); text-decoration: none; transition: border-color .15s, color .15s; }
.home__subsidiary:hover { border-color: var(--color-primary); color: var(--color-primary); }

@media (max-width: 900px) {
  .home__project-row, .home__news-row { grid-template-columns: 1fr; }
  .home__subsidiaries { grid-template-columns: repeat(2, 1fr); }
}
</style>
