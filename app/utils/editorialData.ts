/**
 * Mock content for the long-form editorial template (/about/vision,
 * /about/csr, /legal/terms, /legal/privacy) — placeholder pending the real
 * WordPress data layer (docs/decisions.md ADR-002).
 *
 * Structure follows `project_detail_page_template/05_static_editorial_plain`:
 * breadcrumb → hero image with badges → editorial intro split → jump-link
 * TOC → a sequence of typed content blocks (two-column specialty list,
 * callout banner, featured-project carousel, governance pillars, prose,
 * related news). Every page composes the same block kinds so the four
 * routes share one template (`StaticEditorial.vue`).
 */
import { phFor } from '~/utils/media'
import type { ProjectStatusKey } from '~/utils/catalog'
import { getProjectDetail } from '~/utils/projectsData'
import { articles } from '~/utils/articlesData'

/** Kept for backwards compatibility with older consumers. */
export interface EditorialSectionViewModel {
  id: string
  heading: string
  bodyHtml: string
}

export type EditorialIcon = 'eco' | 'gavel' | 'shield' | 'people' | 'doc' | 'lock' | 'eye' | 'edit' | 'trash' | 'scale'

export interface EditorialListItem {
  title: string
  /** Latin technical term shown on the far side of the row (tabular, LTR). */
  en?: string
}

export interface EditorialProjectCard {
  slug: string
  name: string
  location: string
  status: ProjectStatusKey
  statusLabel: string
  description: string
  metricLabel: string
  metricValue: string
  image: string
}

export interface EditorialPillar {
  icon: EditorialIcon
  title: string
  text: string
  linkLabel: string
  href: string
}

export interface EditorialNewsItem {
  date: string
  title: string
  excerpt: string
  href: string
}

interface BlockBase {
  id: string
  /** Label in the jump-link TOC; omitted blocks don't appear there. */
  navLabel?: string
}

export type EditorialBlock =
  | (BlockBase & { kind: 'list', eyebrow: string, heading: string, description: string, items: EditorialListItem[], pageSize?: number })
  | (BlockBase & { kind: 'callout', heading: string, description: string, cta: { label: string, href: string } })
  | (BlockBase & { kind: 'projects', eyebrow: string, heading: string, allLabel: string, allHref: string, items: EditorialProjectCard[] })
  | (BlockBase & { kind: 'pillars', eyebrow: string, heading: string, description: string, items: EditorialPillar[] })
  | (BlockBase & { kind: 'prose', eyebrow?: string, heading: string, bodyHtml: string, number?: string })
  | (BlockBase & { kind: 'news', heading: string, allLabel: string, allHref: string, items: EditorialNewsItem[] })

export interface EditorialPageViewModel {
  eyebrow?: string
  /** Page name — breadcrumb current item, SEO title and site-search title. */
  title: string
  /** SEO description / site-search excerpt. */
  intro: string
  breadcrumbParent: { label: string, href?: string }
  hero: {
    image: string
    alt: string
    liveBadge?: string
    codeBadge?: string
    heading: string
    subheading?: string
    compact?: boolean
  }
  lead: {
    heading: string
    highlight?: string
    badge?: string
    paragraphs: string[]
  }
  blocks: EditorialBlock[]
}

const IMG = (seed: string) => phFor(seed)
const HERO = (seed: string) => phFor(seed)

function projectCard(slug: string, description: string, image: string): EditorialProjectCard {
  const d = getProjectDetail(slug)
  return {
    slug,
    name: d?.name ?? slug,
    location: d?.location ?? '',
    status: d?.status ?? 'upcoming',
    statusLabel: d?.statusLabel ?? '',
    description,
    metricLabel: 'زیربنای ناخالص:',
    metricValue: d?.area ?? '—',
    image,
  }
}

const articleHref: Record<string, string> = { news: '/media/news', story: '/media/stories', report: '/media/reports' }

const relatedNews: EditorialNewsItem[] = articles.slice(0, 3).map(a => ({
  date: a.date ?? '',
  title: a.title,
  excerpt: a.excerpt ?? '',
  href: `${articleHref[a.contentType] ?? '/media'}/${a.slug}`,
}))

