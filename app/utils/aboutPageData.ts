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
import { phFor } from '~/utils/media'
import { orgSubsidiaries } from '~/utils/orgChartData'

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const aboutHero = {
  title: 'چهار دهه ساختن',
  lead: 'هلدینگ بین‌المللی توسعه ساختمان — پذیرفته‌شده در بورس تهران.',
  image: {
    src: '/img/about/hero.jpg',
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
  /** True when `image` is a logo/mark rather than a photograph. */
  mark?: boolean
}

export const aboutPillars: AboutPillar[] = [
  {
    id: 'vision',
    title: 'چشم‌انداز',
    text: 'توسعه‌دهنده نخست مگاپروژه‌های چندمنظوره ایران، با بازدهی متوازن برای سهامدار و شهر.',
    image: { src: '/img/about/vision.jpg', alt: '' },
  },
  {
    id: 'governance',
    title: 'حاکمیت شرکتی',
    text: 'گزارش‌گری شفاف در کدال، کمیته‌های مستقل حسابرسی و ریسک، و پاسخ‌گویی به مجمع.',
    image: { src: '/img/about/governance.jpg', alt: '' },
  },
  {
    id: 'standards',
    title: 'استانداردهای مهندسی',
    text: 'ISO 9001 و 45001، پایش ژئوتکنیک بلادرنگ، و آزمایشگاه مرکزی بتن در زنجیره ساخت.',
    // A mark, not a photograph — the template renders this one contained on a
    // light tile rather than cropped to fill like the two above.
    image: { src: '/img/about/standards.png', alt: 'ISO' },
    mark: true,
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
 * 1. ✅ The ۱۳۳۰ archival photograph now exists — the client supplied a period
 *    road-construction frame with the About assets, so `placeholder` is gone
 *    and build-checklist Phase 0's "does archival material exist" is answered
 *    for this entry. The *text* of the Pars Saze founding is still unsourced.
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
    image: { src: '/img/about/history-1330.jpg', alt: '' },
    archival: true,
  },
  {
    id: 'm-1364',
    year: '۱۳۶۴',
    title: 'تاسیس رسمی شرکت بین‌المللی توسعه ساختمان',
    body: 'تثبیت ساختار شرکت به عنوان یک بازوی تخصصی توسعه عمرانی و آغاز پروژه‌های کلان زیربنایی، مسکونی و گردشگری در پایتخت.',
    tag: 'ثبت حقوقی و تجمیع توانمندی‌های عمرانی',
    tagTone: 'primary',
    image: { src: '/img/about/history-1364.jpg', alt: '' },
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
    image: { src: '/img/about/history-1377.jpg', alt: '' },
    archival: false,
  },
  {
    id: 'm-1389',
    year: '۱۳۸۹',
    title: 'ورود به بازار بورس اوراق بهادار تهران (نماد ثاخت)',
    body: 'عرضه عمومی سهام شرکت، تحقق شفافیت مالی پایدار و شکل‌گیری شبکه هلدینگ با شرکت‌های تخصصی تابعه نظیر آ.اس.پ و باغمیشه.',
    tag: 'پذیرش در تابلوی اصلی بازار سرمایه',
    tagTone: 'success',
    image: { src: '/img/about/history-1389.jpg', alt: '' },
    archival: false,
  },
  {
    id: 'm-1403',
    year: '۱۴۰۳',
    title: 'عصر هوشمندسازی، مدیریت انرژی و پایداری',
    body: 'پیاده‌سازی استانداردهای ساختمان سبز (BIM)، سیستم‌های مدیریت هوشمند انرژی (BMS) و توسعه مگاپروژه‌های تجاری و تفریحی نسل آینده.',
    tag: 'امروز: بزرگ‌ترین هلدینگ ساختمانی تراز اول کشور',
    tagTone: 'filled',
    image: { src: '/img/about/history-1403.jpg', alt: '' },
    archival: false,
  },
]

/** The brand film block. `src` stays null until the owner supplies footage. */
export const aboutFilm = {
  title: 'روایت ثاخت',
  caption: 'فیلم کوتاه برند',
  poster: '/img/about/film-poster.jpg',
  src: null as string | null,
}

/**
 * The value chain. What the client supplied for this section is a set of six
 * white-on-transparent **line icons**, not photographs — so the template draws
 * it as an icon strip rather than the photo mosaic it used to be.
 */
export interface AboutChainStep {
  id: string
  label: string
  /** One-line description under the label. */
  text: string
  icon: string
}

export const aboutChain: AboutChainStep[] = [
  { id: 'c-1', label: 'طراحی', text: 'معماری، سازه و مدل‌سازی اطلاعات ساختمان', icon: '/img/about/chain-design.png' },
  { id: 'c-2', label: 'تأمین', text: 'تدارک مصالح و تجهیزات در زنجیره گروه', icon: '/img/about/chain-supply.png' },
  { id: 'c-3', label: 'بتن', text: 'تولید و کنترل کیفیت بتن آماده', icon: '/img/about/chain-concrete.png' },
  { id: 'c-4', label: 'اجرا', text: 'پیمانکاری و مدیریت ساخت پروژه‌های بزرگ', icon: '/img/about/chain-build.png' },
  { id: 'c-5', label: 'تحویل', text: 'تحویل واحد و خدمات پس از فروش', icon: '/img/about/chain-handover.png' },
  { id: 'c-6', label: 'بهره‌برداری', text: 'مدیریت، نگهداری و هوشمندسازی ساختمان', icon: '/img/about/chain-operate.png' },
]

// ---------------------------------------------------------------------------
// Honours — «افتخارات» (former /about/honors, de-texted)
// ---------------------------------------------------------------------------

export interface AboutHonor {
  id: string
  image: { src: string, alt: string }
  /**
   * ⛔ Deliberately null for every record. The client supplied the three award
   * objects as photographs only; `honorsData.ts` holds **invented** titles and
   * years from the placeholder era, and attaching those to real photographs
   * would caption a real award with a made-up name. The section renders the
   * objects without captions until shareholder affairs supplies the real
   * title, year and issuer for each one.
   *
   * What is legible on the certificate (honour 1) and nowhere confirmed:
   * «Certification Award — Tisa Kish — Best Engineering Intelligence &
   * Architecture Awards 2019, International Creative Management Forum».
   */
  title: string | null
  year: string | null
}

export const aboutHonors: AboutHonor[] = [
  { id: 'h-1', image: { src: '/img/about/honor-1.png', alt: 'گواهینامه بین‌المللی' }, title: null, year: null },
  { id: 'h-2', image: { src: '/img/about/honor-2.png', alt: 'تندیس' }, title: null, year: null },
  { id: 'h-3', image: { src: '/img/about/honor-3.png', alt: 'لوح تقدیر' }, title: null, year: null },
]

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
  image: { src: string, alt: string }
}

