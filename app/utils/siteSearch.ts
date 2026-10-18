/**
 * Site-wide search over the local catalog (ADR-015) — projects, companies,
 * units, media posts, IR documents and the main pages. Replaced by the
 * WordPress search endpoint once it exists (technical-requirements §7).
 *
 * Matching normalises Arabic/Persian letter variants and ignores the
 * zero-width non-joiner (نیم‌فاصله), so «پیش فروش» finds «پیش‌فروش»
 * (build checklist Phase 7).
 */
import { projects, companies, units, projectStatus, getProject, priceLabel } from '~/utils/catalog'
import { posts } from '~/utils/posts'
import { irDocuments } from '~/utils/irDocuments'
import { mediaCategories, documentGroups } from '~/utils/routes'

export type SearchType = 'projects' | 'companies' | 'units' | 'media' | 'documents' | 'pages'

export const searchTypes: { value: SearchType, label: string }[] = [
  { value: 'projects', label: 'پروژه‌ها' },
  { value: 'companies', label: 'شرکت‌ها' },
  { value: 'units', label: 'واحدهای فروش' },
  { value: 'media', label: 'رسانه' },
  { value: 'documents', label: 'اسناد و گزارش‌ها' },
  { value: 'pages', label: 'صفحات' },
]

export interface SearchHit {
  type: SearchType
  title: string
  text: string
  href: string
  meta: string
  image?: string
  /** For sorting by newest — yyyymmdd where known. */
  sortKey: number
}

const PAGES: SearchHit[] = [
  { type: 'pages', title: 'درباره ثاخت', text: 'تاریخچه، خانواده ثاخت، هیات‌مدیره، کمیته‌ها و چشم‌انداز', href: '/about', meta: 'صفحه', sortKey: 0 },
  { type: 'pages', title: 'فرصت‌های همکاری و استخدام', text: 'ارسال رزومه، مزایا، آموزش و پرسش‌های متداول', href: '/careers', meta: 'صفحه', sortKey: 0 },
  { type: 'pages', title: 'اطلاعات نماد ثاخت در بورس', text: 'قیمت، حجم معاملات و سابقه سود نماد', href: '/ir/symbol', meta: 'دیده‌بان ثاخت', sortKey: 0 },
  { type: 'pages', title: 'تقویم مجامع و اطلاع‌رسانی', text: 'مجامع عمومی، پرداخت سود و دوره‌های سکوت', href: '/ir/calendar', meta: 'دیده‌بان ثاخت', sortKey: 0 },
  { type: 'pages', title: 'گزارش‌ها و اطلاعیه‌های رسمی', text: 'صورت‌های مالی، گزارش هیات‌مدیره، گزارش کمیته‌ها و اطلاعیه‌های کدال', href: '/ir/financials#documents-archive', meta: 'دیده‌بان ثاخت', sortKey: 0 },
  { type: 'pages', title: 'پرسش‌های متداول سهامداران', text: 'سود سهام، سجام، مجامع و پیش‌فروش', href: '/ir/faq', meta: 'دیده‌بان ثاخت', sortKey: 0 },
  { type: 'pages', title: 'راهنمای خرید و قرارداد', text: 'مراحل پیش‌خرید، قرارداد، پرداخت و تحویل', href: '/sales/guide', meta: 'فروش', sortKey: 0 },
  { type: 'pages', title: 'درخواست مشاوره خرید', text: 'مشاوره رایگان خرید و سرمایه‌گذاری', href: '/sales/consultation', meta: 'فروش', sortKey: 0 },
  { type: 'pages', title: 'تماس با ما', text: 'تلفن، نشانی دفاتر و واحدهای پاسخگو', href: '/contact', meta: 'صفحه', sortKey: 0 },
  { type: 'pages', title: 'شکایات و پیشنهادات', text: 'سامانه رسیدگی با کد رهگیری', href: '/complaints', meta: 'صفحه', sortKey: 0 },
]

let index: (SearchHit & { haystack: string })[] | null = null

export function normalise(s: string) {
  return s
    .replace(/ي/g, 'ی').replace(/ى/g, 'ی').replace(/ك/g, 'ک').replace(/ة/g, 'ه')
    .replace(/[‌‏‎]/g, ' ')
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim()
}

function build() {
  const all: SearchHit[] = [
    ...projects.map(p => ({ type: 'projects' as const, title: p.name, text: p.excerpt, href: `/projects/${p.slug}`, meta: `${projectStatus[p.status].short} · ${p.city}`, image: p.image, sortKey: p.year * 10000 })),
    ...companies.map(c => ({ type: 'companies' as const, title: c.name, text: c.summary, href: `/companies/${c.slug}`, meta: c.specialty, image: c.image, sortKey: 0 })),
    ...units.map(u => ({ type: 'units' as const, title: u.title, text: `${getProject(u.project)?.name ?? ''} · ${u.usage} · ${u.facing}`, href: `/sales/units/${u.id}`, meta: priceLabel(u.price), image: u.image, sortKey: 0 })),
    ...posts.map(p => ({ type: 'media' as const, title: p.title, text: p.excerpt, href: `/media/${p.slug}`, meta: `${mediaCategories.find(m => m.value === p.category)?.label} · ${p.date}`, image: p.image, sortKey: p.sortKey })),
    ...irDocuments.map(d => ({ type: 'documents' as const, title: d.title, text: d.summary[0] ?? '', href: `/ir/financials/${d.slug}`, meta: `${documentGroups.find(g => g.value === d.group)?.label} · ${d.date}`, sortKey: d.sortKey })),
    ...PAGES,
  ]
  return all.map(h => ({ ...h, haystack: normalise(`${h.title} ${h.text} ${h.meta}`) }))
}

export function search(q: string): SearchHit[] {
  index ??= build()
  const terms = normalise(q).split(' ').filter(t => t.length > 1)
  if (!terms.length) return []
  return index
    .map(h => ({ h, score: terms.reduce((s, t) => s + (h.haystack.includes(t) ? (normalise(h.title).includes(t) ? 3 : 1) : 0), 0), all: terms.every(t => h.haystack.includes(t)) }))
    .filter(x => x.all)
    .sort((a, b) => b.score - a.score)
    .map(x => x.h)
}

export const searchSuggestions = ['برج بین‌المللی تهران', 'پیش‌فروش', 'مگاپارس', 'مجمع', 'کیش', 'صورت‌های مالی']