const featuredProjects: EditorialProjectCard[] = [
  projectCard('tehran-international-tower', 'بلندترین تک‌برج چندمنظوره هلدینگ با ۵۶ طبقه، مجهز به جداگرهای پیشرفته لرزه‌ای و نمای هوشمند دوپوسته.', IMG('icd-ed-tower')),
  projectCard('mega-pars-tehran', 'بزرگ‌ترین مجموعه تجاری، اداری و تفریحی هلدینگ با سازه مختلط فولادی-بتنی و پارکینگ هوشمند طبقاتی.', IMG('icd-ed-megapars')),
  projectCard('ofogh-sina-mashhad', 'هتل‌آپارتمان و پهنه‌های تجاری متراکم با سازه پیش‌تنیده ضدزلزله و دسترسی‌های مستقل شهری.', IMG('icd-ed-asp')),
  projectCard('narenjestan-izadshahr', 'مجتمع مسکونی شهری با معماری اقلیمی، حیاط‌های مرکزی و سامانه مدیریت انرژی ساختمان.', IMG('icd-ed-shiraz')),
  projectCard('roya-elite', 'مجتمع اقامتی-گردشگری ساحلی با بتن ضدسولفات و سقف‌های دال مجوف در اقلیم مرطوب.', IMG('icd-ed-kish')),
  projectCard('narenjestan-izadshahr', 'شهرک مسکونی و تجاری ساحلی با زیرساخت مستقل آب و فاضلاب و فضای سبز پیوسته.', IMG('icd-ed-narenjestan')),
]

