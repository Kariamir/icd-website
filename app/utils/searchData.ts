/**
 * Client-side site search over the mock content built so far. This is a
 * real, working implementation (no backend needed) — unlike most other
 * *Data.ts files in this folder, it is not a placeholder: simple term
 * search over in-memory content is a reasonable v1 for a site this size,
 * and can be swapped for a real search index later without changing the
 * SearchResultViewModel contract consumed by the UI.
 *
 * Extended for template `10-search-results`
 * (project_detail_page_template/10_search_results): every entry also
 * carries the category tab it belongs to, a badge, a reference line,
 * a meta strip, an optional thumbnail, a year and a sort date — see
 * `SearchResultExtended`. `searchSite()` / `searchContentTypeLabels` keep
 * their original shape for existing callers.
 */
import type { SearchResultViewModel } from '~/types/content'
import { projects, getProjectDetail } from '~/utils/projectsData'
import { articles } from '~/utils/articlesData'
import { boardMembers } from '~/utils/boardData'
import { jobPostings } from '~/utils/careersData'
import { visionPage, csrPage } from '~/utils/editorialData'
import { units } from '~/utils/unitsData'
import { financialDocuments, governanceDocuments } from '~/utils/documentsData'
import { calendarEvents } from '~/utils/calendarData'

export type SearchCategory = 'projects' | 'units' | 'disclosures' | 'media' | 'governance' | 'careers'
export type SearchBadgeTone = 'blue' | 'green' | 'amber' | 'sky' | 'purple' | 'neutral'
export type SearchSortKey = 'relevance' | 'latest' | 'views'

export interface SearchResultExtended extends SearchResultViewModel {
  id: string
  category: SearchCategory
  badge: string
  badgeTone: SearchBadgeTone
  /** e.g. «کد پروژه: TIT-01» */
  refLabel?: string
  /** Coloured status line after the reference (progress, deadline…). */
  flag?: { text: string; tone: 'success' | 'primary' | 'error' | 'muted' }
  meta: string[]
  cta?: { label: string; href: string }
  image?: { src: string; alt: string; caption: string }
  /** Jalali year, when the item is dated. */
  year?: number
  /** Jalali yyyymmdd used for «جدیدترین» sorting (0 = undated). */
  dateKey: number
  /** Mock view counter for «پربازدیدترین». */
  views: number
  /** Extra searchable text that is not displayed. */
  keywords?: string
}

export const searchCategoryLabels: Record<SearchCategory, string> = {
  projects: 'پروژه‌ها و املاک',
  units: 'فروش و پیش‌فروش واحدها',
  disclosures: 'اطلاعیه‌ها و گزارش‌های کدال',
  media: 'اخبار و رسانه',
  governance: 'اسناد و حاکمیت شرکتی',
  careers: 'مناقصات و استخدام',
}

export const searchCategoryOrder: SearchCategory[] = ['projects', 'units', 'disclosures', 'media', 'governance', 'careers']

/** «پیشنهادهای پرتکرار» chips under the search box. */
export const searchSuggestions: { label: string; query: string }[] = [
  { label: 'پروژه مگاپارس', query: 'مگاپارس' },
  { label: 'اطلاعیه مجمع ۱۴۰۳', query: 'مجمع' },
  { label: 'واحدهای پنت‌هاوس', query: 'پنت‌هاوس' },
  { label: 'نماد ثاخت در بورس', query: 'بورس' },
  { label: 'صورت‌های مالی', query: 'صورت‌های مالی' },
  { label: 'سامانه مناقصات', query: 'مناقصه' },
]

// --- helpers -----------------------------------------------------------------

const toLatinDigits = (s: string) => s
  .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
  .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

export const toPersianDigits = (s: string | number) => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!)

