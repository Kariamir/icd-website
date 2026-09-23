<script setup lang="ts">
import { footerColumns, legalNav, routes } from '~/utils/routes'

const familyColumn = footerColumns[4]

// Placeholder subsidiary list — replace with the real `Company`/`Project`
// query per docs/technical-requirements-icd3d.md §11 open question 1 (Option
// A vs B) once the client confirms the content model.
const subsidiaries = [
  { name: 'رویای کیش', href: routes.company('royaye-kish') },
  { name: 'عفاف‌آباد شیراز', href: routes.company('afafabad-shiraz') },
  { name: 'نارنجستان ایزدشهر', href: routes.company('narenjestan-izadshahr') },
  { name: 'آ.اس.پ مشهد', href: routes.company('asp-mashhad') },
  { name: 'آ.اس.پ تهران', href: routes.company('asp-tehran') },
  { name: 'مگاپارس تهران', href: routes.company('megapars-tehran') },
  { name: 'برج بین‌المللی تهران', href: routes.company('tehran-international-tower') },
  { name: 'مجتمع ساحل نوشهر', href: routes.company('sahel-nowshahr') },
]
</script>

<template>
  <footer class="site-footer">
    <BaseContainer>
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <p class="site-footer__logo">ثاخت</p>
          <p class="site-footer__intro">
            هلدینگ ساخت‌وساز و املاک ثاخت — توسعه پروژه‌های نهادی از ۱۳۶۴.
          </p>
          <address>تهران، ایران</address>
        </div>

        <div v-for="(col, i) in footerColumns.slice(1, 4)" :key="i" class="site-footer__col">
          <p class="site-footer__heading">{{ col.heading }}</p>
          <NuxtLink v-for="item in col.items" :key="item.href" :to="item.href" class="site-footer__link">
            {{ item.label }}
          </NuxtLink>
        </div>

        <div class="site-footer__col">
          <p class="site-footer__heading">{{ familyColumn?.heading }}</p>
          <div class="site-footer__subsidiaries">
            <NuxtLink v-for="s in subsidiaries" :key="s.href" :to="s.href" class="site-footer__link">
              {{ s.name }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p>© {{ new Date().getFullYear() }} ثاخت</p>
        <nav aria-label="لینک‌های حقوقی">
          <NuxtLink v-for="l in legalNav" :key="l.href" :to="l.href" class="site-footer__legal-link">
            {{ l.label }}
          </NuxtLink>
        </nav>
      </div>
    </BaseContainer>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-surface-alt);
  color: var(--color-ink);
  padding-block: var(--space-8);
  margin-block-start: var(--space-8);
}
.site-footer__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-4);
}
.site-footer__logo { font: var(--text-h3); font-weight: 700; margin-block-end: var(--space-1); }
.site-footer__intro { font: var(--text-body-sm); color: var(--color-text-muted); max-inline-size: 32ch; }
.site-footer__heading { font: var(--text-label); margin-block-end: var(--space-2); }
.site-footer__col { display: flex; flex-direction: column; }
.site-footer__link, .site-footer__legal-link {
  display: block;
  text-decoration: none;
  color: var(--color-ink);
  font: var(--text-body-sm);
  padding-block: 4px;
}
.site-footer__link:hover, .site-footer__legal-link:hover { color: var(--color-primary); }
.site-footer__subsidiaries { display: flex; flex-direction: column; }
.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  margin-block-start: var(--space-6);
  padding-block-start: var(--space-3);
  border-block-start: 1px solid var(--color-border);
  font: var(--text-body-sm);
}
.site-footer__bottom nav { display: flex; gap: var(--space-2); }

@media (max-width: 900px) {
  .site-footer__grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
