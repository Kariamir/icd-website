/**
 * Mock content for the media cluster (news / stories / reports) — placeholder
 * pending the real WordPress data layer (docs/decisions.md ADR-002). The base
 * shape still matches app/types/content.ts ArticleCardViewModel /
 * ArticleDetailViewModel (searchData.ts and future WPNuxt queries rely on
 * that); everything the `04_article_main` / `04_article_detail` mockups need
 * beyond it (topic, author, reading time, views, tags, structured body with
 * pull quotes and figures, podcast audio) lives on the local *Extended
 * interfaces below so app/types/content.ts stays untouched.
 */
import { phFor } from '~/utils/media'
import type { ArticleCardViewModel, ArticleDetailViewModel, ImageViewModel } from '~/types/content'

export type ArticleType = ArticleCardViewModel['contentType']

const IMG = (seed: string): ImageViewModel => ({
  src: phFor(seed),
  alt: '',
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ArticleAuthor {
  name: string
  role: string
  /** Two-letter monogram for the avatar tile (mockup shows «د.م»). */
  initials: string
  /** When the author is a board member, their /about/board/[slug] profile. */
  boardSlug?: string
}

export interface ArticleAudio {
  /** Podcast episode number — stories without one are narrated articles. */
  episode?: number
  season?: string
  durationSec: number
  narrator: string
  guest?: string
  /** Board slug of the guest, when the guest is a board member. */
  guestBoardSlug?: string
  listeners?: number
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string; author: string; role?: string }
  | { type: 'figure'; image: ImageViewModel; caption: string }
  | { type: 'checklist'; items: string[] }

interface ArticleMeta {
  topic: string
  author: ArticleAuthor
  readingMinutes: number
  views: number
  /** yyyymmdd (Jalali) — numeric sort key behind the human `date` label. */
  sortKey: number
  featured?: boolean
  featuredBadge?: string
  audio?: ArticleAudio
}

export interface ArticleCardExtended extends ArticleCardViewModel, ArticleMeta {
  topicLabel: string
}

export interface ArticleExtended extends ArticleDetailViewModel, ArticleMeta {
  tags: string[]
  heroCaption?: string
  heroCredit?: string
  body: ArticleBlock[]
}

export interface ArticleDetailExtended extends Omit<ArticleExtended, 'related'> {
  topicLabel: string
  related: ArticleCardExtended[]
  previous?: ArticleCardExtended
  next?: ArticleCardExtended
}

// ---------------------------------------------------------------------------
// Hub + topic metadata (category pills on the index, categories widget on the detail)
// ---------------------------------------------------------------------------

export const mediaTypeLabels: Record<ArticleType, { hub: string; single: string }> = {
  news: { hub: 'نبض ثاخت', single: 'خبر' },
  story: { hub: 'روایت ثاخت', single: 'مطلب' },
  report: { hub: 'کارنامه ثاخت', single: 'گزارش' },
}

export const mediaHubHref: Record<ArticleType, string> = {
  news: '/media/news',
  story: '/media/stories',
  report: '/media/reports',
}

export interface MediaHubMeta {
  eyebrow: string
  title: string
  description: string
  gridTitle: string
  quote: { text: string; author: string; role: string }
}

export const mediaHubMeta: Record<ArticleType, MediaHubMeta> = {
  news: {
    eyebrow: 'مرکز تحلیل و انتشارات شرکت بین‌المللی توسعه ساختمان',
    title: 'نبض ثاخت؛ اخبار و دیدبان دانش هلدینگ ساختمانی ثاخت',
    description: 'اخبار رسمی پروژه‌ها، تحلیل‌های راهبردی مهندسی عمران، شفافیت شرکتی و روایت پروژه‌های کلان ملی.',
    gridTitle: 'تازه‌ترین اخبار و مقالات تحلیلی',
    quote: {
      text: '«توسعه شهری پایدار صرفاً با فناوری بتن حاصل نمی‌شود؛ پیوند شفاف میان مهندسی ارزش، تامین مالی خرد و احترام به بستر زیست‌محیطی ضامن ماندگاری ابرسازه‌ها در قرن آینده است.»',
      author: 'دکتر اردشیر دادفر',
      role: 'مشاور عالی هیئت‌مدیره و استاد دانشگاه علم و صنعت',
    },
  },
  story: {
    eyebrow: 'روایت‌ها، گفتگوها و پادکست اختصاصی هلدینگ',
    title: 'روایت ثاخت؛ داستان مهندسی، آدم‌ها و پروژه‌ها',
    description: 'پادکست «روایت ثاخت»، گفتگو با طراحان سازه و مدیران ارشد، و روایت چهار دهه ساخت‌وساز هلدینگ.',
    gridTitle: 'تازه‌ترین روایت‌ها و اپیزودها',
    quote: {
      text: '«هر پروژه پیش از آنکه سازه باشد، روایت آدم‌هایی است که سال‌ها در کارگاه ماندند تا یک ایده روی زمین بنشیند.»',
      author: 'مهندس سید علیرضا حسینی',
      role: 'مدیرعامل و نایب رئیس هیئت‌مدیره',
    },
  },
  report: {
    eyebrow: 'دیده‌بان بازار و کارنامه عملکرد هلدینگ',
    title: 'کارنامه ثاخت؛ گزارش‌های فصلی و تحلیل بازار مسکن',
    description: 'رصد شاخص‌های بنیادین بازار مسکن، گزارش‌های حاکمیت شرکتی و کارنامه پیشرفت فیزیکی و مالی پروژه‌ها.',
    gridTitle: 'تازه‌ترین گزارش‌های تحلیلی و فصلی',
    quote: {
      text: '«شفافیت در گزارش‌گری، ارزان‌ترین سرمایه‌ای است که یک هلدینگ ساختمانی می‌تواند برای اعتماد سهامدارانش هزینه کند.»',
      author: 'دکتر کاوه رضوانی',
      role: 'رئیس هیئت‌مدیره',
    },
  },
}

export interface MediaTopic {
  key: string
  label: string
  type: ArticleType
  /** Rendered with the podcast glyph + tinted pill (mockup «پادکست روایت ثاخت»). */
  podcast?: boolean
}

export const mediaTopics: MediaTopic[] = [
  { key: 'project-news', label: 'اخبار پروژه‌ها', type: 'news' },
  { key: 'engineering', label: 'مقالات تخصصی و مهندسی عمران', type: 'news' },
  { key: 'sustainability', label: 'توسعه پایدار و ESG', type: 'news' },
  { key: 'corporate', label: 'حاکمیت شرکتی و مجامع', type: 'news' },
  { key: 'podcast', label: 'پادکست روایت ثاخت', type: 'story', podcast: true },
  { key: 'engineering-story', label: 'روایت مهندسی و توسعه', type: 'story' },
  { key: 'people', label: 'گفتگو و چهره‌ها', type: 'story' },
  { key: 'market', label: 'گزارش‌های فصلی و بازار مسکن', type: 'report' },
  { key: 'governance', label: 'حاکمیت شرکتی و سرمایه‌گذاری', type: 'report' },
  { key: 'performance', label: 'کارنامه عملکرد پروژه‌ها', type: 'report' },
]

export function topicLabel(key: string): string {
  return mediaTopics.find(t => t.key === key)?.label ?? key
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

const AUTHORS = {
  saniei: { name: 'دکتر مهرداد صنیعی', role: 'معاونت مهندسی و توسعه پایدار هلدینگ', initials: 'م.ص', boardSlug: 'mehrdad-saniei' },
  rezvani: { name: 'دکتر کاوه رضوانی', role: 'رئیس هیئت‌مدیره', initials: 'ک.ر', boardSlug: 'kaveh-rezvani' },
  hosseini: { name: 'مهندس سید علیرضا حسینی', role: 'مدیرعامل و نایب رئیس هیئت‌مدیره', initials: 'ع.ح', boardSlug: 'seyed-alireza-hosseini' },
  kiani: { name: 'مهندس علیرضا کیانی', role: 'مدیر طراحی معماری و نما', initials: 'ع.ک' },
  farahmand: { name: 'دکتر بهنام فرهمند', role: 'مشاور ژئوتکنیک پروژه‌های شهری', initials: 'ب.ف' },
  audit: { name: 'کمیته حسابرسی و ریسک', role: 'هیئت‌مدیره هلدینگ ثاخت', initials: 'ک.ح' },
  pr: { name: 'روابط عمومی ثاخت', role: 'واحد ارتباطات و رسانه هلدینگ', initials: 'ر.ع' },
  economics: { name: 'دپارتمان تحلیل اقتصادی ثاخت', role: 'دیده‌بان بازار مسکن', initials: 'ت.ا' },
  radio: { name: 'رادیو ثاخت', role: 'تیم تولید پادکست روایت ثاخت', initials: 'ر.ث' },
} satisfies Record<string, ArticleAuthor>

// ---------------------------------------------------------------------------
// Body composer — keeps the secondary articles compact while still producing
// the full editorial rhythm the mockup shows (lead paragraph, numbered
// subheads, pull quote, captioned figure, checklist).
// ---------------------------------------------------------------------------

interface BodyInput {
  intro: string
  sections: { h: string; p: string }[]
  quote?: { text: string; author: string; role?: string }
  figure?: { seed: string; caption: string }
  points?: string[]
  outro?: string
}

function composeBody(input: BodyInput): ArticleBlock[] {
  const blocks: ArticleBlock[] = [{ type: 'p', text: input.intro }]
  input.sections.forEach((s, i) => {
    blocks.push({ type: i === 0 ? 'h2' : 'h3', text: s.h })
    blocks.push({ type: 'p', text: s.p })
    if (i === 0 && input.quote) blocks.push({ type: 'quote', ...input.quote })
    if (i === 0 && input.figure) blocks.push({ type: 'figure', image: IMG(input.figure.seed), caption: input.figure.caption })
  })
  if (input.points?.length) blocks.push({ type: 'checklist', items: input.points })
  if (input.outro) blocks.push({ type: 'p', text: input.outro })
  return blocks
}

/** Legacy `bodyHtml` (content.ts contract) derived from the structured body. */
function blocksToHtml(blocks: ArticleBlock[]): string {
  return blocks.map((b) => {
    switch (b.type) {
      case 'p': return `<p>${b.text}</p>`
      case 'h2': return `<h2>${b.text}</h2>`
      case 'h3': return `<h3>${b.text}</h3>`
      case 'quote': return `<blockquote>${b.text}</blockquote>`
      case 'figure': return `<figure><img src="${b.image.src}" alt=""><figcaption>${b.caption}</figcaption></figure>`
      case 'checklist': return `<ul>${b.items.map(i => `<li>${i}</li>`).join('')}</ul>`
    }
    return ''
  }).join('\n')
}

type ArticleSeed = Omit<ArticleExtended, 'bodyHtml' | 'related'>

function article(seed: ArticleSeed): ArticleExtended {
  return { ...seed, bodyHtml: blocksToHtml(seed.body), related: [] }
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

const newsArticles: ArticleExtended[] = [
  article({
    slug: 'resilience-strategy-1410',
    contentType: 'news',
    title: 'استراتژی تاب‌آوری ابرسازه‌ها در افق ۱۴۱۰؛ ادغام مهندسی ارزش و مالی‌سازی مدرن املاک',
    excerpt: 'بررسی همگرایی میان مدل‌های نوین مدلسازی اطلاعات ساختمان (BIM) سطح ۴ و ساختار نوین انتشار اوراق سلف مسکن در بازار بورس تهران برای تضمین سرعت و کاهش ریسک ساخت در پروژه‌های مقیاس ملی.',
    date: '۲۰ اردیبهشت ۱۴۰۳',
    sortKey: 14030220,
    category: 'مقاله تحلیلی و راهبردی',
    topic: 'engineering',
    image: IMG('resilience-tower'),
    heroCaption: 'اسکلت فلزی برج بین‌المللی تهران در مرحله اجرای طبقات میانی',
    heroCredit: 'عکاسی آرشیو روابط عمومی',
    author: AUTHORS.saniei,
    readingMinutes: 8,
    views: 5840,
    featured: true,
    featuredBadge: 'پرونده ویژه شماره ۴۲',
    tags: ['مهندسی_ارزش', 'BIM', 'اوراق_سلف', 'تاب‌آوری'],
    body: composeBody({
      intro: 'ابرپروژه‌های چندمنظوره در دهه آینده با دو چالش هم‌زمان روبه‌رو هستند: افزایش پیچیدگی فنی سازه و تامین مالی پایدار در شرایط تورمی. هلدینگ ثاخت در سند راهبردی افق ۱۴۱۰، پاسخ این دو چالش را در پیوند مستقیم مهندسی ارزش با ابزارهای نوین بازار سرمایه جست‌وجو می‌کند.',
      sections: [
        { h: '۱. مدلسازی اطلاعات ساختمان سطح ۴ به‌عنوان زبان مشترک', p: 'ارتقای مدل‌های BIM از هماهنگی سه‌بعدی به سطح چهارم (افزودن بعد زمان) امکان می‌دهد برنامه اجرایی، جریان نقدینگی و مصرف مصالح در یک مدل واحد پایش شود. نتیجه، کاهش دوباره‌کاری در کارگاه و پیش‌بینی‌پذیری بیشتر هزینه تمام‌شده است.' },
        { h: '۲. اوراق سلف مسکن و کاهش ریسک ساخت', p: 'انتشار اوراق سلف واحدهای در حال ساخت در بورس کالا، منبع مالی ارزان‌تری نسبت به تسهیلات بانکی فراهم می‌کند و هم‌زمان قیمت‌گذاری شفاف و بازارمحور را برای خریداران خرد ممکن می‌سازد.' },
        { h: '۳. تاب‌آوری لرزه‌ای و عمر مفید پنجاه‌ساله', p: 'طراحی بر پایه عملکرد و استفاده از میراگرهای ویسکوز، هزینه چرخه عمر سازه را کاهش می‌دهد؛ رویکردی که در برج بین‌المللی تهران به‌عنوان پروژه پایلوت اجرا شده است.' },
      ],
      quote: { text: '«سرعت ساخت بدون شفافیت مالی، تنها ریسک را به آینده منتقل می‌کند؛ مهندسی ارزش زمانی معنا دارد که در صورت‌های مالی هم دیده شود.»', author: 'دکتر مهرداد صنیعی', role: 'معاونت مهندسی و توسعه پایدار' },
      figure: { seed: 'bim-model-review', caption: 'تصویر ۲: جلسه هماهنگی مدل BIM سطح ۴ در دفتر فنی پروژه' },
      points: ['کاهش ۱۸ درصدی زمان اجرای اسکلت با برنامه‌ریزی مبتنی بر مدل', 'تامین ۳۰ درصد منابع فاز دوم از محل اوراق سلف مسکن', 'گزارش‌دهی فصلی پیشرفت فیزیکی و مالی در سامانه کدال'],
      outro: 'این پرونده در شماره‌های آینده با بررسی تجربه پروژه‌های مگاپارس و رویای کیش ادامه خواهد یافت.',
    }),
  }),
  article({
    slug: 'geotechnical-engineering-megaprojects',
    contentType: 'news',
    title: 'رویکرد نوین مهندسی ژئوتکنیک و پایداری سازه‌ای در مگاپروژه‌های ثاخت',
    excerpt: 'بررسی جامع تمهیدات مهندسی گودبرداری‌های عمیق، اجرای دیوارهای آب‌بند و تکنولوژی‌های روز تحکیم بستر در پروژه‌های مقیاس‌بزرگ تجاری و مسکونی هلدینگ، با تمرکز بر مدیریت ریسک‌های ژئوتکنیکی و استانداردهای پایداری زیست‌محیطی.',
    date: '۲۴ اردیبهشت ۱۴۰۳',
    sortKey: 14030224,
    category: 'گزارش تخصصی و مهندسی',
    topic: 'engineering',
    image: IMG('geotech'),
    heroCaption: 'نمای مهندسی از پروژه شاخص چندمنظوره هلدینگ ساختمانی ثاخت در هنگام غروب',
    heroCredit: 'عکاسی آرشیو روابط عمومی',
    author: AUTHORS.rezvani,
    readingMinutes: 8,
    views: 2480,
    audio: { durationSec: 730, narrator: 'رادیو ثاخت' },
    audioUrl: 'https://example.com/podcasts/geotech-narration.mp3',
    tags: ['مهندسی_ژئوتکنیک', 'مگاپروژه', 'ایمنی_سازه', 'تکنولوژی_ساخت'],
    body: [
      { type: 'p', text: 'در دهه‌های اخیر، توسعه زیرساخت‌های کلان‌شهری و احداث مجتمع‌های چندمنظوره با حجم سرمایه‌گذاری سنگین، چالش‌های ژئوتکنیکی پیچیده‌ای را پیش روی طراحان و مجریان پروژه‌های عمرانی قرار داده است. هلدینگ بین‌المللی توسعه ساختمان با در اختیار داشتن سبدی از پروژه‌های شاخص در پهنه‌های مختلف جغرافیایی کشور، همواره رویکردی متکی بر مهندسی دقیق ارزش و سیستم‌های تاب‌آور سازه‌ای را اتخاذ کرده است.' },
      { type: 'h2', text: '۱. مدیریت ریسک در گودبرداری‌های فوق‌عمیق شهری' },
      { type: 'p', text: 'احداث سازه‌هایی با طبقات زیرسطحی متعدد در بافت‌های متراکم کلان‌شهرهایی نظیر تهران و مشهد، مستلزم ارزیابی لایه‌نگاری دقیق خاک، سنجش جریان‌های آب زیرزمینی و به‌کارگیری مدل‌سازی سه‌بعدی اندرکنش خاک و سازه است. بهره‌گیری از ترکیب نیلینگ پیش‌تنیده (Pre-stressed Ground Anchors) و دیوارهای دیافراگمی بتنی پیوسته، ریسک تغییرشکل‌های مجاورتی را به حداقل رسانده است.' },
      { type: 'quote', text: '«استانداردهای مهندسی امروز دیگر صرفاً ساخت یک بنای پایدار نیست؛ بلکه کنترل رفتار پویای ساختگاه در چرخه عمر ۵۰ ساله و جلوگیری از هرگونه تنش به محیط پیرامونی شهری است.»', author: 'مهندس حسینی', role: 'مدیر پروژه‌های زیربنایی ثاخت' },
      { type: 'figure', image: IMG('geotech-sensors'), caption: 'تصویر ۲: پایش رفتار بستر خاک و قرائت میکروکرنش‌سنج‌ها در عملیات تحکیم سازه' },
      { type: 'h3', text: '۲. به‌کارگیری سنسورهای پایش بلادرنگ (Real-Time Structural Health Monitoring)' },
      { type: 'p', text: 'یکی از دستاوردهای مهندسی نوین در پروژه‌های اخیر ثاخت، نصب حسگرهای پیزوالکتریک و ژئوفون‌های دقیق جهت مانیتورینگ آنلاین نشست‌ها و ارتعاشات ناشی از ساخت بوده است. اطلاعات به‌دست‌آمده به‌صورت لحظه‌ای در اتاق فرمان ژئوتکنیک پروژه تحلیل شده و حاشیه ایمنی سازه‌های هم‌جوار در تمامی مراحل حفاری و بتن‌ریزی تضمین می‌گردد.' },
      { type: 'checklist', items: ['کاهش ۲۵ درصدی مصرف فولاد در دیوارهای نگهبان با بهره‌گیری از مدل‌سازی عددی پیشرفته.', 'عایق‌کاری چندلایه ژئوممبران ضد نفوذ آب با استاندارد بین‌المللی ASTM.', 'پایداری در برابر زلزله‌های حوزه نزدیک با طراحی میراگرهای نوین ویسکوز.'] },
      { type: 'p', text: 'هلدینگ ثاخت با تلفیق این دانش مهندسی با نظام شفافیت و گزارش‌گری کدال، بستر مطمئنی برای سرمایه‌گذاران و خریداران نهایی فراهم آورده است که کیفیت نهایی سازه‌ها را در بالاترین تراز مهندسی کشور تثبیت می‌کند.' },
    ],
  }),
  article({
    slug: 'parametric-facade-hot-climate',
    contentType: 'news',
    title: 'طراحی نمای پارامتریک در اقلیم‌های گرم؛ کاهش ۴۰ درصدی بار برودتی ساختمان',
    excerpt: 'بررسی محاسبات ترمودینامیکی در پروژه‌های تجاری کیش و شیراز با استفاده از الگوریتم‌های ژنتیک در معماری محاسباتی.',
    date: '۱۸ اردیبهشت ۱۴۰۳',
    sortKey: 14030218,
    category: 'توسعه پایدار',
    topic: 'sustainability',
    image: IMG('parametric-facade'),
    author: AUTHORS.kiani,
    readingMinutes: 6,
    views: 1930,
    tags: ['نمای_پارامتریک', 'بهره‌وری_انرژی', 'رویای_کیش'],
    body: composeBody({
      intro: 'در اقلیم گرم و مرطوب جنوب کشور، بخش عمده مصرف انرژی ساختمان صرف سرمایش می‌شود. تیم طراحی ثاخت با بهینه‌سازی هندسه سایه‌بان‌های نما به کمک الگوریتم ژنتیک، بار برودتی پروژه‌های تجاری کیش و شیراز را به‌طور محسوسی کاهش داده است.',
      sections: [
        { h: 'از تحلیل تابش تا هندسه نما', p: 'مدل‌سازی ساعتی تابش خورشید در طول سال، مبنای طراحی پره‌های عمودی و افقی نما قرار گرفت. هر پره بر اساس جهت‌گیری و ارتفاع طبقه زاویه‌ای متفاوت دارد تا بیشترین سایه در ساعات اوج و بیشترین نور روز در ساعات کم‌بار حاصل شود.' },
        { h: 'اعتبارسنجی با شبیه‌سازی انرژی', p: 'نتایج شبیه‌سازی در نرم‌افزارهای تحلیل انرژی نشان داد که نمای پارامتریک در مقایسه با نمای شیشه‌ای متداول، ظرفیت تجهیزات سرمایشی مورد نیاز را تا ۴۰ درصد کاهش می‌دهد.' },
      ],
      quote: { text: '«نما پوسته تزئینی نیست؛ نخستین سیستم تاسیساتی ساختمان است.»', author: 'مهندس علیرضا کیانی', role: 'مدیر طراحی معماری و نما' },
      figure: { seed: 'facade-louvers', caption: 'تصویر ۲: ماکت مطالعاتی پره‌های سایه‌بان در آزمایشگاه نور روز' },
      points: ['کاهش ۴۰ درصدی بار برودتی طراحی', 'افزایش ۲۲ درصدی بهره‌گیری از نور روز', 'امکان پیش‌ساخته‌سازی پره‌ها در کارخانه'],
    }),
  }),
  article({
    slug: 'deep-excavation-metro-monitoring',
    contentType: 'news',
    title: 'پایش ژئوتکنیکی گودهای عمیق در مجاورت خطوط مترو شهری',
    excerpt: 'مطالعه موردی پروژه برج بین‌المللی تهران؛ تکنیک‌های مانیتورینگ آنلاین انحراف دیواره نیلینگ با سنسورهای تار نوری.',
    date: '۱۰ اردیبهشت ۱۴۰۳',
    sortKey: 14030210,
    category: 'مهندسی ژئوتکنیک',
    topic: 'engineering',
    image: IMG('metro-tunnel'),
    author: AUTHORS.farahmand,
    readingMinutes: 10,
    views: 1610,
    tags: ['گودبرداری', 'مترو', 'تار_نوری'],
    body: composeBody({
      intro: 'گودبرداری در فاصله کمتر از بیست متری تونل مترو، حساس‌ترین مرحله اجرای برج بین‌المللی تهران بود. این گزارش، سامانه پایش مبتنی بر حسگرهای تار نوری را که برای کنترل این ریسک طراحی شد مرور می‌کند.',
      sections: [
        { h: 'طراحی سامانه پایش', p: 'حسگرهای کرنش تار نوری در امتداد دیواره نیلینگ و شیب‌سنج‌های درون‌چاهی در فواصل منظم نصب شدند و داده‌ها هر ده دقیقه به اتاق فرمان ارسال می‌شد.' },
        { h: 'آستانه‌های هشدار و واکنش', p: 'سه سطح هشدار سبز، زرد و قرمز تعریف شد؛ عبور از آستانه زرد به توقف خودکار حفاری در قطعه مربوط و بازبینی طراحی انجامید.' },
      ],
      quote: { text: '«داده‌ای که دیر برسد، هشدار نیست؛ گزارش حادثه است.»', author: 'دکتر بهنام فرهمند', role: 'مشاور ژئوتکنیک' },
      points: ['حداکثر جابه‌جایی ثبت‌شده کمتر از ۱۲ میلی‌متر', 'صفر مورد توقف بهره‌برداری مترو', 'ثبت بیش از ۲ میلیون قرائت در طول پروژه'],
    }),
  }),
  article({
    slug: 'e-procurement-transparency',
    contentType: 'news',
    title: 'شفافیت زنجیره قراردادهای پیمانکاری بر بستر سامانه تدارکات الکترونیک',
    excerpt: 'چگونه پیاده‌سازی سازوکار حاکمیت شرکتی نوین در ثاخت باعث صیانت حداکثری از منافع سهامداران حقیقی و حقوقی گردید.',
    date: '۵ اردیبهشت ۱۴۰۳',
    sortKey: 14030205,
    category: 'حاکمیت شرکتی',
    topic: 'corporate',
    image: IMG('boardroom-meeting'),
    author: AUTHORS.audit,
    readingMinutes: 7,
    views: 1270,
    tags: ['حاکمیت_شرکتی', 'تدارکات_الکترونیک', 'شفافیت'],
    body: composeBody({
      intro: 'از ابتدای سال ۱۴۰۲، تمامی مناقصات و استعلام‌های پیمانکاری هلدینگ ثاخت از طریق سامانه تدارکات الکترونیک برگزار می‌شود. این گزارش نتایج نخستین سال اجرای این سازوکار را مرور می‌کند.',
      sections: [
        { h: 'یکپارچه‌سازی فرآیند مناقصه', p: 'انتشار فراخوان، دریافت پاکت‌ها، ارزیابی فنی و بازگشایی مالی همگی در سامانه ثبت می‌شود و سوابق آن برای کمیته حسابرسی قابل ردیابی است.' },
        { h: 'اثر بر هزینه تمام‌شده', p: 'افزایش تعداد شرکت‌کنندگان در مناقصات و کاهش تعاملات غیررسمی، به کاهش میانگین قیمت قراردادها نسبت به برآورد اولیه منجر شده است.' },
      ],
      points: ['برگزاری ۱۴۶ مناقصه به‌صورت کاملاً الکترونیک', 'افزایش ۳۵ درصدی پیمانکاران شرکت‌کننده', 'انتشار خلاصه قراردادهای بزرگ در گزارش حاکمیت شرکتی'],
    }),
  }),
  article({
    slug: 'tehran-tower-structural-milestone',
    contentType: 'news',
    title: 'اتمام اسکلت سازه‌ای طبقه سی‌ام برج بین‌المللی تهران',
    excerpt: 'تیم اجرایی برج بین‌المللی تهران با تکمیل اسکلت طبقه سی‌ام، دو هفته زودتر از برنامه زمان‌بندی به نقطه عطف میانی پروژه رسید.',
    date: '۲ خرداد ۱۴۰۳',
    sortKey: 14030302,
    category: 'اخبار پروژه‌ها',
    topic: 'project-news',
    image: IMG('tower-crane-skyline'),
    author: AUTHORS.pr,
    readingMinutes: 4,
    views: 3120,
    tags: ['برج_بین‌المللی_تهران', 'پیشرفت_فیزیکی'],
    body: composeBody({
      intro: 'با بتن‌ریزی دال طبقه سی‌ام، اسکلت برج بین‌المللی تهران به ارتفاع ۱۲۰ متر رسید. این نقطه عطف دو هفته زودتر از برنامه مصوب محقق شد.',
      sections: [
        { h: 'مراحل بعدی اجرا', p: 'نصب نمای یونیتایز در طبقات پایینی هم‌زمان با ادامه اسکلت آغاز شده و عملیات تاسیسات مکانیکی طبقات اداری تا پایان تابستان ادامه خواهد داشت.' },
        { h: 'ایمنی کارگاه', p: 'در این مرحله بیش از یک میلیون نفرساعت کار بدون حادثه منجر به توقف کار ثبت شده است.' },
      ],
      figure: { seed: 'tower-slab-pour', caption: 'بتن‌ریزی دال طبقه سی‌ام با پمپ ثابت' },
    }),
  }),
  article({
    slug: 'megapars-physical-progress',
    contentType: 'news',
    title: 'گزارش پیشرفت فیزیکی مگاپروژه تجاری اداری مگاپارس',
    excerpt: 'مگاپارس تهران با تکمیل نازک‌کاری فضاهای عمومی و تحویل واحدهای اداری فاز نخست، وارد مرحله بهره‌برداری تدریجی شد.',
    date: '۲۸ اردیبهشت ۱۴۰۳',
    sortKey: 14030228,
    category: 'اخبار پروژه‌ها',
    topic: 'project-news',
    image: IMG('megapars-atrium'),
    author: AUTHORS.pr,
    readingMinutes: 5,
    views: 2650,
    tags: ['مگاپارس', 'تحویل_واحد'],
    body: composeBody({
      intro: 'پروژه تجاری اداری مگاپارس تهران با تحویل ۱۲۰ واحد اداری فاز نخست به مالکان، مرحله بهره‌برداری تدریجی را آغاز کرد.',
      sections: [
        { h: 'وضعیت فضاهای تجاری', p: 'نازک‌کاری مال تجاری و آتریوم مرکزی به پایان رسیده و قراردادهای اجاره با برندهای لنگر در حال نهایی شدن است.' },
        { h: 'زمان‌بندی تحویل فاز دوم', p: 'واحدهای اداری فاز دوم بر اساس برنامه، در پاییز ۱۴۰۳ به خریداران تحویل خواهد شد.' },
      ],
      points: ['پیشرفت فیزیکی کل: ۹۴ درصد', 'تحویل ۱۲۰ واحد اداری', 'راه‌اندازی پارکینگ هوشمند ۸۰۰ خودرویی'],
    }),
  }),
  article({
    slug: 'aerogel-insulation-panels',
    contentType: 'news',
    title: 'کاربرد پنل‌های عایق آئروژل در بهینه‌سازی حرارتی دیوارهای خارجی',
    excerpt: 'نتایج آزمایش میدانی پنل‌های آئروژل در پروژه آ.اس.پ مشهد و مقایسه آن با عایق‌های پشم معدنی متداول.',
    date: '۱ اردیبهشت ۱۴۰۳',
    sortKey: 14030201,
    category: 'مصالح نوین',
    topic: 'sustainability',
    image: IMG('insulation-lab'),
    author: AUTHORS.saniei,
    readingMinutes: 6,
    views: 2150,
    tags: ['مصالح_نوین', 'عایق_حرارتی', 'آ.اس.پ_مشهد'],
    body: composeBody({
      intro: 'پنل‌های آئروژل با ضخامتی کمتر از یک‌سوم عایق‌های متداول، مقاومت حرارتی برابر یا بیشتری ارائه می‌کنند. این ویژگی برای بازسازی نمای ساختمان‌های در حال بهره‌برداری اهمیت ویژه دارد.',
      sections: [
        { h: 'آزمایش میدانی در مشهد', p: 'دو دیوار نمونه با جهت‌گیری یکسان در پروژه آ.اس.پ مشهد با دو نوع عایق اجرا و به مدت یک زمستان پایش شد.' },
        { h: 'ملاحظات اقتصادی', p: 'هزینه اولیه آئروژل بالاتر است، اما صرفه‌جویی در فضای مفید و مصرف انرژی، دوره بازگشت سرمایه را به کمتر از شش سال می‌رساند.' },
      ],
      points: ['کاهش ۶۵ درصدی ضخامت لایه عایق', 'بهبود ۱۵ درصدی مقاومت حرارتی دیوار'],
    }),
  }),
  article({
    slug: 'kish-dream-permit',
    contentType: 'news',
    title: 'صدور پروانه ساخت فاز نخست پروژه رویای کیش',
    excerpt: 'پروانه ساخت فاز نخست مجموعه اقامتی گردشگری رویای کیش صادر شد و عملیات تجهیز کارگاه از خرداد آغاز می‌شود.',
    date: '۲۲ فروردین ۱۴۰۳',
    sortKey: 14030122,
    category: 'اخبار پروژه‌ها',
    topic: 'project-news',
    image: IMG('kish-coast'),
    author: AUTHORS.pr,
    readingMinutes: 3,
    views: 2890,
    tags: ['رویای_کیش', 'پروانه_ساخت'],
    body: composeBody({
      intro: 'سازمان منطقه آزاد کیش پروانه ساخت فاز نخست پروژه رویای کیش را صادر کرد. این فاز شامل هتل پنج‌ستاره و ۱۸۰ واحد اقامتی است.',
      sections: [
        { h: 'برنامه اجرایی', p: 'تجهیز کارگاه و عملیات خاکی از خرداد ۱۴۰۳ آغاز شده و اسکلت‌سازی در نیمه دوم سال پیگیری خواهد شد.' },
      ],
    }),
  }),
  article({
    slug: 'agm-1403-dividend',
    contentType: 'news',
    title: 'برگزاری مجمع عمومی عادی سالیانه و تصویب سود نقدی هر سهم',
    excerpt: 'مجمع عمومی عادی سالیانه صاحبان سهام ثاخت با حضور ۷۸ درصد سهامداران برگزار و صورت‌های مالی سال ۱۴۰۲ تصویب شد.',
    date: '۱۵ فروردین ۱۴۰۳',
    sortKey: 14030115,
    category: 'مجامع و سهامداران',
    topic: 'corporate',
    image: IMG('shareholders-meeting'),
    author: AUTHORS.pr,
    readingMinutes: 4,
    views: 3970,
    tags: ['مجمع_عمومی', 'سود_نقدی', 'سهامداران'],
    body: composeBody({
      intro: 'مجمع عمومی عادی سالیانه شرکت بین‌المللی توسعه ساختمان با حضور ۷۸ درصد سهامداران در سالن همایش‌های برج ثاخت برگزار شد.',
      sections: [
        { h: 'مصوبات اصلی مجمع', p: 'صورت‌های مالی سال مالی منتهی به اسفند ۱۴۰۲ تصویب و تقسیم سود نقدی به ازای هر سهم به تصویب رسید. حسابرس و بازرس قانونی نیز برای سال جدید انتخاب شدند.' },
        { h: 'زمان‌بندی پرداخت سود', p: 'سود سهامداران حقیقی از طریق سامانه سجام و در بازه زمانی اعلام‌شده در اطلاعیه کدال پرداخت خواهد شد.' },
      ],
    }),
  }),
]

const storyArticles: ArticleExtended[] = [
  article({
    slug: 'icd-founding-to-bourse-listing',
    contentType: 'story',
    title: 'روایت تاسیس ثاخت از ۱۳۶۴ تا ورود به بازار سرمایه',
    excerpt: 'مروری بر مسیر چهار دهه‌ای هلدینگ، از نخستین پروژه‌های ساختمانی تا پذیرش نماد ثاخت در بورس اوراق بهادار تهران.',
    date: '۲۸ فروردین ۱۴۰۳',
    sortKey: 14030128,
    category: 'روایت ثاخت',
    topic: 'engineering-story',
    image: IMG('history'),
    heroCaption: 'نخستین کارگاه ساختمانی شرکت در تهران، دهه شصت خورشیدی',
    heroCredit: 'آرشیو تاریخی ثاخت',
    author: AUTHORS.hosseini,
    readingMinutes: 9,
    views: 4620,
    featured: true,
    featuredBadge: 'روایت ویژه چهل‌سالگی',
    audio: { durationSec: 1080, narrator: 'رادیو ثاخت', listeners: 3900 },
    audioUrl: 'https://example.com/podcasts/rooye-sakht-founding.mp3',
    tags: ['تاریخچه', 'بورس_تهران', 'چهل_سالگی'],
    body: composeBody({
      intro: 'شرکت بین‌المللی توسعه ساختمان کار خود را در سال ۱۳۶۴ با تمرکز بر پروژه‌های مسکونی کوچک‌مقیاس آغاز کرد. طی دهه‌های بعد، دامنه فعالیت به مجتمع‌های تجاری-اداری، اقامتی-گردشگری و مگاپروژه‌های چندمنظوره گسترش یافت.',
      sections: [
        { h: '۱. سال‌های نخست؛ مسکن در دوران بازسازی', p: 'نخستین پروژه‌های شرکت در سال‌های پس از جنگ و با هدف تامین مسکن کارکنان صنایع اجرا شد؛ تجربه‌ای که فرهنگ کیفیت و تحویل به‌موقع را در ثاخت نهادینه کرد.' },
        { h: '۲. ورود به بازار سرمایه', p: 'پذیرش نماد ثاخت در بورس اوراق بهادار تهران نقطه عطفی در شفافیت مالی و حاکمیت شرکتی هلدینگ بود؛ رویدادی که چارچوب گزارش‌گری دوره‌ای و افشای اطلاعات را برای گروه الزامی کرد.' },
        { h: '۳. عصر مگاپروژه‌ها', p: 'مگاپارس تهران، برج بین‌المللی و مجموعه‌های آ.اس.پ، نسل تازه پروژه‌های هلدینگ را شکل دادند؛ پروژه‌هایی که هم در مقیاس و هم در استانداردهای مهندسی سطح تازه‌ای را تعریف کردند.' },
      ],
      quote: { text: '«ما هیچ‌وقت سریع‌ترین سازنده نبودیم؛ تلاش کردیم قابل اعتمادترین باشیم.»', author: 'مهندس سید علیرضا حسینی', role: 'مدیرعامل' },
      figure: { seed: 'bourse-bell', caption: 'تصویر ۲: مراسم درج نماد ثاخت در تالار بورس تهران' },
      points: ['بیش از ۶۰ پروژه تکمیل‌شده در ۱۲ استان', 'حضور مستمر در بازار سرمایه با نماد ثاخت', 'بیش از ۳ میلیون مترمربع زیربنای اجراشده'],
    }),
  }),
  article({
    slug: 'scc-concrete-coastal-towers',
    contentType: 'story',
    title: 'تکنولوژی بتن‌های خودتراکم (SCC) در پروژه‌های بلندمرتبه ساحلی',
    excerpt: 'میهمان این قسمت: دکتر کامبیز محتشمی (استاد دانشگاه و مشاور عالی تکنولوژی بتن). بررسی آزمایشگاهی مقاومت کلریدی و دوام سازه در پروژه‌های ساحلی کیش.',
    date: '۳۰ اردیبهشت ۱۴۰۳',
    sortKey: 14030230,
    category: 'پادکست روایت ثاخت',
    topic: 'podcast',
    image: IMG('concrete-lab'),
    author: AUTHORS.radio,
    readingMinutes: 6,
    views: 3480,
    audio: { episode: 18, season: 'فصل دوم', durationSec: 2530, narrator: 'رادیو ثاخت', guest: 'دکتر کامبیز محتشمی', guestBoardSlug: 'kambiz-mohtashami', listeners: 4820 },
    audioUrl: 'https://example.com/podcasts/rooye-sakht-18.mp3',
    tags: ['پادکست', 'بتن_خودتراکم', 'سازه_ساحلی'],
    body: composeBody({
      intro: 'در اپیزود هجدهم «روایت ثاخت» با دکتر کامبیز محتشمی، استاد دانشگاه و مشاور عالی تکنولوژی بتن، درباره چالش‌های دوام سازه‌های بتنی در محیط‌های ساحلی گفتگو کرده‌ایم.',
      sections: [
        { h: 'چرا بتن خودتراکم؟', p: 'در سازه‌های پرآرماتور بلندمرتبه، ویبره‌کردن کامل بتن دشوار است. بتن خودتراکم بدون نیاز به ویبره، فضاهای بین میلگردها را پر می‌کند و کیفیت پوشش بتن روی آرماتور را تضمین می‌کند.' },
        { h: 'نفوذ کلرید و عمر مفید', p: 'مهم‌ترین تهدید سازه‌های ساحلی، خوردگی آرماتور بر اثر نفوذ یون کلرید است. در این گفتگو نتایج آزمایش‌های تسریع‌شده نفوذ کلرید روی طرح‌های اختلاط پروژه رویای کیش مرور می‌شود.' },
      ],
      quote: { text: '«در محیط ساحلی، کیفیت پوشش بتن مهم‌تر از مقاومت فشاری آن است.»', author: 'دکتر کامبیز محتشمی', role: 'عضو غیرموظف هیئت‌مدیره' },
      points: ['کاهش ۴۰ درصدی ضریب نفوذ کلرید با افزودن میکروسیلیس', 'حذف کامل ویبره در اجرای دیوارهای برشی'],
    }),
  }),
  article({
    slug: 'real-estate-financing-bourse',
    contentType: 'story',
    title: 'تامین مالی املاک و ساخت مسکن در تالار بورس',
    excerpt: 'گفتگو با مدیر صندوق املاک و مستغلات پیرامون روش‌های نوآورانه جذب سرمایه خرد.',
    date: '۲۰ اردیبهشت ۱۴۰۳',
    sortKey: 14030220,
    category: 'پادکست روایت ثاخت',
    topic: 'podcast',
    image: IMG('blueprints-desk'),
    author: AUTHORS.radio,
    readingMinutes: 5,
    views: 2210,
    audio: { episode: 17, season: 'فصل دوم', durationSec: 2280, narrator: 'رادیو ثاخت', guest: 'مدیر صندوق املاک و مستغلات', listeners: 3650 },
    audioUrl: 'https://example.com/podcasts/rooye-sakht-17.mp3',
    tags: ['پادکست', 'صندوق_املاک', 'تامین_مالی'],
    body: composeBody({
      intro: 'صندوق‌های املاک و مستغلات و اوراق سلف مسکن، دو ابزار تازه برای ورود سرمایه‌های خرد به بازار ساخت‌وساز هستند. در اپیزود هفدهم به سازوکار این ابزارها پرداخته‌ایم.',
      sections: [
        { h: 'صندوق املاک چگونه کار می‌کند؟', p: 'صندوق با جمع‌آوری سرمایه از سرمایه‌گذاران خرد، دارایی‌های درآمدزا را خریداری یا احداث می‌کند و سود حاصل از اجاره و فروش را میان دارندگان واحدها تقسیم می‌کند.' },
        { h: 'نقش هلدینگ‌های ساختمانی', p: 'هلدینگ‌هایی با سابقه اجرایی و گزارش‌گری شفاف، می‌توانند به‌عنوان بازارگردان یا مجری پروژه‌های صندوق، ریسک اجرا را برای سرمایه‌گذاران کاهش دهند.' },
      ],
    }),
  }),
  article({
    slug: 'leed-green-certification-iran',
    contentType: 'story',
    title: 'استانداردهای گواهی سبز LEED در معماری ایران',
    excerpt: 'راهکارهای واقعی کاهش مصرف انرژی در سیستم‌های نوین سرمایش و گرمایش برج‌ها.',
    date: '۸ اردیبهشت ۱۴۰۳',
    sortKey: 14030208,
    category: 'پادکست روایت ثاخت',
    topic: 'podcast',
    image: IMG('green-architecture-model'),
    author: AUTHORS.radio,
    readingMinutes: 5,
    views: 1880,
    audio: { episode: 16, season: 'فصل دوم', durationSec: 2760, narrator: 'رادیو ثاخت', guest: 'دکتر مهرداد صنیعی', guestBoardSlug: 'mehrdad-saniei', listeners: 3120 },
    audioUrl: 'https://example.com/podcasts/rooye-sakht-16.mp3',
    tags: ['پادکست', 'LEED', 'ساختمان_سبز'],
    body: composeBody({
      intro: 'گواهی LEED در ایران هنوز نوپاست، اما معیارهای آن می‌تواند نقشه راه طراحی ساختمان‌های کم‌مصرف باشد. در این اپیزود با دکتر مهرداد صنیعی درباره تجربه ثاخت گفتگو کرده‌ایم.',
      sections: [
        { h: 'از چک‌لیست تا طراحی یکپارچه', p: 'امتیازهای LEED زمانی به صرفه‌جویی واقعی تبدیل می‌شوند که معمار، مهندس تاسیسات و بهره‌بردار از روز نخست در یک تیم طراحی یکپارچه کنار هم باشند.' },
      ],
    }),
  }),
  article({
    slug: 'epc-supply-chain-steel-cement',
    contentType: 'story',
    title: 'مدیریت زنجیره تامین فولاد و سیمان در پروژه‌های EPC',
    excerpt: 'راهکارهای کنترل تورم نهاده‌های ساختمانی در قراردادهای کلان هلدینگ.',
    date: '۲۵ فروردین ۱۴۰۳',
    sortKey: 14030125,
    category: 'پادکست روایت ثاخت',
    topic: 'podcast',
    image: IMG('crane-dawn'),
    author: AUTHORS.radio,
    readingMinutes: 6,
    views: 1540,
    audio: { episode: 15, season: 'فصل دوم', durationSec: 3060, narrator: 'رادیو ثاخت', guest: 'مدیر تدارکات هلدینگ', listeners: 2870 },
    audioUrl: 'https://example.com/podcasts/rooye-sakht-15.mp3',
    tags: ['پادکست', 'زنجیره_تامین', 'EPC'],
    body: composeBody({
      intro: 'نوسان قیمت فولاد و سیمان، بزرگ‌ترین ریسک قراردادهای EPC با مبلغ مقطوع است. در اپیزود پانزدهم به روش‌های پوشش این ریسک پرداخته‌ایم.',
      sections: [
        { h: 'خرید پیشاپیش و انبارش', p: 'تامین بخشی از مصالح اصلی در ابتدای پروژه و قراردادهای بلندمدت با تولیدکنندگان، اثر تورم را بر هزینه تمام‌شده محدود می‌کند.' },
        { h: 'بورس کالا به‌عنوان ابزار پوشش ریسک', p: 'خرید میلگرد و سیمان از طریق بورس کالا، علاوه بر شفافیت قیمت، امکان برنامه‌ریزی دقیق‌تر جریان نقدینگی را فراهم می‌کند.' },
      ],
    }),
  }),
  article({
    slug: 'site-engineer-diary-narenjestan',
    contentType: 'story',
    title: 'یک روز با مهندس کارگاه در پروژه نارنجستان ایزدشهر',
    excerpt: 'از جلسه ایمنی ساعت شش صبح تا بتن‌ریزی شبانه؛ روایت یک روز کاری در کارگاه ساحلی ثاخت در مازندران.',
    date: '۱۲ اردیبهشت ۱۴۰۳',
    sortKey: 14030212,
    category: 'گفتگو و چهره‌ها',
    topic: 'people',
    image: IMG('site-engineer'),
    author: AUTHORS.pr,
    readingMinutes: 7,
    views: 1320,
    tags: ['نارنجستان_ایزدشهر', 'کارگاه', 'روایت'],
    body: composeBody({
      intro: 'ساعت شش صبح، پیش از آنکه نخستین کامیون بتن به کارگاه برسد، جلسه ایمنی روزانه در کانکس دفتر فنی پروژه نارنجستان ایزدشهر آغاز می‌شود.',
      sections: [
        { h: 'صبح؛ برنامه‌ریزی و ایمنی', p: 'مهندس کارگاه فهرست فعالیت‌های روز را با سرپرستان مرور می‌کند و مجوزهای کار در ارتفاع صادر می‌شود.' },
        { h: 'شب؛ بتن‌ریزی دال', p: 'رطوبت بالای هوای ساحلی باعث شده بتن‌ریزی دال‌ها به ساعات خنک شب منتقل شود؛ کاری که تا نیمه‌شب ادامه دارد.' },
      ],
      quote: { text: '«در کارگاه هیچ روزی شبیه روز قبل نیست؛ فقط جلسه ایمنی صبح است که هرگز تغییر نمی‌کند.»', author: 'مهندس کارگاه پروژه', role: 'نارنجستان ایزدشهر' },
    }),
  }),
  article({
    slug: 'women-in-construction-icd',
    contentType: 'story',
    title: 'زنان مهندس در کارگاه‌های ثاخت؛ روایت سه نسل',
    excerpt: 'سه مهندس از سه نسل متفاوت، از نخستین تجربه حضور در کارگاه تا مدیریت پروژه‌های بلندمرتبه روایت می‌کنند.',
    date: '۴ خرداد ۱۴۰۳',
    sortKey: 14030304,
    category: 'گفتگو و چهره‌ها',
    topic: 'people',
    image: IMG('women-engineers'),
    author: AUTHORS.pr,
    readingMinutes: 9,
    views: 2040,
    tags: ['منابع_انسانی', 'مهندسی', 'روایت'],
    body: composeBody({
      intro: 'سهم زنان از تیم‌های فنی ثاخت در ده سال گذشته دو برابر شده است. سه نفر از آنان روایت خود را از کارگاه تا اتاق مدیریت پروژه بازگو می‌کنند.',
      sections: [
        { h: 'نسل نخست؛ دهه هفتاد', p: 'نخستین مهندس زن کارگاه‌های ثاخت از روزهایی می‌گوید که حتی کانکس جداگانه‌ای برای او وجود نداشت.' },
        { h: 'نسل امروز', p: 'امروز مدیریت کنترل پروژه برج بین‌المللی تهران بر عهده یک مهندس زن است؛ تغییری که به گفته او حاصل انباشت تجربه نسل‌های قبل است.' },
      ],
    }),
  }),
]

const reportArticles: ArticleExtended[] = [
  article({
    slug: 'quarterly-market-outlook-1403',
    contentType: 'report',
    title: 'گزارش فصلی بازار مسکن و افق پیش‌فروش در سال ۱۴۰۳',
    excerpt: 'تحلیل روند قیمت مسکن، حجم معاملات و پیش‌بینی تقاضای پیش‌فروش در کلان‌شهرهای هدف پروژه‌های هلدینگ.',
    date: '۵ خرداد ۱۴۰۳',
    sortKey: 14030305,
    category: 'گزارش فصلی',
    topic: 'market',
    image: IMG('market-report'),
    heroCaption: 'نمای شهری تهران از ارتفاع برج بین‌المللی',
    heroCredit: 'دیده‌بان ثاخت',
    author: AUTHORS.economics,
    readingMinutes: 11,
    views: 4210,
    featured: true,
    featuredBadge: 'گزارش فصلی بهار ۱۴۰۳',
    tags: ['بازار_مسکن', 'پیش‌فروش', 'گزارش_فصلی'],
    body: composeBody({
      intro: 'گزارش فصلی دیده‌بان ثاخت، روند شاخص‌های بنیادین بازار مسکن شامل نرخ رشد قیمت، حجم معاملات و نسبت اجاره به قیمت را در مناطق فعالیت پروژه‌های هلدینگ بررسی می‌کند.',
      sections: [
        { h: '۱. روند قیمت و حجم معاملات', p: 'در بهار ۱۴۰۳ رشد اسمی قیمت مسکن در تهران کندتر از نرخ تورم عمومی بوده، اما حجم معاملات نسبت به فصل مشابه سال گذشته افزایش یافته است؛ نشانه‌ای از بازگشت تدریجی تقاضای مصرفی.' },
        { h: '۲. تقاضای پیش‌فروش', p: 'با توجه به روند تورم نهاده‌های ساختمانی، تقاضای پیش‌فروش واحدهای در حال ساخت در فصل جاری نسبت به دوره مشابه سال گذشته افزایش نشان می‌دهد.' },
        { h: '۳. جمع‌بندی و چشم‌انداز', p: 'انتظار می‌رود در نیمه دوم سال، واحدهای با متراژ متوسط در مناطق دارای دسترسی حمل‌ونقل عمومی بیشترین تقاضا را داشته باشند.' },
      ],
      quote: { text: '«پیش‌فروش شفاف، هم برای خریدار پوشش تورمی است و هم برای سازنده ارزان‌ترین منبع مالی.»', author: 'دپارتمان تحلیل اقتصادی ثاخت' },
      figure: { seed: 'market-chart-desk', caption: 'نمودار ۱: شاخص قیمت و حجم معاملات مسکن تهران در چهار فصل اخیر' },
      points: ['افزایش ۱۴ درصدی حجم معاملات نسبت به بهار ۱۴۰۲', 'رشد ۲۸ درصدی تقاضای پیش‌فروش', 'ثبات نسبی نسبت اجاره به قیمت در مناطق مرکزی'],
    }),
  }),
  article({
    slug: 'housing-price-index-spring-1403',
    contentType: 'report',
    title: 'گزارش فصلی شاخص قیمت مسکن؛ ارزیابی سودآوری سرمایه‌گذاری ملکی در بهار ۱۴۰۳',
    excerpt: 'تحلیل داده‌های آماری مناطق بیست‌ودوگانه تهران و مقایسه نرخ بازدهی دارایی‌های ساختمانی با بازارهای موازی طلا و ارز.',
    date: '۱۵ اردیبهشت ۱۴۰۳',
    sortKey: 14030215,
    category: 'بازار سرمایه و مسکن',
    topic: 'market',
    image: IMG('tehran-districts'),
    author: AUTHORS.economics,
    readingMinutes: 5,
    views: 3950,
    tags: ['شاخص_قیمت', 'بازدهی', 'تهران'],
    body: composeBody({
      intro: 'این گزارش بازدهی سرمایه‌گذاری در مسکن را در مناطق بیست‌ودوگانه تهران با بازارهای موازی مقایسه می‌کند.',
      sections: [
        { h: 'مقایسه با بازارهای موازی', p: 'در افق سه‌ساله، بازدهی مسکن در مناطق شمالی تهران هم‌تراز با طلا و بالاتر از ارز بوده است، در حالی که نوسان آن به‌مراتب کمتر است.' },
        { h: 'تفاوت مناطق', p: 'مناطق دارای پروژه‌های نوساز و دسترسی به خطوط مترو، بیشترین رشد قیمت را تجربه کرده‌اند.' },
      ],
      points: ['بازدهی سه‌ساله مسکن منطقه ۱: ۱۸۵ درصد', 'کمترین نوسان در میان دارایی‌های مورد مقایسه'],
    }),
  }),
  article({
    slug: 'nav-analysis-ordibehesht',
    contentType: 'report',
    title: 'تحلیل جامع ارزش خالص دارایی‌ها (NAV) نماد ثاخت در اردیبهشت ماه',
    excerpt: 'برآورد ارزش روز پرتفوی املاک و پروژه‌های در حال ساخت هلدینگ و مقایسه آن با ارزش بازار سهام.',
    date: '۳۱ اردیبهشت ۱۴۰۳',
    sortKey: 14030231,
    category: 'بورس و سهام',
    topic: 'governance',
    image: IMG('stock-screen'),
    author: AUTHORS.economics,
    readingMinutes: 8,
    views: 2800,
    tags: ['NAV', 'نماد_ثاخت', 'ارزش‌گذاری'],
    body: composeBody({
      intro: 'ارزش خالص دارایی‌ها یکی از مهم‌ترین معیارهای ارزش‌گذاری شرکت‌های ساختمانی است. این گزارش NAV نماد ثاخت را بر اساس ارزش روز دارایی‌ها برآورد می‌کند.',
      sections: [
        { h: 'روش ارزش‌گذاری', p: 'املاک تکمیل‌شده بر اساس قیمت‌های کارشناسی روز و پروژه‌های در حال ساخت بر اساس درصد پیشرفت فیزیکی و ارزش فعلی جریان‌های نقدی آتی ارزش‌گذاری شده‌اند.' },
        { h: 'مقایسه با ارزش بازار', p: 'نسبت قیمت بازار به NAV در پایان اردیبهشت، نشان‌دهنده فاصله قابل‌توجه ارزش بازار از ارزش ذاتی دارایی‌هاست.' },
      ],
    }),
  }),
  article({
    slug: 'density-regulations-district-1',
    contentType: 'report',
    title: 'پیش‌بینی تاثیر مصوبات جدید تراکم ساختمانی بر قیمت تمام‌شده در منطقه ۱',
    excerpt: 'بررسی سناریوهای افزایش عوارض تراکم و اثر آن بر هزینه ساخت و قیمت فروش پروژه‌های شمال تهران.',
    date: '۲۲ اردیبهشت ۱۴۰۳',
    sortKey: 14030222,
    category: 'بازار مسکن',
    topic: 'market',
    image: IMG('north-tehran'),
    author: AUTHORS.economics,
    readingMinutes: 6,
    views: 2560,
    tags: ['تراکم', 'عوارض_شهرداری', 'منطقه_۱'],
    body: composeBody({
      intro: 'مصوبه جدید شورای شهر درباره عوارض تراکم مازاد، بر اقتصاد پروژه‌های منطقه ۱ تهران اثر مستقیم دارد. این گزارش سه سناریوی محتمل را بررسی می‌کند.',
      sections: [
        { h: 'سناریوهای اجرای مصوبه', p: 'در سناریوی پایه، عوارض تراکم حدود ۸ درصد به هزینه تمام‌شده اضافه می‌کند؛ این رقم در سناریوی بدبینانه به ۱۵ درصد می‌رسد.' },
      ],
    }),
  }),
  article({
    slug: 'kish-residential-yield',
    contentType: 'report',
    title: 'تحلیل نرخ بازده پروژه‌های مسکونی لوکس کیش و فرصت‌های آتی',
    excerpt: 'بازده اجاره کوتاه‌مدت و رشد قیمت واحدهای اقامتی کیش در مقایسه با بازار سرزمین اصلی.',
    date: '۱۴ اردیبهشت ۱۴۰۳',
    sortKey: 14030214,
    category: 'کارنامه پروژه‌ها',
    topic: 'performance',
    image: IMG('kish-villas'),
    author: AUTHORS.economics,
    readingMinutes: 6,
    views: 1990,
    tags: ['کیش', 'بازده_اجاره', 'اقامتی'],
    body: composeBody({
      intro: 'رشد گردشگری کیش در دو سال اخیر، بازده اجاره کوتاه‌مدت واحدهای اقامتی را به بالاترین سطح یک دهه اخیر رسانده است.',
      sections: [
        { h: 'بازده اجاره کوتاه‌مدت', p: 'میانگین بازده سالانه اجاره کوتاه‌مدت واحدهای اقامتی لوکس کیش حدود دو برابر بازده اجاره مسکونی در تهران است.' },
        { h: 'فرصت‌های پروژه رویای کیش', p: 'فاز نخست رویای کیش با ترکیب هتل و واحدهای اقامتی، برای بهره‌گیری از این روند طراحی شده است.' },
      ],
    }),
  }),
  article({
    slug: 'projects-scorecard-q4-1402',
    contentType: 'report',
    title: 'کارنامه پیشرفت فیزیکی و مالی پروژه‌ها در فصل چهارم ۱۴۰۲',
    excerpt: 'مقایسه پیشرفت برنامه‌ای و واقعی پروژه‌های در حال ساخت هلدینگ و وضعیت جریان نقدی هر پروژه.',
    date: '۲۰ فروردین ۱۴۰۳',
    sortKey: 14030120,
    category: 'کارنامه پروژه‌ها',
    topic: 'performance',
    image: IMG('site-progress'),
    author: AUTHORS.audit,
    readingMinutes: 9,
    views: 1720,
    tags: ['پیشرفت_فیزیکی', 'کنترل_پروژه'],
    body: composeBody({
      intro: 'کارنامه فصلی پروژه‌ها، پیشرفت برنامه‌ای و واقعی هر پروژه در حال ساخت را همراه با وضعیت جریان نقدی آن گزارش می‌کند.',
      sections: [
        { h: 'پروژه‌های جلوتر از برنامه', p: 'برج بین‌المللی تهران و عفاف‌آباد شیراز در فصل چهارم ۱۴۰۲ پیشرفتی بالاتر از برنامه مصوب داشته‌اند.' },
        { h: 'پروژه‌های نیازمند توجه', p: 'نارنجستان ایزدشهر به دلیل شرایط جوی زمستان، حدود سه درصد از برنامه عقب است که برنامه جبرانی آن تصویب شده است.' },
      ],
      points: ['برج بین‌المللی تهران: ۶۲٪ واقعی در برابر ۵۸٪ برنامه‌ای', 'عفاف‌آباد شیراز: ۴۱٪ واقعی در برابر ۴۰٪ برنامه‌ای', 'نارنجستان ایزدشهر: ۳۵٪ واقعی در برابر ۳۸٪ برنامه‌ای'],
    }),
  }),
  article({
    slug: 'board-performance-1402',
    contentType: 'report',
    title: 'گزارش عملکرد هیئت‌مدیره در سال مالی ۱۴۰۲',
    excerpt: 'مروری بر تصمیمات کلیدی، عملکرد کمیته‌های تخصصی و اهداف هیئت‌مدیره برای سال مالی جدید.',
    date: '۱۰ فروردین ۱۴۰۳',
    sortKey: 14030110,
    category: 'حاکمیت شرکتی',
    topic: 'governance',
    image: IMG('board-report'),
    author: AUTHORS.rezvani,
    readingMinutes: 12,
    views: 2330,
    tags: ['هیئت‌مدیره', 'حاکمیت_شرکتی', 'گزارش_سالانه'],
    body: composeBody({
      intro: 'گزارش عملکرد هیئت‌مدیره به مجمع عمومی، تصویری از تصمیمات راهبردی، عملکرد کمیته‌ها و اهداف سال آینده هلدینگ ارائه می‌کند.',
      sections: [
        { h: 'تصمیمات راهبردی سال ۱۴۰۲', p: 'تمرکز بر تکمیل پروژه‌های در حال ساخت، واگذاری دارایی‌های غیرمولد و ورود به ابزارهای نوین تامین مالی، سه محور اصلی تصمیمات هیئت‌مدیره بود.' },
        { h: 'عملکرد کمیته‌های تخصصی', p: 'کمیته‌های حسابرسی، ریسک، انتصابات و فنی در مجموع ۴۲ جلسه برگزار کردند و گزارش‌های آنان در سامانه کدال منتشر شده است.' },
      ],
      quote: { text: '«هیئت‌مدیره پاسخگوی سهامدار است، نه صرفاً ناظر مدیریت.»', author: 'دکتر کاوه رضوانی', role: 'رئیس هیئت‌مدیره' },
    }),
  }),
]

export const articles: ArticleExtended[] = [...newsArticles, ...storyArticles, ...reportArticles]

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

function toCard(a: ArticleExtended): ArticleCardExtended {
  const { slug, title, excerpt, date, category, image, contentType, topic, author, readingMinutes, views, sortKey, featured, featuredBadge, audio } = a
  return { slug, title, excerpt, date, category, image, contentType, topic, topicLabel: topicLabel(topic), author, readingMinutes, views, sortKey, featured, featuredBadge, audio }
}

function byNewest(a: { sortKey: number }, b: { sortKey: number }) {
  return b.sortKey - a.sortKey
}

export function getArticlesByType(type: ArticleType): ArticleCardExtended[] {
  return articles.filter(a => a.contentType === type).sort(byNewest).map(toCard)
}

export function getFeaturedArticle(type: ArticleType): ArticleCardExtended | undefined {
  const list = getArticlesByType(type)
  return list.find(a => a.featured) ?? list[0]
}

export function getTopicsByType(type: ArticleType): (MediaTopic & { count: number })[] {
  return mediaTopics
    .filter(t => t.type === type)
    .map(t => ({ ...t, count: articles.filter(a => a.topic === t.key).length }))
}

export function getAllTopicCounts(): (MediaTopic & { count: number; href: string })[] {
  return mediaTopics.map(t => ({
    ...t,
    count: articles.filter(a => a.topic === t.key).length,
    href: `${mediaHubHref[t.type]}?topic=${t.key}`,
  }))
}

export function getTrendingArticles(type?: ArticleType, count = 4, excludeSlug?: string): ArticleCardExtended[] {
  return articles
    .filter(a => (!type || a.contentType === type) && a.slug !== excludeSlug)
    .sort((a, b) => b.views - a.views)
    .slice(0, count)
    .map(toCard)
}

export function getPodcastEpisodes(): ArticleCardExtended[] {
  return articles
    .filter(a => a.audio?.episode)
    .sort((a, b) => (b.audio?.episode ?? 0) - (a.audio?.episode ?? 0))
    .map(toCard)
}

/** Articles written by — or podcast episodes featuring — a board member. */
export function getArticlesByBoardMember(boardSlug: string, count = 4): ArticleCardExtended[] {
  return articles
    .filter(a => a.author.boardSlug === boardSlug || a.audio?.guestBoardSlug === boardSlug)
    .sort(byNewest)
    .slice(0, count)
    .map(toCard)
}

export function getRelatedArticles(type: ArticleType, slug: string, count = 3): ArticleCardExtended[] {
  const current = articles.find(a => a.contentType === type && a.slug === slug)
  const pool = articles.filter(a => a.contentType === type && a.slug !== slug).sort(byNewest)
  const sameTopic = pool.filter(a => a.topic === current?.topic)
  const rest = pool.filter(a => a.topic !== current?.topic)
  return [...sameTopic, ...rest].slice(0, count).map(toCard)
}

export function getArticle(type: ArticleType, slug: string): ArticleDetailExtended | undefined {
  const found = articles.find(a => a.contentType === type && a.slug === slug)
  if (!found) return undefined
  const hub = articles.filter(a => a.contentType === type).sort(byNewest)
  const index = hub.findIndex(a => a.slug === slug)
  // Wrap around so both "previous" (older) and "next" (newer) are always filled.
  const older = hub.length > 1 ? hub[(index + 1) % hub.length] : undefined
  const newer = hub.length > 2 ? hub[(index - 1 + hub.length) % hub.length] : undefined
  return {
    ...found,
    topicLabel: topicLabel(found.topic),
    related: getRelatedArticles(type, slug, 3),
    previous: older ? toCard(older) : undefined,
    next: newer ? toCard(newer) : undefined,
  }
}

// ---------------------------------------------------------------------------
// Formatting helpers (Persian digits)
// ---------------------------------------------------------------------------

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

export function toFaDigits(value: number | string): string {
  return String(value).replace(/\d/g, d => FA_DIGITS[Number(d)] ?? d)
}

export function formatFaNumber(value: number): string {
  return toFaDigits(value.toLocaleString('en-US'))
}

export function formatDuration(totalSec: number): string {
  const sec = Math.max(0, Math.floor(totalSec))
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return toFaDigits(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
}