/** Parse «۱۴۰۳/۰۸/۱۲» or any string containing a 4-digit Jalali year. */
function parseJalali(label?: string): { year?: number; dateKey: number } {
  if (!label) return { dateKey: 0 }
  const latin = toLatinDigits(label)
  const full = latin.match(/(1[34]\d{2})\/(\d{1,2})\/(\d{1,2})/)
  if (full) {
    const year = Number(full[1])
    return { year, dateKey: year * 10000 + Number(full[2]) * 100 + Number(full[3]) }
  }
  const yearOnly = latin.match(/1[34]\d{2}/)
  if (yearOnly) {
    const year = Number(yearOnly[0])
    return { year, dateKey: year * 10000 }
  }
  return { dateKey: 0 }
}

/** Deterministic pseudo view counter so SSR and client agree. */
function mockViews(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return 180 + (h % 4800)
}

const img = (seed: string, caption: string, alt = '') => ({ src: `https://picsum.photos/seed/${seed}/960/640`, alt, caption })

// Local mock entries for content types that have no page of their own yet
// (tenders, subsidiary companies) — so the «مناقصات» and «حاکمیت شرکتی»
// tabs have realistic rows. Replace with real WordPress queries later.
const tenderNotices = [
  {
    id: 'tender-22',
    title: 'فراخوان شناسایی و انتخاب پیمانکار اجرای نمای خشک پوسته دوم مگاپارس',
    excerpt: 'دعوت از شرکت‌های صاحب‌صلاحیت رتبه ۱ ابنیه و تاسیسات جهت شرکت در ارزیابی کیفی و پیشنهاد قیمت متناسب با دفترچه پیمان اختصاصی، همراه با تضمین‌نامه‌های بانکی معتبر.',
    number: 'ثاخت/۱۴۰۳/۲۲-م',
    deadline: 'مهلت دریافت اسناد: تا ۱۴۰۳/۰۸/۲۵',
    remaining: 'مهلت باقیمانده: ۱۲ روز',
  },
  {
    id: 'tender-19',
    title: 'مناقصه عمومی تامین و نصب آسانسورهای پرسرعت برج بین‌المللی تهران',
    excerpt: 'تامین، حمل، نصب و راه‌اندازی ۱۲ دستگاه آسانسور پرسرعت با سرعت اسمی ۶ متر بر ثانیه به همراه ۲۴ ماه خدمات پس از فروش.',
    number: 'ثاخت/۱۴۰۳/۱۹-ت',
    deadline: 'مهلت دریافت اسناد: تا ۱۴۰۳/۰۷/۳۰',
    remaining: 'مهلت باقیمانده: ۵ روز',
  },
  {
    id: 'tender-11',
    title: 'ارزیابی کیفی مهندسین مشاور نظارت عالیه پروژه عفاف‌آباد شیراز',
    excerpt: 'فراخوان ارزیابی کیفی مهندسین مشاور دارای رتبه ۱ ساختمان و شهرسازی جهت نظارت عالیه و کارگاهی فاز دوم مجتمع مسکونی عفاف‌آباد شیراز.',
    number: 'ثاخت/۱۴۰۲/۱۱-ن',
    deadline: 'مهلت دریافت اسناد: تا ۱۴۰۲/۱۲/۱۰',
    remaining: 'مهلت به پایان رسیده',
  },
]

const subsidiaries = [
  {
    id: 'asp-iran',
    title: 'شرکت آ.اس.پ ایران (مجری و بهره‌بردار مجتمع‌های تجاری آ.اس.پ)',
    excerpt: 'بازوی اجرایی هلدینگ در ساخت و بهره‌برداری مجتمع‌های تجاری و اداری آ.اس.پ تهران و مشهد، با تجربه در ابنیه سنگین بتنی و برج‌های ترکیبی.',
    ref: 'نماد بورسی: آ.س.پ',
    ownership: 'درصد مالکیت هلدینگ ثاخت: ۶۴.۲٪',
    field: 'حوزه تخصصی: ابنیه سنگین بتنی و مجتمع‌های تجاری',
  },
  {
    id: 'sakht-maskan-roya',
    title: 'شرکت ثاخت مسکن رویا (توسعه‌دهنده پروژه رویای کیش)',
    excerpt: 'شرکت تابعه مسئول مطالعات، طراحی و توسعه پروژه‌های مسکونی و گردشگری ساحلی هلدینگ در جزیره کیش و سواحل شمالی.',
    ref: 'شرکت سهامی خاص',
    ownership: 'درصد مالکیت هلدینگ ثاخت: ۸۰٪',
    field: 'حوزه تخصصی: مسکونی و گردشگری ساحلی',
  },
]

