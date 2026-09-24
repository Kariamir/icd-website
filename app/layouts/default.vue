<template>
  <div class="app-shell">
    <a href="#main" class="app-shell__skip">پرش به محتوای اصلی</a>
    <SiteHeader />
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.app-shell {
  min-block-size: 100vh;
  display: flex;
  flex-direction: column;
}
.app-shell main {
  flex: 1;
  outline: none;
}
.app-shell__skip {
  position: absolute;
  inset-block-start: var(--space-1);
  inset-inline-start: var(--space-1);
  z-index: 70;
  padding: var(--space-1) var(--space-2);
  background: var(--color-ink);
  color: var(--color-white);
  border-radius: var(--radius-pill);
  font: var(--text-label);
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform 160ms ease;
}
.app-shell__skip:focus { transform: none; }
</style>