export const visionPage: EditorialPageViewModel = {
  eyebrow: 'چشم‌انداز و ماموریت',
  title: 'چشم‌انداز، حاکمیت شرکتی و استانداردهای مهندسی ثاخت',
  intro: 'شرکت بین‌المللی توسعه ساختمان (ثاخت) با تکیه بر چهار دهه فعالیت پیوسته، پیشرفته‌ترین بسترهای مهندسی ژئوتکنیک، طراحی سازه‌های فوق‌سنگین و توسعه پایدار املاک را در مقیاس ملی رهبری می‌کند.',
  breadcrumbParent: { label: 'درباره ثاخت', href: '/about' },
  hero: {
    image: HERO('icd-vision-hero'),
    alt: 'گودبرداری عمیق و سازه نگهبان در یکی از کارگاه‌های هلدینگ ثاخت',
    liveBadge: 'پروژه فعال: سازه مهندسی و پایدارسازی ژئوتکنیک فاز ۴',
    codeBadge: 'کدال نماد: ثاخت | ICD1',
    heading: 'مهندسی سازه‌های مقیاس‌بزرگ، پایداری زمین و خلق ارزش نمادین ملی',
    subheading: 'بیش از چهار دهه مرجعیت در ژئوتکنیک پیشرفته، بلندمرتبه‌سازی ساختمانی و سرمایه‌گذاری متمرکز در املاک و مستغلات شاخص ایران',
  },
  lead: {
    heading: 'پیشگام در مهندسی ناممکن‌ها و توسعه پایدار زیرساخت‌های ملی از سال',
    highlight: '۱۳۶۴',
    badge: 'زیرمجموعه ارشد هلدینگ سرمایه‌گذاری غدیر',
    paragraphs: [
      'شرکت بین‌المللی توسعه ساختمان (ثاخت) با تکیه بر چهار دهه فعالیت پیوسته و پشتوانه فنی بیش از ۵ میلیون مترمربع عملیات ساختمانی اجرا شده، پیشرفته‌ترین بسترهای مهندسی ژئوتکنیک، طراحی سازه‌های فوق‌سنگین، حفاری عمیق شهری و مهاربندی تخصصی را در مقیاس ملی رهبری می‌نماید.',
      'رویکرد بنیادین ثاخت تلفیق انضباط محاسباتی، کنترل بهای تمام‌شده، ایمنی مطلق کارگاهی و پایبندی شفاف به اصول حاکمیت شرکتی در چارچوب بازار سرمایه است. ما یقین مهندسی را پیش از آغاز نخستین عملیات گودبرداری تضمین کرده و پایداری سازه را در چرخه کامل عمر پروژه‌ها رقم می‌زنیم.',
    ],
  },
  blocks: [
    {
      kind: 'prose',
      id: 'mission',
      navLabel: 'ماموریت و چشم‌انداز',
      eyebrow: 'بیانیه راهبردی',
      heading: 'ماموریت، چشم‌انداز و ارزش‌های بنیادین',
      bodyHtml: '<p><strong>ماموریت:</strong> خلق ارزش پایدار برای سهامداران، مشتریان و جامعه از طریق مهندسی دقیق، شفافیت مالی و تعهد به بالاترین استانداردهای کیفیت ساخت.</p><p><strong>چشم‌انداز:</strong> تثبیت جایگاه ثاخت به‌عنوان مرجع مهندسی و سرمایه‌گذاری ساختمانی در سطح منطقه، با تمرکز بر مگاپروژه‌های چندمنظوره و فناوری‌های نوین ساخت.</p><ul><li>انضباط مهندسی و کنترل کیفیت در تمامی مراحل اجرا</li><li>شفافیت مالی و پایبندی به اصول حاکمیت شرکتی</li><li>ایمنی مطلق کارگاهی و مسئولیت اجتماعی</li><li>نوآوری مستمر در فناوری‌های ساخت</li></ul>',
    },
    {
      kind: 'list',
      id: 'specialties',
      navLabel: 'تخصص‌های مهندسی',
      eyebrow: 'دامنه توانمندی‌های تخصصی',
      heading: 'تخصص‌ها و صلاحیت‌های مهندسی',
      description: 'اجرای دانش‌محور پیچیده‌ترین عملیات عمرانی منطبق با آخرین ویرایش آیین‌نامه‌های ملی و جهانی',
      pageSize: 10,
      items: [
        { title: 'گودبرداری‌های عمیق و مهاربندی دیواره‌ها', en: 'Deep Excavation & Shoring' },
        { title: 'پایدارسازی با نیلینگ، انکراژ و استرات', en: 'Soil Nailing & Strutting' },
        { title: 'شمع‌کوبی و اجرای شمع‌های بتنی درجا', en: 'Augercast & Bored Piles' },
        { title: 'ابزاربندی ژئوتکنیک و مانیتورینگ آنلاین رفتار سازه', en: 'Real-time Instrumentation' },
        { title: 'مدیریت آب‌های زیرزمینی و زهکشی عمیق', en: 'Construction Dewatering' },
        { title: 'بتن‌ریزی‌های حجیم فوق‌مقاوم و نانوافزودنی', en: 'Ultra-High Performance Concrete' },
        { title: 'فناوری پیش‌تنیدگی در دهانه‌های بسیار بزرگ', en: 'Post-tensioning Systems' },
        { title: 'طراحی و مهندسی پایدار با الزامات LEED و سبز', en: 'Sustainable Green Buildings' },
        { title: 'احداث مگامال‌ها و مجموعه‌های چندمنظوره متراکم', en: 'Mixed-use Megastructures' },
        { title: 'بهسازی لرزه‌ای و حفاظت از سازه‌های مجاور', en: 'Seismic Retrofit & Underpinning' },
        { title: 'مدل‌سازی اطلاعات ساخت و هماهنگی چندرشته‌ای', en: 'BIM Coordination' },
        { title: 'سازه‌های فولادی سنگین و اتصالات پیچ‌ومهره‌ای', en: 'Heavy Steel Structures' },
        { title: 'سامانه‌های نمای دوپوسته و پرده‌ای شیشه‌ای', en: 'Double-skin Curtain Walls' },
        { title: 'مدیریت طرح و کنترل پروژه یکپارچه', en: 'Project Management & Controls' },
        { title: 'بهره‌برداری و نگهداری هوشمند ساختمان', en: 'Facility Management' },
      ],
    },
    {
      kind: 'callout',
      id: 'engineering-team',
      navLabel: 'سرمایه انسانی و تیم مدیریتی',
      heading: 'دیدار با تیم فنی، هیات‌مدیره و مهندسان ارشد ثاخت',
      description: 'آشنایی با تجربه اجرایی مدیران پروژه‌ها، ساختار حاکمیت شرکتی و شورای راهبری مهندسی شرکت بین‌المللی توسعه ساختمان.',
      cta: { label: 'مشاهده چارت سازمانی و مدیران', href: '/about/org-chart' },
    },
    {
      kind: 'projects',
      id: 'featured-projects',
      navLabel: 'پروژه‌های شاخص ثاخت',
      eyebrow: 'پورتفوی اجرایی هلدینگ',
      heading: 'پروژه‌های شاخص نماد تعهد مهندسی ثاخت',
      allLabel: 'مشاهده همه پروژه‌ها',
      allHref: '/projects',
      items: featuredProjects,
    },
    {
      kind: 'pillars',
      id: 'governance',
      navLabel: 'حاکمیت شرکتی و ESG',
      eyebrow: 'انضباط و مسئولیت‌پذیری اجتماعی',
      heading: 'حاکمیت شرکتی، شفافیت کدال و استانداردهای پایداری',
      description: 'هلدینگ بین‌المللی توسعه ساختمان به عنوان یکی از نمادهای پیشرو بازار سرمایه، انطباق کامل با دستورالعمل‌های حاکمیت شرکتی بورس اوراق بهادار را سرلوحه تمام پروژه‌های عمرانی خود قرار داده است.',
      items: [
        { icon: 'eco', title: 'گزارش پایداری و ESG', text: 'ردیابی ردپای کربن در چرخه بتن‌ریزی، کاهش پسماند ساختمانی به زیر ۵٪ و مدیریت منابع آب خاک در کلیه گودبرداری‌های فعال هلدینگ.', linkLabel: 'مسئولیت اجتماعی و گزارش ESG', href: '/about/csr' },
        { icon: 'gavel', title: 'منشور اخلاق حرفه‌ای و ضدفساد', text: 'سامانه گزارشگری تخلفات درون‌سازمانی (Whistleblowing)، ارزیابی صلاحیت مناقصات شفاف و تعهد به رفتار منصفانه با پیمانکاران جزء.', linkLabel: 'مطالعه سند منشور حاکمیت', href: '/ir/governance' },
        { icon: 'shield', title: 'ایمنی کارگاهی و گواهی HSE', text: 'ثبت رکورد بیش از ۱۰ میلیون نفر-ساعت کار بدون حادثه شدید و پایبندی سخت‌گیرانه به الزامات ISO 45001 در همه سایت‌ها.', linkLabel: 'مشاهده افتخارات و گواهینامه‌ها', href: '/about/honors' },
      ],
    },
    {
      kind: 'news',
      id: 'news',
      heading: 'رویدادها و اخبار دیده‌بان ثاخت',
      allLabel: 'مشاهده آرشیو رسانه',
      allHref: '/media',
      items: relatedNews,
    },
  ],
}

