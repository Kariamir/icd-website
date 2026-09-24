/**
 * Mock content for /about/honors — placeholder pending the real WordPress
 * data layer (ADR-002).
 */
import type { HonorViewModel } from '~/types/content'

const IMG = (seed: string) => ({ src: `https://picsum.photos/seed/${seed}/480/320`, alt: '' })

export const honors: HonorViewModel[] = [
  { title: 'گواهینامه سیستم مدیریت کیفیت ISO 9001', year: '۱۴۰۲', issuer: 'مرکز صدور گواهینامه بین‌المللی', image: IMG('honor-1') },
  { title: 'تندیس زرین کیفیت ساخت ملی', year: '۱۴۰۱', issuer: 'همایش ملی صنعت ساختمان', image: IMG('honor-2') },
  { title: 'عضویت رسمی انجمن سازندگان و انبوه‌سازان مسکن', year: '۱۳۹۸', issuer: 'انجمن انبوه‌سازان مسکن', image: IMG('honor-3') },
  { title: 'گواهی رعایت استانداردهای HSE کارگاهی', year: '۱۴۰۲', issuer: 'وزارت کار و رفاه اجتماعی', image: IMG('honor-4') },
  { title: 'لوح تقدیر شفافیت گزارش‌گری مالی بورس تهران', year: '۱۴۰۳', issuer: 'سازمان بورس و اوراق بهادار', image: IMG('honor-5') },
]

// ---------------------------------------------------------------------------
// Template `02a-index-card-grid` for /about/honors — extra records
// (placeholder pending WordPress) and index fields for the category / scope /
// year filters and sort. Add-only.
// ---------------------------------------------------------------------------

honors.push(
  { title: 'گواهینامه سیستم مدیریت زیست‌محیطی ISO 14001', year: '۱۴۰۱', issuer: 'مرکز صدور گواهینامه بین‌المللی', image: IMG('honor-6') },
  { title: 'جایزه معماری پایدار برج بین‌المللی تهران', year: '۱۴۰۳', issuer: 'جایزه ملی معماری و شهرسازی', image: IMG('honor-7') },
  { title: 'عضویت در شورای جهانی ساختمان سبز', year: '۱۴۰۰', issuer: 'World Green Building Council', image: IMG('honor-8') },
  { title: 'تندیس انبوه‌ساز نمونه کشور', year: '۱۴۰۰', issuer: 'وزارت راه و شهرسازی', image: IMG('honor-9') },
  { title: 'گواهینامه ایمنی و بهداشت شغلی ISO 45001', year: '۱۴۰۳', issuer: 'مرکز صدور گواهینامه بین‌المللی', image: IMG('honor-10') },
  { title: 'لوح تقدیر مسئولیت اجتماعی شرکتی', year: '۱۳۹۹', issuer: 'اتاق بازرگانی ایران', image: IMG('honor-11') },
  { title: 'عضویت در انجمن بین‌المللی مدیریت پروژه', year: '۱۳۹۷', issuer: 'Project Management Institute', image: IMG('honor-12') },
)

export const HONOR_CATEGORIES = ['گواهینامه', 'جایزه و تندیس', 'عضویت', 'لوح تقدیر'] as const
export type HonorCategory = typeof HONOR_CATEGORIES[number]

interface HonorIndexFields { category: HonorCategory; scope: 'ملی' | 'بین‌المللی'; yearNum: number }

const faToNum = (s: string) => Number(s.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))))

function classify(h: HonorViewModel): HonorIndexFields {
  const category: HonorCategory = h.title.startsWith('گواهی')
    ? 'گواهینامه'
    : h.title.startsWith('عضویت')
      ? 'عضویت'
      : h.title.startsWith('لوح')
        ? 'لوح تقدیر'
        : 'جایزه و تندیس'
  const scope = /ISO|World|International|بین‌المللی/.test(`${h.title} ${h.issuer}`) ? 'بین‌المللی' : 'ملی'
  return { category, scope, yearNum: faToNum(h.year) }
}

export function getHonorIndexFields(h: HonorViewModel): HonorIndexFields {
  return classify(h)
}