/**
 * The three executives the client supplied, with their own photographs.
 *
 * This replaces the ten invented members in `boardData.ts`, which were
 * placeholder records from before the client delivered any people at all.
 *
 * ⛔ TWO THINGS THE CLIENT STILL OWES THIS SECTION:
 *
 * 1. **This is the executive team, not the full board.** The client pointed at
 *    http://icd.co.ir/اعضاء-هیات-مدیره/ for the complete list; that page is
 *    disallowed to automated fetching by the site's own robots.txt and was not
 *    worked around, so only the three names and photographs supplied directly
 *    are here. The remaining board members need supplying by hand.
 * 2. The workbook's `هیات‌مدیره و مدیران` sheet lists the boards of the **ten
 *    subsidiaries** (36 records), not ICD's own — so it is not a source here.
 *
 * The portraits are 235×200 video frames: adequate on a card, soft if enlarged.
 */
export const aboutBoard: AboutBoardCard[] = [
  {
    slug: 'alireza-ghorbani',
    name: 'علیرضا قربانی',
    role: 'مدیرعامل',
    education: 'کارشناسی ارشد مهندسی عمران',
    image: { src: '/img/board/alireza-ghorbani.jpg', alt: 'علیرضا قربانی' },
  },
  {
    slug: 'mohammad-rahimi-moghadam',
    name: 'محمد رحیمی مقدم',
    role: 'معاون برنامه‌ریزی و سرمایه‌گذاری',
    education: 'دکترای مهندسی صنایع و سیستم‌ها',
    image: { src: '/img/board/mohammad-rahimi-moghadam.jpg', alt: 'محمد رحیمی مقدم' },
  },
  {
    slug: 'abbas-jalalian',
    name: 'عباس جلالیان',
    role: 'معاون مالی و سرمایه انسانی',
    education: 'کارشناسی ارشد مدیریت بازرگانی',
    image: { src: '/img/board/abbas-jalalian.jpg', alt: 'عباس جلالیان' },
  },
]

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