export const csrPage: EditorialPageViewModel = {
  eyebrow: 'مسئولیت اجتماعی و پایداری',
  title: 'مسئولیت اجتماعی و پایداری (ESG)',
  intro: 'هلدینگ ثاخت گزارش‌گری پایداری خود را بر مبنای استانداردهای زیست‌محیطی، اجتماعی و حاکمیت شرکتی (ESG) تنظیم می‌کند.',
  breadcrumbParent: { label: 'درباره ثاخت', href: '/about' },
  hero: {
    image: HERO('icd-csr-hero'),
    alt: 'فضای سبز و نمای پایدار یکی از مجتمع‌های هلدینگ ثاخت',
    liveBadge: 'گزارش پایداری سال ۱۴۰۳ منتشر شد',
    codeBadge: 'چارچوب گزارش‌گری GRI و ESG',
    heading: 'ساختن برای نسل‌های آینده؛ تعهد ثاخت به محیط زیست، جامعه و شفافیت',
    subheading: 'کاهش ردپای کربن، توانمندسازی جوامع محلی و حاکمیت شرکتی پاسخ‌گو در تمامی کارگاه‌های فعال هلدینگ',
  },
  lead: {
    heading: 'پایداری، بخشی جدانشدنی از مهندسی ثاخت از سال',
    highlight: '۱۳۶۴',
    badge: 'منطبق با دستورالعمل حاکمیت شرکتی سازمان بورس',
    paragraphs: [
      'هلدینگ ثاخت گزارش‌گری پایداری خود را بر مبنای استانداردهای زیست‌محیطی، اجتماعی و حاکمیت شرکتی (ESG) تنظیم می‌کند و شاخص‌های کلیدی آن را هم‌زمان با گزارش تفسیری مدیریت در سامانه کدال منتشر می‌نماید.',
      'از انتخاب مصالح کم‌کربن و بازچرخانی آب کارگاهی تا اشتغال‌زایی محلی و آموزش ایمنی پیمانکاران، هر پروژه با برنامه پایداری اختصاصی آغاز و در پایان با ممیزی مستقل بسته می‌شود.',
    ],
  },
  blocks: [
    {
      kind: 'pillars',
      id: 'pillars',
      navLabel: 'سه محور ESG',
      eyebrow: 'چارچوب پایداری هلدینگ',
      heading: 'محیط زیست، جامعه و حاکمیت',
      description: 'سه محور اصلی برنامه پایداری ثاخت که اهداف کمّی آن هر سال به تصویب هیات‌مدیره می‌رسد و پیشرفتش در گزارش سالانه افشا می‌شود.',
      items: [
        { icon: 'eco', title: 'محیط زیست', text: 'کاهش مصرف انرژی و فولاد در پروژه‌های تجاری و اقامتی از طریق مدل‌سازی عددی پیشرفته و استانداردهای ساختمان سبز؛ هدف کاهش ۳۰٪ ردپای کربن تا ۱۴۰۵.', linkLabel: 'تعهدات زیست‌محیطی', href: '#commitments' },
        { icon: 'people', title: 'جامعه', text: 'مشارکت در طرح‌های عمرانی و اشتغال‌زایی محلی در مناطق فعالیت پروژه‌ها، بورسیه دانشجویان مهندسی و بازسازی مدارس در مناطق کم‌برخوردار.', linkLabel: 'برنامه‌های اجتماعی', href: '#social' },
        { icon: 'gavel', title: 'حاکمیت', text: 'گزارش‌گری ادواری در چارچوب سامانه کدال، استقلال کمیته حسابرسی و رویه‌های کنترل داخلی مصوب هیات‌مدیره.', linkLabel: 'حاکمیت شرکتی', href: '/ir/governance' },
      ],
    },
    {
      kind: 'list',
      id: 'commitments',
      navLabel: 'تعهدات پایداری',
      eyebrow: 'اهداف کمّی ۱۴۰۳ تا ۱۴۰۵',
      heading: 'تعهدات عملیاتی پایداری در کارگاه‌ها',
      description: 'هر تعهد با شاخص قابل اندازه‌گیری و مسئول مشخص در ساختار سازمانی هلدینگ پیگیری می‌شود',
      pageSize: 10,
      items: [
        { title: 'جایگزینی ۲۰٪ سیمان با مواد پوزولانی', en: 'Low-Carbon Concrete' },
        { title: 'بازچرخانی آب کارگاهی و زهکشی', en: 'Site Water Recycling' },
        { title: 'کاهش پسماند ساختمانی به زیر ۵٪', en: 'Construction Waste < 5%' },
        { title: 'نصب پنل‌های خورشیدی در پروژه‌های جدید', en: 'On-site Solar PV' },
        { title: 'ممیزی انرژی سالانه ساختمان‌های بهره‌برداری', en: 'Annual Energy Audit' },
        { title: 'آموزش ایمنی پیمانکاران جزء', en: 'Contractor HSE Training' },
        { title: 'سهم ۴۰٪ نیروی کار محلی در هر پروژه', en: 'Local Hiring Target' },
        { title: 'حفظ درختان و فضای سبز موجود ساختگاه', en: 'Tree Preservation' },
        { title: 'خرید مصالح از تامین‌کنندگان دارای گواهی', en: 'Certified Supply Chain' },
        { title: 'گزارش‌گری مستقل و ممیزی شخص ثالث', en: 'Third-party Assurance' },
        { title: 'دسترس‌پذیری کامل برای افراد دارای معلولیت', en: 'Universal Accessibility' },
        { title: 'کاهش آلودگی صوتی کارگاه در ساعات شب', en: 'Night Noise Control' },
      ],
    },
    {
      kind: 'prose',
      id: 'social',
      navLabel: 'جامعه و اشتغال',
      eyebrow: 'مسئولیت اجتماعی',
      heading: 'مشارکت با جوامع محلی',
      bodyHtml: '<p>هلدینگ ثاخت در هر شهر که پروژه‌ای آغاز می‌کند، یک برنامه مسئولیت اجتماعی موازی نیز تعریف می‌کند: از بازسازی مدارس و مراکز درمانی مجاور تا دوره‌های آموزش فنی‌وحرفه‌ای برای جوانان همان محله.</p><ul><li>بازسازی ۱۲ مدرسه در استان‌های خوزستان، فارس و سیستان‌وبلوچستان</li><li>اعطای ۴۵ بورسیه تحصیلی به دانشجویان رشته‌های مهندسی عمران و معماری</li><li>ایجاد بیش از ۶,۰۰۰ فرصت شغلی مستقیم و غیرمستقیم در سال ۱۴۰۲</li></ul>',
    },
    {
      kind: 'callout',
      id: 'report',
      heading: 'گزارش سالانه پایداری و ESG هلدینگ ثاخت',
      description: 'شاخص‌های کربن، مصرف آب، ایمنی کارگاهی و برنامه‌های اجتماعی سال مالی گذشته، ممیزی‌شده توسط نهاد مستقل.',
      cta: { label: 'مشاهده اسناد حاکمیت شرکتی', href: '/ir/governance' },
    },
    {
      kind: 'projects',
      id: 'green-projects',
      navLabel: 'پروژه‌های سبز',
      eyebrow: 'پروژه‌های منتخب پایداری',
      heading: 'پروژه‌هایی که استانداردهای ساختمان سبز را پیاده کرده‌اند',
      allLabel: 'مشاهده همه پروژه‌ها',
      allHref: '/projects',
      items: [3, 0, 4, 1, 5].map(i => featuredProjects[i]!),
    },
    {
      kind: 'news',
      id: 'news',
      heading: 'اخبار و گزارش‌های پایداری',
      allLabel: 'مشاهده آرشیو رسانه',
      allHref: '/media',
      items: relatedNews,
    },
  ],
}

