<script setup lang="ts">
import { ref } from 'vue'

export interface LeadFormField {
  key: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
}

const props = withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  slaBadge?: string
  fields?: LeadFormField[]
}>(), {
  fields: () => [
    { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true, placeholder: 'مثال: علی رضایی' },
    { key: 'phone', label: 'شماره تماس', type: 'tel', required: true, placeholder: '۰۹xxxxxxxxx' },
    { key: 'email', label: 'پست الکترونیکی', type: 'email', placeholder: 'example@domain.com' },
    { key: 'message', label: 'متن پیام', type: 'textarea', required: true, placeholder: 'درخواست یا پرسش خود را بنویسید...' },
  ],
})

const submitted = ref(false)

function handleSubmit() {
  // No backend yet (docs/decisions.md ADR-002) — visual confirmation only.
  submitted.value = true
}
</script>

<template>
  <div class="lead-form">
    <header class="lead-form__header">
      <span v-if="props.eyebrow" class="lead-form__eyebrow">{{ props.eyebrow }}</span>
      <h1 class="lead-form__title">{{ props.title }}</h1>
      <p v-if="props.description" class="lead-form__description">{{ props.description }}</p>
      <span v-if="props.slaBadge" class="lead-form__sla">{{ props.slaBadge }}</span>
    </header>

    <div class="lead-form__panel">
      <p v-if="submitted" class="lead-form__success" role="status">
        پیام شما با موفقیت ثبت شد. کارشناسان مربوطه در اسرع وقت با شما تماس خواهند گرفت.
      </p>
      <form v-else class="lead-form__form" @submit.prevent="handleSubmit">
        <label v-for="field in props.fields" :key="field.key" class="lead-form__field" :class="{ 'lead-form__field--wide': field.type === 'textarea' }">
          <span>{{ field.label }}<span v-if="field.required" class="lead-form__required">*</span></span>
          <textarea v-if="field.type === 'textarea'" :required="field.required" :placeholder="field.placeholder" rows="4" />
          <select v-else-if="field.type === 'select'" :required="field.required">
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>
          <input v-else :type="field.type" :required="field.required" :placeholder="field.placeholder">
        </label>

        <label class="lead-form__field lead-form__field--wide lead-form__consent">
          <input type="checkbox">
          <span>با قوانین حریم خصوصی و شرایط استفاده از اطلاعات موافقم.</span>
        </label>

        <BaseButton type="submit" size="lg">ثبت و ارسال درخواست</BaseButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.lead-form__header { text-align: center; max-inline-size: 640px; margin-inline: auto; padding-block: var(--space-6) var(--space-4); }
.lead-form__eyebrow {
  display: inline-block;
  padding: 4px var(--space-2);
  background: var(--color-tint);
  color: var(--color-primary);
  font: var(--text-label);
  margin-block-end: var(--space-2);
}
.lead-form__title { font: var(--text-h2); }
.lead-form__description { font: var(--text-body); color: var(--color-text-muted); margin-block-start: var(--space-2); }
.lead-form__sla {
  display: inline-block;
  margin-block-start: var(--space-2);
  padding: 4px var(--space-2);
  background: var(--badge-under-construction-bg);
  color: var(--badge-under-construction-text);
  font: var(--text-label);
}

.lead-form__panel {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: var(--space-3);
  max-inline-size: 760px;
  margin-inline: auto;
  margin-block-end: var(--space-8);
}
@media (min-width: 768px) { .lead-form__panel { padding: var(--space-6); } }

.lead-form__form { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 640px) { .lead-form__form { grid-template-columns: 1fr 1fr; } }
.lead-form__field { display: flex; flex-direction: column; gap: 6px; font: var(--text-label); }
.lead-form__field--wide { grid-column: 1 / -1; }
.lead-form__field input,
.lead-form__field select,
.lead-form__field textarea {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-1) var(--space-2);
  font: var(--text-body-sm);
  border-radius: var(--radius-xs);
  font-family: inherit;
}
.lead-form__required { color: var(--color-danger); margin-inline-start: 4px; }
.lead-form__consent { flex-direction: row; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); }
.lead-form__success {
  grid-column: 1 / -1;
  padding: var(--space-3);
  background: var(--color-tint);
  color: var(--color-primary);
  font: var(--text-body);
  text-align: center;
}
</style>