const mediaHref = (type: string, slug: string) =>
  `/media/${type === 'news' ? 'news' : type === 'story' ? 'stories' : 'reports'}/${slug}`

// --- index -------------------------------------------------------------------

function buildIndex(): SearchResultExtended[] {
  const results: SearchResultExtended[] = []

  for (const project of projects) {
    const detail = getProjectDetail(project.slug)
    if (!detail) continue
    const date = parseJalali(detail.year)
    results.push({
      id: `project-${project.slug}`,
      title: project.name,
      href: `/projects/${project.slug}`,
      excerpt: `${detail.category} با ${detail.area} زیربنا در ${detail.floors}، کاربری ${detail.usage}. ${detail.statusLabel} — ${detail.year}.`,
      contentType: 'project',
      category: 'projects',
      badge: detail.category,
      badgeTone: 'blue',
      refLabel: `کد پروژه: ${project.code}`,
      flag: detail.progressPercent !== undefined
        ? { text: `پیشرفت فیزیکی ${toPersianDigits(detail.progressPercent)}٪`, tone: 'success' }
        : { text: detail.statusLabel, tone: 'primary' },
      meta: [`موقعیت: ${detail.location}`, `زیربنا: ${detail.area}`, detail.year],
      cta: { label: 'مشاهده شناسنامه پروژه', href: `/projects/${project.slug}` },
      image: img(`search-${project.slug}`, 'نمای معماری پروژه', project.name),
      ...date,
      views: mockViews(project.slug),
      keywords: `${detail.usage} ${detail.ownerCompany ?? ''}`,
    })
  }

  for (const unit of units) {
    const cover = unit.gallery?.[0]
    results.push({
      id: `unit-${unit.id}`,
      title: `واحد ${unit.area} ${unit.projectTitle} — ${unit.floor}`,
      href: `/sales/units/${unit.id}`,
      excerpt: unit.description,
      contentType: 'project',
      category: 'units',
      badge: 'فروش و پیش‌فروش واحدها',
      badgeTone: 'green',
      refLabel: `کد ملک: UN-${unit.id}`,
      flag: { text: unit.status === 'available' ? 'آماده فروش' : unit.status === 'reserved' ? 'رزرو شده / پیش‌فروش' : 'فروخته شده', tone: unit.status === 'sold' ? 'muted' : 'primary' },
      meta: [`مساحت: ${unit.area}`, unit.orientation ? `جهت: ${unit.orientation}` : unit.floor, `قیمت: ${unit.priceLabel}`],
      cta: { label: 'مشاهده پلان و رزرو آنلاین', href: `/sales/units/${unit.id}` },
      image: cover ? { src: cover.src, alt: cover.alt || unit.projectTitle, caption: cover.caption ?? 'پلان معماری واحد' } : undefined,
      year: 1403,
      dateKey: 14030000,
      views: mockViews(unit.id),
      keywords: `${unit.projectTitle} ${unit.floor}`,
    })
  }

  for (const article of articles) {
    const date = parseJalali(article.date)
    results.push({
      id: `article-${article.slug}`,
      title: article.title,
      href: mediaHref(article.contentType, article.slug),
      excerpt: article.excerpt,
      contentType: 'news',
      category: 'media',
      badge: article.category ?? 'اخبار و رسانه',
      badgeTone: 'sky',
      refLabel: article.contentType === 'news' ? 'سرویس خبری' : article.contentType === 'story' ? 'روایت و داستان' : 'گزارش تحلیلی',
      flag: { text: 'زمان مطالعه: ۴ دقیقه', tone: 'muted' },
      meta: article.date ? [`تاریخ انتشار: ${article.date}`] : [],
      cta: { label: 'مشاهده متن کامل گزارش و تصاویر', href: mediaHref(article.contentType, article.slug) },
      image: article.image ? { src: article.image.src, alt: article.image.alt || article.title, caption: 'گزارش تصویری' } : undefined,
      ...date,
      views: mockViews(article.slug),
    })
  }

  for (const event of calendarEvents) {
    const date = parseJalali(event.jalaliDate)
    results.push({
      id: `event-${event.jalaliDate}-${event.type}`,
      title: event.title,
      href: '/ir/calendar',
      excerpt: 'اطلاعیه رسمی منتشرشده در سامانه کدال و تقویم رویدادهای سهامداران هلدینگ ثاخت.',
      contentType: 'report',
      category: 'disclosures',
      badge: event.type === 'disclosure' ? 'سامانه کدال — افشای اطلاعات بااهمیت' : event.type === 'assembly' ? 'اطلاعیه مجمع عمومی' : 'گزارش فصلی کدال',
      badgeTone: 'amber',
      refLabel: 'ناشر: ثاخت (ICD)',
      meta: [`تاریخ: ${event.jalaliDate}`, 'منبع: سامانه جامع اطلاع‌رسانی ناشران'],
      cta: { label: 'مشاهده در تقویم سهامداران', href: '/ir/calendar' },
      ...date,
      views: mockViews(event.title),
    })
  }

  for (const doc of financialDocuments) {
    const date = parseJalali(doc.year)
    results.push({
      id: `fin-${doc.title}`,
      title: doc.title,
      href: '/ir/financials',
      excerpt: 'نسخه رسمی و حسابرسی‌شده منتشرشده در سامانه کدال؛ قابل دریافت از بایگانی گزارش‌های مالی دیده‌بان ثاخت.',
      contentType: 'report',
      category: 'disclosures',
      badge: 'گزارش مالی و صورت‌های مالی',
      badgeTone: 'amber',
      refLabel: `سال مالی ${doc.year}`,
      meta: [`نوع فایل: ${doc.fileType}`, `دانلود پیوست ${doc.fileType} رسمی کدال (${doc.fileSizeLabel})`],
      ...date,
      views: mockViews(doc.title),
    })
  }

  for (const doc of governanceDocuments) {
    const date = parseJalali(doc.year)
    results.push({
      id: `gov-${doc.title}`,
      title: doc.title,
      href: '/ir/governance',
      excerpt: 'سند حاکمیت شرکتی هلدینگ ثاخت، منتشرشده برای اطلاع سهامداران و ذی‌نفعان در بخش دیده‌بان.',
      contentType: 'company',
      category: 'governance',
      badge: 'سند حاکمیت شرکتی',
      badgeTone: 'neutral',
      refLabel: `سال ${doc.year}`,
      meta: [`نوع فایل: ${doc.fileType}`, `حجم: ${doc.fileSizeLabel}`],
      ...date,
      views: mockViews(doc.title),
    })
  }

  for (const member of boardMembers) {
    results.push({
      id: `board-${member.slug}`,
      title: member.name,
      href: `/about/board/${member.slug}`,
      excerpt: `${member.role} هلدینگ ساختمانی ثاخت — سوابق، مسئولیت‌ها و حوزه‌های راهبری.`,
      contentType: 'company',
      category: 'governance',
      badge: 'هیات‌مدیره و مدیران ارشد',
      badgeTone: 'neutral',
      refLabel: member.role,
      meta: ['ترکیب هیات‌مدیره', 'حاکمیت شرکتی'],
      cta: { label: 'مشاهده پروفایل', href: `/about/board/${member.slug}` },
      image: member.image ? { src: member.image.src, alt: member.image.alt || member.name, caption: 'پروفایل مدیر' } : undefined,
      dateKey: 0,
      views: mockViews(member.slug),
    })
  }

  for (const company of subsidiaries) {
    results.push({
      id: `sub-${company.id}`,
      title: company.title,
      href: '/about',
      excerpt: company.excerpt,
      contentType: 'company',
      category: 'governance',
      badge: 'شرکت تابعه — گروه شرکت‌های ثاخت',
      badgeTone: 'neutral',
      refLabel: company.ref,
      flag: { text: 'بازوی اجرایی پروژه‌های ویژه', tone: 'success' },
      meta: [company.ownership, company.field],
      cta: { label: 'مشاهده پروفایل شرکت و پروژه‌ها', href: '/about' },
      image: img(`search-sub-${company.id}`, 'شناسه برند شرکت'),
      dateKey: 0,
      views: mockViews(company.id),
    })
  }

  for (const page of [visionPage, csrPage]) {
    results.push({
      id: `page-${page.title}`,
      title: page.title,
      href: page === visionPage ? '/about/vision' : '/about/csr',
      excerpt: page.intro,
      contentType: 'report',
      category: 'governance',
      badge: 'محتوای شرکت',
      badgeTone: 'neutral',
      refLabel: 'درباره ثاخت',
      meta: ['صفحه سازمانی'],
      dateKey: 0,
      views: mockViews(page.title),
    })
  }

  for (const tender of tenderNotices) {
    const date = parseJalali(tender.deadline)
    results.push({
      id: tender.id,
      title: tender.title,
      href: '/contact',
      excerpt: tender.excerpt,
      contentType: 'job',
      category: 'careers',
      badge: 'مناقصه عمومی و ارزیابی کیفی',
      badgeTone: 'purple',
      refLabel: `شماره مناقصه: ${tender.number}`,
      flag: { text: tender.remaining, tone: tender.remaining.includes('پایان') ? 'muted' : 'error' },
      meta: [tender.deadline, 'دبیرخانه: شرکت بین‌المللی توسعه ساختمان (ثاخت)', 'سامانه ستاد / پرتال تدارکات ثاخت'],
      cta: { label: 'اعلام آمادگی از طریق فرم پیمانکاران', href: '/contact' },
      ...date,
      views: mockViews(tender.id),
      keywords: 'مناقصه مناقصات پیمانکار تدارکات',
    })
  }

  for (const job of jobPostings) {
    results.push({
      id: `job-${job.slug}`,
      title: job.title,
      href: '/careers',
      excerpt: job.summary,
      contentType: 'job',
      category: 'careers',
      badge: 'فرصت شغلی',
      badgeTone: 'purple',
      refLabel: job.department,
      flag: { text: 'در حال جذب', tone: 'success' },
      meta: [`محل کار: ${job.location}`, `نوع همکاری: ${job.employmentType}`],
      cta: { label: 'ارسال رزومه', href: '/careers' },
      year: 1403,
      dateKey: 14030000,
      views: mockViews(job.slug),
      keywords: 'استخدام فرصت شغلی همکاری',
    })
  }

  return results
}