export const legalTermsPage: EditorialPageViewModel = {
  eyebrow: 'اسناد حقوقی',
  title: 'قوانین و شرایط استفاده',
  intro: 'استفاده از وب‌سایت هلدینگ ساختمانی ثاخت به منزله پذیرش شرایط زیر است.',
  breadcrumbParent: { label: 'اسناد حقوقی' },
  hero: {
    image: HERO('icd-terms-hero'),
    alt: 'نمای اداری دفتر مرکزی هلدینگ ثاخت',
    codeBadge: 'آخرین بازنگری: ۱۴۰۳/۰۴/۰۱',
    heading: 'قوانین و شرایط استفاده از وب‌سایت و خدمات برخط ثاخت',
    subheading: 'شرایط حاکم بر استفاده از محتوا، پرتال سهامداران، فرم‌های پیش‌ثبت‌نام و سامانه‌های فروش هلدینگ',
    compact: true,
  },
  lead: {
    heading: 'شفافیت در روابط با کاربران، خریداران و سهامداران',
    badge: 'نسخه ۲.۱ — لازم‌الاجرا از ۱۴۰۳/۰۴/۰۱',
    paragraphs: [
      'استفاده از وب‌سایت هلدینگ ساختمانی ثاخت، پرتال سهامداران و فرم‌های مشاوره فروش به منزله پذیرش شرایط زیر است. لطفاً پیش از ثبت هرگونه درخواست، این متن را به‌طور کامل مطالعه کنید.',
      'این شرایط ممکن است به‌روزرسانی شود؛ تاریخ آخرین بازنگری همواره در بالای همین صفحه درج می‌گردد و تغییرات اساسی از طریق اطلاعیه در صفحه اصلی سایت اعلام خواهد شد.',
    ],
  },
  blocks: [
    { kind: 'prose', id: 'usage', navLabel: 'شرایط استفاده', number: '۱', heading: 'شرایط عمومی استفاده', bodyHtml: '<p>محتوای این وب‌سایت صرفاً جهت اطلاع‌رسانی عمومی ارائه شده و جایگزین مشاوره حقوقی، مالی یا سرمایه‌گذاری رسمی نیست. قیمت‌ها، متراژها و زمان‌بندی‌های اعلام‌شده برای واحدهای پیش‌فروش تا زمان امضای قرارداد رسمی جنبه اطلاع‌رسانی دارند.</p><ul><li>کاربر متعهد است اطلاعات صحیح و به‌روز در فرم‌ها وارد کند.</li><li>هرگونه تلاش برای دسترسی غیرمجاز به سامانه‌ها پیگرد قانونی دارد.</li><li>استفاده تجاری از داده‌های سایت بدون مجوز کتبی ممنوع است.</li></ul>' },
    { kind: 'prose', id: 'sales', navLabel: 'پیش‌ثبت‌نام و فروش', number: '۲', heading: 'پیش‌ثبت‌نام، رزرو و فروش واحدها', bodyHtml: '<p>ثبت فرم ابراز تمایل یا رزرو نوبت بازدید، تعهدی برای طرفین ایجاد نمی‌کند. رابطه قراردادی تنها پس از امضای پیش‌قرارداد و واریز مبلغ اولیه طبق قانون پیش‌فروش ساختمان برقرار می‌شود.</p><p>تصاویر، پلان‌ها و مدل‌های سه‌بعدی نمایشی هستند و ممکن است در مرحله اجرا با رعایت ضوابط فنی تغییر کنند؛ مشخصات فنی نهایی در پیوست قرارداد درج می‌شود.</p>' },
    { kind: 'prose', id: 'ir', navLabel: 'اطلاعات سهامداری', number: '۳', heading: 'اطلاعات بازار سرمایه و سهامداری', bodyHtml: '<p>مرجع رسمی افشای اطلاعات بااهمیت نماد ثاخت، سامانه جامع اطلاع‌رسانی ناشران (کدال) است. در صورت مغایرت میان محتوای این سایت و اطلاعیه‌های کدال، متن منتشرشده در کدال ملاک عمل خواهد بود.</p>' },
    { kind: 'prose', id: 'ip', navLabel: 'مالکیت معنوی', number: '۴', heading: 'مالکیت معنوی', bodyHtml: '<p>تمامی حقوق مادی و معنوی محتوای این وب‌سایت، شامل متون، تصاویر، نقشه‌ها، مدل‌های سه‌بعدی و نشان‌های تجاری، متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) است. نقل مطالب با ذکر منبع و بدون تغییر در محتوا مجاز است.</p>' },
    { kind: 'prose', id: 'liability', navLabel: 'حدود مسئولیت', number: '۵', heading: 'حدود مسئولیت و حل اختلاف', bodyHtml: '<p>هلدینگ ثاخت در قبال خسارات ناشی از قطع موقت سرویس، خطاهای ارتباطی یا استفاده نادرست از اطلاعات سایت مسئولیتی نمی‌پذیرد. اختلافات احتمالی ابتدا از طریق واحد امور مشتریان و در صورت عدم حصول نتیجه، مطابق قوانین جمهوری اسلامی ایران و در مراجع صالح شهر تهران رسیدگی می‌شود.</p>' },
    {
      kind: 'pillars',
      id: 'related-docs',
      navLabel: 'اسناد مرتبط',
      eyebrow: 'اسناد مکمل',
      heading: 'سایر اسناد حقوقی و راهنماها',
      description: 'اسناد زیر مکمل شرایط استفاده هستند و در صورت استفاده از خدمات مربوطه، بخشی از توافق شما با هلدینگ محسوب می‌شوند.',
      items: [
        { icon: 'lock', title: 'سیاست حریم خصوصی', text: 'نحوه جمع‌آوری، نگهداری و حفاظت از اطلاعات شخصی کاربران، خریداران و سهامداران.', linkLabel: 'مطالعه سیاست حریم خصوصی', href: '/legal/privacy' },
        { icon: 'doc', title: 'راهنمای خرید و قرارداد', text: 'مراحل پیش‌خرید، تضامین اجرایی، شرایط پرداخت و تحویل واحدهای در حال ساخت.', linkLabel: 'مشاهده راهنمای خرید', href: '/sales/guide' },
        { icon: 'scale', title: 'ثبت شکایات و پیشنهادها', text: 'فرآیند رسمی رسیدگی به شکایات مشتریان و پیمانکاران با کد رهگیری و زمان پاسخ مشخص.', linkLabel: 'ورود به سامانه شکایات', href: '/complaints' },
      ],
    },
    {
      kind: 'callout',
      id: 'contact',
      heading: 'پرسشی درباره این شرایط دارید؟',
      description: 'واحد حقوقی و امور مشتریان هلدینگ ثاخت آماده پاسخ‌گویی به پرسش‌های شما درباره شرایط استفاده و قراردادهاست.',
      cta: { label: 'تماس با امور مشتریان', href: '/contact' },
    },
  ],
}

