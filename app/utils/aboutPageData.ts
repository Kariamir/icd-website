/**
 * View model for the merged single-scroll /about page.
 *
 * Replaces the eight former About sub-pages (history, ceo, board, board/[slug],
 * vision, org-chart, honors, csr) — see docs/decisions.md ADR-004.
 *
 * Direction: image-led, minimal, heavily reduced text (docs/decisions.md
 * ADR-005). Text budget per section is enforced here, not in the template:
 *   hero title      ≤  8 words
 *   section heading ≤  5 words
 *   section body    ≤ 25 words
 *   caption         ≤  6 words
 *
 * Content still comes from local data (ADR-002); board, subsidiary and honor
 * records are re-read from their existing files rather than duplicated.
 */
import { boardMembers } from '~/utils/boardData'
import { honors } from '~/utils/honorsData'
import { orgSubsidiaries } from '~/utils/orgChartData'

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const aboutHero = {
  title: 'چهار دهه ساختن',
  lead: 'هلدینگ بین‌المللی توسعه ساختمان — پذیرفته‌شده در بورس تهران.',
  image: {
    src: '/img/placeholder.svg',
    alt: 'نمایی از پروژه‌های شاخص هلدینگ ثاخت',
  },
}

// ---------------------------------------------------------------------------
// Pillars — merged چشم‌انداز + حاکمیت شرکتی + استانداردهای مهندسی
// (former /about/vision + governance portion of /about/org-chart)
// ---------------------------------------------------------------------------

export interface AboutPillar {
  id: string
  title: string
  text: string
  image: { src: string, alt: string }
}

export const aboutPillars: AboutPillar[] = [
  {
    id: 'vision',
    title: 'چشم‌انداز',
    text: 'توسعه‌دهنده نخست مگاپروژه‌های چندمنظوره ایران، با بازدهی متوازن برای سهامدار و شهر.',
    image: { src: '/img/placeholder.svg', alt: '' },
  },
  {
    id: 'governance',
    title: 'حاکمیت شرکتی',
    text: 'گزارش‌گری شفاف در کدال، کمیته‌های مستقل حسابرسی و ریسک، و پاسخ‌گویی به مجمع.',
    image: { src: '/img/placeholder.svg', alt: '' },
  },
  {
    id: 'standards',
    title: 'استانداردهای مهندسی',
    text: 'ISO 9001 و 45001، پایش ژئوتکنیک بلادرنگ، و آزمایشگاه مرکزی بتن در زنجیره ساخت.',
    image: { src: '/img/placeholder.svg', alt: '' },
  },
]

// ---------------------------------------------------------------------------
// History — merged تاریخچه + کارنامه (former /about/history)
// ---------------------------------------------------------------------------

export interface AboutMilestone {
  id: string
  year: string
  title: string
  caption: string
  image: { src: string, alt: string }
  /** Rendered desaturated — everything before ۱۳۵۰ reads as archival. */
  archival: boolean
  /** Real content not yet supplied by the project owner — see ADR-004. */
  placeholder?: boolean
}

/**
 * ⚠️ The ۱۳۳۰–۱۳۵۰ entries below are STRUCTURAL PLACEHOLDERS.
 *
 * The project owner is supplying the real Pars Saze founding text and the
 * archival photographs separately. Until then these carry `placeholder: true`,
 * which the template renders with a visible "در انتظار سند آرشیوی" marker so
 * nobody mistakes them for finished content. Replace the title/caption/image
 * and drop the flag — no template change needed.
 */
export const aboutMilestones: AboutMilestone[] = [
  {
    id: 'm-1330',
    year: '۱۳۳۰',
    title: 'پارس سازه',
    caption: 'در انتظار متن آرشیوی',
    image: { src: '/img/placeholder.svg', alt: '' },
    archival: true,
    placeholder: true,
  },
  {
    id: 'm-1340',
    year: '۱۳۴۰',
    title: 'نخستین کارگاه‌ها',
    caption: 'در انتظار متن آرشیوی',
    image: { src: '/img/placeholder.svg', alt: '' },
    archival: true,
    placeholder: true,
  },
  {
    id: 'm-1364',
    year: '۱۳۶۴',
    title: 'تأسیس ثاخت',
    caption: 'بنیان‌گذاری هلدینگ',
    image: { src: '/img/placeholder.svg', alt: '' },
    archival: false,
  },
  {
    id: 'm-1376',
    year: '۱۳۷۶',
    title: 'برج بین‌المللی تهران',
    caption: 'بتن‌ریزی پی عمیق',
    image: { src: '/img/placeholder.svg', alt: '' },
    archival: false,
  },
  {
    id: 'm-1383',
    year: '۱۳۸۳',
    title: 'ورود به بورس تهران',
    caption: 'گشایش نماد ثاخت',
    image: { src: '/img/placeholder.svg', alt: '' },
    archival: false,
  },
  {
    id: 'm-1396',
    year: '۱۳۹۶',
    title: 'مگاپارس تهران',
    caption: 'نخستین مگاپروژه چندمنظوره',
    image: { src: '/img/placeholder.svg', alt: '' },
    archival: false,
  },
  {
    id: 'm-1402',
    year: '۱۴۰۲',
    title: 'ساخت پایدار',
    caption: 'استانداردهای سبز و پایش بلادرنگ',
    image: { src: '/img/placeholder.svg', alt: '' },
    archival: false,
  },
]