const searchIndex = buildIndex()

export const searchContentTypeLabels: Record<SearchResultViewModel['contentType'], string> = {
  project: 'پروژه',
  news: 'رسانه',
  report: 'محتوای شرکت',
  company: 'هیات‌مدیره',
  job: 'فرصت شغلی',
}

// --- query handling ------------------------------------------------------------

/** 1:1 character normalisation (keeps string indices stable for highlighting). */
const normalize = (s: string) => s.replace(/ي/g, 'ی').replace(/ك/g, 'ک').toLowerCase()

const STOP_WORDS = new Set(['و', 'در', 'از', 'به', 'با', 'را', 'که', 'برای', 'این', 'آن', 'یا', 'تا'])

/** Split a query into meaningful terms (drops Persian stop words). */
export function tokenizeQuery(query: string): string[] {
  const terms = normalize(query.trim())
    .split(/[\s،,؛;:.!?؟«»"()]+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t))
  return Array.from(new Set(terms))
}

function scoreItem(item: SearchResultExtended, terms: string[], phrase: string): { score: number; matched: number } {
  const title = normalize(item.title)
  const excerpt = normalize(item.excerpt ?? '')
  const extra = normalize(`${item.badge} ${item.refLabel ?? ''} ${item.meta.join(' ')} ${item.keywords ?? ''}`)
  let score = 0
  let matched = 0
  for (const term of terms) {
    const before = score
    if (title.includes(term)) score += 3
    if (excerpt.includes(term)) score += 2
    if (extra.includes(term)) score += 1
    if (score > before) matched++
  }
  if (score && phrase.length > 1 && (title.includes(phrase) || excerpt.includes(phrase))) score += 5
  return { score, matched }
}

/**
 * Full search used by /search. An empty query returns the whole index
 * («browse all») with score 0. Otherwise items matching *every* term are
 * returned; if nothing matches all terms, it falls back to items matching
 * at least one term. Each result carries a relevance score.
 */
export function searchSiteDetailed(query: string): { item: SearchResultExtended; score: number }[] {
  const terms = tokenizeQuery(query)
  if (!terms.length) return searchIndex.map(item => ({ item, score: 0 }))
  const phrase = normalize(query.trim())
  const scored = searchIndex
    .map(item => ({ item, ...scoreItem(item, terms, phrase) }))
    .filter(r => r.score > 0)
  const all = scored.filter(r => r.matched === terms.length)
  return (all.length ? all : scored).map(({ item, score }) => ({ item, score }))
}

/** Original API: matching results for a non-empty query, best first. */
export function searchSite(query: string): SearchResultViewModel[] {
  if (!query.trim()) return []
  return searchSiteDetailed(query)
    .sort((a, b) => b.score - a.score)
    .map(r => r.item)
}

export function sortSearchResults(results: { item: SearchResultExtended; score: number }[], sort: SearchSortKey) {
  return [...results].sort((a, b) => {
    if (sort === 'latest') return b.item.dateKey - a.item.dateKey || b.score - a.score
    if (sort === 'views') return b.item.views - a.item.views
    return b.score - a.score || b.item.dateKey - a.item.dateKey
  })
}

/** Distinct Jalali years present in the index, newest first. */
export const searchYears: number[] = Array.from(new Set(searchIndex.map(i => i.year).filter((y): y is number => !!y)))
  .sort((a, b) => b - a)

export const searchIndexSize = searchIndex.length

/** Split `text` into plain / matched segments for safe <mark> rendering. */
export function highlightSegments(text: string, terms: string[]): { text: string; match: boolean }[] {
  if (!terms.length || !text) return [{ text, match: false }]
  const haystack = normalize(text)
  const ranges: [number, number][] = []
  for (const term of terms) {
    let from = 0
    while (from < haystack.length) {
      const at = haystack.indexOf(term, from)
      if (at === -1) break
      ranges.push([at, at + term.length])
      from = at + term.length
    }
  }
  if (!ranges.length) return [{ text, match: false }]
  ranges.sort((a, b) => a[0] - b[0])
  const merged: [number, number][] = []
  for (const r of ranges) {
    const last = merged[merged.length - 1]
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1])
    else merged.push([...r])
  }
  const segments: { text: string; match: boolean }[] = []
  let cursor = 0
  for (const [start, end] of merged) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), match: false })
    segments.push({ text: text.slice(start, end), match: true })
    cursor = end
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false })
  return segments
}