export const legalPrivacyPage: EditorialPageViewModel = {
  eyebrow: 'اسناد حقوقی',
  title: 'حریم خصوصی',
  intro: 'هلدینگ ثاخت به حریم خصوصی کاربران و سهامداران خود متعهد است.',
  breadcrumbParent: { label: 'اسناد حقوقی' },
  hero: {
    image: HERO('icd-privacy-hero'),
    alt: 'مرکز داده و زیرساخت فناوری اطلاعات هلدینگ ثاخت',
    codeBadge: 'آخرین بازنگری: ۱۴۰۳/۰۴/۰۱',
    heading: 'سیاست حریم خصوصی و حفاظت از داده‌های شخصی',
    subheading: 'چه اطلاعاتی جمع‌آوری می‌کنیم، چرا، تا چه زمانی نگه می‌داریم و شما چه حقوقی دارید',
    compact: true,
  },
  lead: {
    heading: 'اعتماد شما، سرمایه اصلی ثاخت است',
    badge: 'منطبق با قانون تجارت الکترونیکی و الزامات سازمان بورس',
    paragraphs: [
      'هلدینگ ثاخت به حریم خصوصی کاربران، خریداران و سهامداران خود متعهد است. این سند توضیح می‌دهد که اطلاعات ارسالی شما از طریق فرم‌های تماس، مشاوره، پیش‌ثبت‌نام و شکایات چگونه پردازش می‌شود.',
      'ما تنها حداقل اطلاعات لازم برای پاسخ‌گویی به درخواست شما را جمع‌آوری می‌کنیم و هیچ‌گاه اطلاعات شخصی را به اشخاص ثالث برای مقاصد تبلیغاتی نمی‌فروشیم.',
    ],
  },
  blocks: [
    { kind: 'prose', id: 'collection', navLabel: 'جمع‌آوری اطلاعات', number: '۱', heading: 'چه اطلاعاتی جمع‌آوری می‌کنیم', bodyHtml: '<p>اطلاعات ارسالی از طریق فرم‌های تماس، مشاوره و شکایات صرفاً برای پاسخ‌گویی به همان درخواست استفاده می‌شود. این اطلاعات ممکن است شامل موارد زیر باشد:</p><ul><li>نام، شماره تماس و نشانی ایمیل</li><li>پروژه یا واحد مورد علاقه و بودجه تقریبی (در فرم‌های فروش)</li><li>کد سجام یا کد بورسی (فقط در پرتال سهامداران)</li><li>داده‌های فنی بازدید مانند نوع مرورگر، برای بهبود عملکرد سایت</li></ul>' },
    { kind: 'prose', id: 'usage', navLabel: 'نحوه استفاده', number: '۲', heading: 'نحوه استفاده از اطلاعات', bodyHtml: '<p>اطلاعات شما برای هماهنگی بازدید، ارسال پیش‌نویس قرارداد، اطلاع‌رسانی درباره مجامع عمومی و پاسخ به تیکت‌ها استفاده می‌شود. ارسال خبرنامه و پیشنهادهای فروش تنها با رضایت صریح شما انجام می‌گیرد و در هر زمان قابل لغو است.</p>' },
    { kind: 'prose', id: 'protection', navLabel: 'حفاظت از داده‌ها', number: '۳', heading: 'حفاظت و نگهداری داده‌ها', bodyHtml: '<p>دسترسی به اطلاعات شخصی محدود به کارکنان مسئول رسیدگی به همان درخواست است و با اشخاص ثالث به اشتراک گذاشته نمی‌شود، مگر به حکم مراجع قضایی. داده‌ها روی زیرساخت داخلی هلدینگ با رمزنگاری در حال انتقال و ذخیره نگهداری و حداکثر تا پنج سال پس از آخرین تعامل حفظ می‌شوند.</p>' },
    { kind: 'prose', id: 'cookies', navLabel: 'کوکی‌ها', number: '۴', heading: 'کوکی‌ها و ابزارهای تحلیلی', bodyHtml: '<p>این وب‌سایت از کوکی‌های ضروری برای حفظ نشست کاربری و از ابزار تحلیلی داخلی (بدون ارسال داده به سرویس‌های خارجی) برای سنجش بازدید صفحات استفاده می‌کند. با غیرفعال کردن کوکی‌ها در مرورگر، ممکن است برخی بخش‌های پرتال سهامداران در دسترس نباشد.</p>' },
    {
      kind: 'pillars',
      id: 'rights',
      navLabel: 'حقوق شما',
      eyebrow: 'اختیارات کاربر',
      heading: 'حقوق شما درباره اطلاعات شخصی',
      description: 'شما می‌توانید در هر زمان با ارسال درخواست مکتوب از طریق فرم تماس، هر یک از حقوق زیر را اعمال کنید. پاسخ حداکثر ظرف ۱۰ روز کاری ارسال می‌شود.',
      items: [
        { icon: 'eye', title: 'حق دسترسی', text: 'دریافت نسخه‌ای از اطلاعات شخصی که از شما نزد هلدینگ ثاخت نگهداری می‌شود.', linkLabel: 'درخواست نسخه اطلاعات', href: '/contact' },
        { icon: 'edit', title: 'حق اصلاح', text: 'اصلاح اطلاعات نادرست یا ناقص مانند شماره تماس، نشانی یا اطلاعات حساب بانکی سهامداری.', linkLabel: 'درخواست اصلاح اطلاعات', href: '/contact' },
        { icon: 'trash', title: 'حق حذف', text: 'حذف اطلاعات شخصی پس از پایان رابطه قراردادی، مگر در مواردی که نگهداری آن الزام قانونی باشد.', linkLabel: 'درخواست حذف اطلاعات', href: '/contact' },
      ],
    },
    {
      kind: 'callout',
      id: 'contact',
      heading: 'مسئول حفاظت از داده‌های هلدینگ',
      description: 'برای طرح پرسش یا شکایت درباره نحوه پردازش اطلاعات شخصی، با واحد حفاظت از داده‌ها از طریق فرم تماس یا نشانی privacy@icd-holding.ir در ارتباط باشید.',
      cta: { label: 'ارسال درخواست حریم خصوصی', href: '/contact' },
    },
  ],
}