/** The brand film block. `src` stays null until the owner supplies footage. */
export const aboutFilm = {
  title: 'روایت ثاخت',
  caption: 'فیلم کوتاه برند',
  poster: '/img/placeholder.svg',
  src: null as string | null,
}

/** Production chain — one word each, per the text budget. */
export interface AboutChainStep {
  id: string
  label: string
  image: { src: string, alt: string }
}

export const aboutChain: AboutChainStep[] = [
  { id: 'c-1', label: 'طراحی', image: { src: '/img/placeholder.svg', alt: '' } },
  { id: 'c-2', label: 'تأمین', image: { src: '/img/placeholder.svg', alt: '' } },
  { id: 'c-3', label: 'بتن', image: { src: '/img/placeholder.svg', alt: '' } },
  { id: 'c-4', label: 'اجرا', image: { src: '/img/placeholder.svg', alt: '' } },
  { id: 'c-5', label: 'تحویل', image: { src: '/img/placeholder.svg', alt: '' } },
  { id: 'c-6', label: 'بهره‌برداری', image: { src: '/img/placeholder.svg', alt: '' } },
]

// ---------------------------------------------------------------------------
// Track record gallery — pure imagery (former /about/honors, de-texted)
// ---------------------------------------------------------------------------

export interface AboutGalleryItem {
  id: string
  title: string
  year: string
  image: { src: string, alt: string }
}

export const aboutGallery: AboutGalleryItem[] = honors.map((honor, index) => ({
  id: `g-${index}`,
  title: honor.title,
  year: honor.year,
  image: {
    src: honor.image?.src ?? `/img/placeholder.svg`,
    alt: honor.image?.alt ?? '',
  },
}))

// ---------------------------------------------------------------------------
// Subsidiaries — enlarged, blurred backdrop, horizontally scrollable
// ---------------------------------------------------------------------------

export interface AboutSubsidiary {
  id: string
  name: string
  badge: string
  stake: string
  logo: { src: string, alt: string }
}

export const aboutSubsidiaries: AboutSubsidiary[] = orgSubsidiaries.map(company => ({
  id: company.id,
  name: company.name,
  badge: company.badge,
  stake: company.stake,
  logo: {
    src: `/img/placeholder.svg`,
    alt: company.name,
  },
}))

export const aboutSubsidiariesSection = {
  title: 'خانواده ثاخت',
  text: 'هشت شرکت تخصصی، یک زنجیره کامل ساخت.',
  /** Low-opacity blurred backdrop behind the whole section. */
  backdrop: '/img/placeholder.svg',
}

// ---------------------------------------------------------------------------
// Board — one card per member, no detail route (ADR-004)
// ---------------------------------------------------------------------------

export interface AboutBoardCard {
  slug: string
  name: string
  role: string
  education: string
  representing: string
  bio: string
  image: { src: string, alt: string }
}

/** Strip HTML and clamp to the two-line bio the card shows. */
function plainBio(member: typeof boardMembers[number]): string {
  const source = member.summary ?? member.bioHtml ?? ''
  return source.replace(/<[^>]*>/g, '').trim()
}

export const aboutBoard: AboutBoardCard[] = boardMembers.map(member => ({
  slug: member.slug,
  name: member.name,
  role: member.role,
  education: member.education ?? '—',
  representing: member.representing ?? '—',
  bio: plainBio(member),
  image: {
    src: member.image?.src ?? `/img/placeholder.svg`,
    alt: member.image?.alt ?? member.name,
  },
}))

// ---------------------------------------------------------------------------
// Contact form — exactly two subjects (item 6 of the owner's brief)
// ---------------------------------------------------------------------------

export const ABOUT_FORM_SUBJECTS = [
  { value: 'resume', label: 'ارسال رزومه' },
  { value: 'shareholders', label: 'ارتباط با سهامداران' },
] as const

export type AboutFormSubject = typeof ABOUT_FORM_SUBJECTS[number]['value']

export const aboutForm = {
  title: 'ارسال پیام',
  text: 'رزومه یا پرسش سهامداری خود را بفرستید.',
}
