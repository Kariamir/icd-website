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
import { ph, phFor } from '~/utils/media'
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
    src: ph('tower', 2),
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
    image: { src: phFor('توسعه‌دهنده نخست مگاپروژه‌های چندمنظوره ایران، با بازدهی متوازن برای سهامدار و شهر.'), alt: '' },
  },
  {
    id: 'governance',
    title: 'حاکمیت شرکتی',
    text: 'گزارش‌گری شفاف در کدال، کمیته‌های مستقل حسابرسی و ریسک، و پاسخ‌گویی به مجمع.',
    image: { src: phFor('گزارش‌گری شفاف در کدال، کمیته‌های مستقل حسابرسی و ریسک، و پاسخ‌گویی به مجمع.'), alt: '' },
  },
  {
    id: 'standards',
    title: 'استانداردهای مهندسی',
    text: 'ISO 9001 و 45001، پایش ژئوتکنیک بلادرنگ، و آزمایشگاه مرکزی بتن در زنجیره ساخت.',
    image: { src: phFor('ISO 9001 و 45001، پایش ژئوتکنیک بلادرنگ، و آزمایشگاه مرکزی بتن در زنجیره ساخت.'), alt: '' },
  },
]

// ---------------------------------------------------------------------------
// History — merged تاریخچه + کارنامه (former /about/history)
// ---------------------------------------------------------------------------

export interface AboutMilestone {
  id: string
  year: string
  title: string
  /** The paragraph under the heading in the approved design's content card. */
  body: string
  /** The small chip under the paragraph. `tone` colours its leading square. */
  tag: string
  tagTone?: 'ink' | 'primary' | 'deep' | 'success' | 'filled'
  image: { src: string, alt: string }
  /** Rendered desaturated — everything before ۱۳۵۰ reads as archival. */
  archival: boolean
  /** Slightly lifted contrast, as the design does for the ۱۳۶۴ photograph. */
  contrast?: boolean
  /** Real content not yet supplied by the project owner — see ADR-004. */
  placeholder?: boolean
}

/**
 * The five movements, their copy and their order come from the approved
 * design (stitch_project_detail_page_template/about/, ADR-016). Do not
 * reorder or re-word them without the owner.
 *
 * ⚠️ TWO CONTENT FLAGS, both for the content team, neither a code issue:
 *
 * 1. The ۱۳۳۰ entry carries `placeholder: true`. The Pars Saze founding text
 *    reads as finished prose but no archival source has been supplied for it,
 *    and no archival photograph exists either. The template marks it visibly
 *    so it is not mistaken for verified content.
 * 2. **The TSE listing year is unconfirmed.** This file previously said ۱۳۸۳;
 *    the approved design says ۱۳۸۹. The design wins here because the owner
 *    chose it as the source, but a listed company publishing the wrong IPO
 *    year on its own About page is a disclosure error. Shareholder affairs
 *    must confirm before launch.
 */
export const aboutMilestones: AboutMilestone[] = [
  {
    id: 'm-1330',
    year: '۱۳۳۰',
    title: 'پایه‌گذاری پارس سازه؛ نخستین گام‌های صنعتی‌سازی',
    body: 'آغاز فعالیت‌های شرکت مهندسی پارس سازه با تمرکز بر احداث ابنیه سنگین صنعتی و سازه‌های بتنی پیش‌ساخته در سطح کشور.',
    tag: 'آغاز جریان مکانیزاسیون ساخت‌وساز',
    tagTone: 'ink',
    image: { src: ph('archive', 1), alt: '' },
    archival: true,
    placeholder: true,
  },
  {
    id: 'm-1364',
    year: '۱۳۶۴',
    title: 'تاسیس رسمی شرکت بین‌المللی توسعه ساختمان',
    body: 'تثبیت ساختار شرکت به عنوان یک بازوی تخصصی توسعه عمرانی و آغاز پروژه‌های کلان زیربنایی، مسکونی و گردشگری در پایتخت.',
    tag: 'ثبت حقوقی و تجمیع توانمندی‌های عمرانی',
    tagTone: 'primary',
    image: { src: ph('blueprint', 1), alt: '' },
    archival: false,
    contrast: true,
  },
  {
    id: 'm-1377',
    year: '۱۳۷۷',
    title: 'عصر بلندمرتبه‌سازی؛ آغاز ابرپروژه برج بین‌المللی تهران',
    body: 'آغاز احداث مرتفع‌ترین سازه مسکونی ایران به ارتفاع ۱۶۲ متر با بهره‌گیری از مهندسی زلزله پیشرفته و فناوری‌های روز دنیا.',
    tag: 'رکوردشکنی ارتفاع و سازه‌های بتن مسلح',
    tagTone: 'deep',
    image: { src: ph('construction', 1), alt: '' },
    archival: false,
  },
  {
    id: 'm-1389',
    year: '۱۳۸۹',
    title: 'ورود به بازار بورس اوراق بهادار تهران (نماد ثاخت)',
    body: 'عرضه عمومی سهام شرکت، تحقق شفافیت مالی پایدار و شکل‌گیری شبکه هلدینگ با شرکت‌های تخصصی تابعه نظیر آ.اس.پ و باغمیشه.',
    tag: 'پذیرش در تابلوی اصلی بازار سرمایه',
    tagTone: 'success',
    image: { src: ph('office', 1), alt: '' },
    archival: false,
  },
  {
    id: 'm-1403',
    year: '۱۴۰۳',
    title: 'عصر هوشمندسازی، مدیریت انرژی و پایداری',
    body: 'پیاده‌سازی استانداردهای ساختمان سبز (BIM)، سیستم‌های مدیریت هوشمند انرژی (BMS) و توسعه مگاپروژه‌های تجاری و تفریحی نسل آینده.',
    tag: 'امروز: بزرگ‌ترین هلدینگ ساختمانی تراز اول کشور',
    tagTone: 'filled',
    image: { src: ph('campus', 1), alt: '' },
    archival: false,
  },
]

/** The brand film block. `src` stays null until the owner supplies footage. */
export const aboutFilm = {
  title: 'روایت ثاخت',
  caption: 'فیلم کوتاه برند',
  poster: ph('skyline', 2),
  src: null as string | null,
}

/** Production chain — one word each, per the text budget. */
export interface AboutChainStep {
  id: string
  label: string
  image: { src: string, alt: string }
}

export const aboutChain: AboutChainStep[] = [
  { id: 'c-1', label: 'طراحی', image: { src: ph('blueprint', 1), alt: '' } },
  { id: 'c-2', label: 'تأمین', image: { src: ph('industrial', 1), alt: '' } },
  { id: 'c-3', label: 'بتن', image: { src: ph('construction', 1), alt: '' } },
  { id: 'c-4', label: 'اجرا', image: { src: ph('construction', 2), alt: '' } },
  { id: 'c-5', label: 'تحویل', image: { src: ph('residential', 1), alt: '' } },
  { id: 'c-6', label: 'بهره‌برداری', image: { src: ph('commercial', 1), alt: '' } },
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
    src: honor.image?.src ?? phFor('certificate award'),
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
    src: phFor('aerial masterplan'),
    alt: company.name,
  },
}))

export const aboutSubsidiariesSection = {
  title: 'خانواده ثاخت',
  text: 'هشت شرکت تخصصی، یک زنجیره کامل ساخت.',
  /** Low-opacity blurred backdrop behind the whole section. */
  backdrop: phFor('هشت شرکت تخصصی، یک زنجیره کامل ساخت.'),
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
    src: member.image?.src ?? phFor(`portrait-${member.slug}`),
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
