<script setup lang="ts">
/*
 * Documents — ported from the approved canvas artboard `Documents.dc.html`.
 *
 * Upload first, archive second. The reason is the red row in the table: when a
 * scan comes back unreadable the only thing the buyer needs is the drop zone,
 * and burying it under their four existing documents is what makes people
 * phone the sales office instead.
 *
 * The drop zone is a real `<input type="file">` behind a label, so it works
 * from the keyboard; the drag handlers only add the same files the picker
 * would. Nothing is uploaded anywhere yet — `accept` is the contract the
 * endpoint will have to honour (ADR-002).
 */
import { accountDocuments } from '~/utils/account'

const dragging = ref(false)
const staged = ref<string[]>([])

const toneClass: Record<string, string> = {
  success: 'bg-status-success text-white',
  error: 'bg-status-error text-white',
  tint: 'bg-tint text-ink',
}

function accept(files: FileList | null) {
  if (!files) return
  staged.value = Array.from(files).map(f => f.name)
}

function onDrop(event: DragEvent) {
  dragging.value = false
  accept(event.dataTransfer?.files ?? null)
}
</script>

<template>
  <div class="flex flex-col gap-space-lg">
    <div>
      <h1 class="mb-[6px] text-headline-lg font-normal">مدارک</h1>
      <p class="text-body-lg text-text-muted">یک مدرک ناقص است.</p>
    </div>

    <p class="rounded-md border border-border border-r-4 border-r-primary bg-white px-[20px] py-space-md text-body-sm text-text-muted">
      مدارک شما رمزنگاری‌شده نگهداری می‌شوند و فقط کارشناس پرونده‌تان به آن‌ها دسترسی دارد.
    </p>

    <!-- upload -->
    <section class="rounded-md border border-border bg-white p-space-lg">
      <h2 class="mb-space-md text-headline-sm font-headline-sm">بارگذاری مدرک</h2>

      <div
        class="flex flex-col items-center gap-[12px] rounded-md border-2 border-dashed px-space-lg py-[40px] text-center transition-colors"
        :class="dragging ? 'border-primary bg-tint/40' : 'border-border'"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="onDrop"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" class="text-text-muted">
          <path d="M12 16V4m0 0L8 8m4-4 4 4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" stroke-linecap="round" />
        </svg>

        <p class="text-body-md font-label-lg">فایل را اینجا رها کنید</p>
        <p class="num text-body-sm text-text-muted">PDF یا JPG · حداکثر ۱۰ مگابایت</p>

        <label
          for="docfile"
          class="mt-1 cursor-pointer rounded-pill bg-primary px-space-lg py-[12px] text-label-lg font-label-lg text-white transition-colors hover:bg-primary-hover"
        >
          انتخاب فایل
        </label>
        <input
          id="docfile"
          name="docfile"
          type="file"
          accept="application/pdf,image/jpeg"
          class="sr-only"
          @change="accept(($event.target as HTMLInputElement).files)"
        >

        <p v-if="staged.length" class="text-body-sm font-label-lg text-status-success">
          انتخاب‌شده: {{ staged.join('، ') }}
        </p>
      </div>
    </section>

    <!-- archive -->
    <section class="overflow-hidden rounded-md border border-border bg-white">
      <h2 class="border-b border-border px-space-lg py-[20px] text-headline-sm font-headline-sm">مدارک من</h2>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[620px] border-collapse text-right text-body-sm">
          <thead>
            <tr class="bg-surface">
              <th scope="col" class="border-b border-border px-space-lg py-[14px] font-label-lg">عنوان</th>
              <th scope="col" class="border-b border-border px-space-md py-[14px] font-label-lg">پرونده</th>
              <th scope="col" class="border-b border-border px-space-md py-[14px] font-label-lg">تاریخ</th>
              <th scope="col" class="border-b border-border px-space-md py-[14px] font-label-lg">وضعیت</th>
              <th scope="col" class="border-b border-border px-space-lg py-[14px] font-label-lg">اقدام</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doc, i) in accountDocuments" :key="doc.title">
              <td
                class="px-space-lg py-space-md font-label-lg"
                :class="i < accountDocuments.length - 1 && 'border-b border-border'"
              >{{ doc.title }}</td>
              <td
                class="num px-space-md py-space-md text-text-muted"
                :class="i < accountDocuments.length - 1 && 'border-b border-border'"
              >{{ doc.order }}</td>
              <td
                class="num px-space-md py-space-md text-text-muted"
                :class="i < accountDocuments.length - 1 && 'border-b border-border'"
              >{{ doc.date }}</td>
              <td
                class="px-space-md py-space-md"
                :class="i < accountDocuments.length - 1 && 'border-b border-border'"
              >
                <span
                  class="rounded-pill px-[12px] py-1 text-label-md font-label-lg"
                  :class="toneClass[doc.tone]"
                >{{ doc.status }}</span>
              </td>
              <td
                class="px-space-lg py-space-md"
                :class="i < accountDocuments.length - 1 && 'border-b border-border'"
              >
                <button type="button" class="font-label-lg text-primary hover:underline">{{ doc.action }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
