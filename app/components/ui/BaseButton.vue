<script setup lang="ts">
import { NuxtLink } from '#components'

/**
 * CMS-agnostic primitive. Never fetches WordPress data.
 * Variants/radius/colors map 1:1 to docs/design-system-icd3d.md §4 — do not
 * introduce new colors or a border-radius here.
 */
withDefaults(defineProps<{
  variant?: 'primary' | 'inverse' | 'secondary' | 'disabled'
  size?: 'md' | 'lg'
  as?: 'button' | 'a' | 'NuxtLink'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  type: 'button',
  disabled: false,
})
</script>

<template>
  <component
    :is="href ? NuxtLink : as"
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
    :to="href"
    :type="!href ? type : undefined"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  font: var(--text-label);
  letter-spacing: 0;
  border-radius: var(--radius-none);
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background-color var(--motion-duration) var(--motion-ease),
              color var(--motion-duration) var(--motion-ease);
}

.base-button--md { padding-block: var(--space-2); padding-inline: var(--space-3); }
.base-button--lg { padding-block: var(--space-2); padding-inline: var(--space-4); font-size: 16px; }

.base-button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}
.base-button--primary:hover { background: var(--color-primary-hover); }

.base-button--inverse {
  background: var(--color-white);
  color: var(--color-primary);
}
.base-button--inverse:hover { background: var(--color-tint); }

.base-button--secondary {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.base-button--secondary:hover { background: var(--color-tint); }

.base-button--disabled,
.base-button[disabled] {
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
</style>
