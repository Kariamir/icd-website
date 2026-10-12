/**
 * The site's single content catalog: companies, projects and sale units
 * (ADR-015).
 *
 * Until WordPress is connected (ADR-002) every listing and every detail page
 * reads from here, so a card and the page it opens can never disagree. When
 * the WPNuxt queries land, these arrays become the shape the queries map to.
 *
 * Sources
 *  - The eight projects marked `origin: 'site'` are the real names recovered
 *    from the previous implementation (sitemap §5.2).
 *  - Entries marked `origin: 'design'` come from the approved Stitch designs.
 *    They are sample records that keep every designed page populated; replace
 *    or delete them when the content team supplies the real portfolio.
 *  - The eight companies are the subsidiaries as drawn in the approved design.
 *    Sorting the real group into companies and projects is still sitemap
 *    §13 question 1.
 *
 * Relationships (ADR-011): every project names exactly one owner company, and
 * every company page lists that company's projects. Every unit names its
 * project.
 */
import { ph, type PhKind } from '~/utils/media'

// ─────────────────────────────────────────────────────────────── companies

export interface Company {
  slug: string
  name: string
  /** Large monogram on the tile. */
  mark: string
  /** Small Latin line under the monogram. */
  markSub: string
  /** Short tag on the tile corner — a market symbol or a specialism. */
  tag: string
  isListed?: boolean
  specialty: string
  founded: number
  /** Holding's share of the company, percent. */
  holdingShare: number
  ceo: string
  employees: number
  city: string
  summary: string
  about: string[]
  image: string
}

export const companies: Company[] = [
  {
    slug: 'asp', name: 'شرکت ساختمانی آ.اس.پ', mark: 'A.S.P', markSub: 'EST. 1970', tag: 'نماد: آسپ', isListed: true,
    specialty: 'پیمانکاری عمومی و بلندمرتبه‌سازی', founded: 1349, holdingShare: 51, ceo: 'مهندس سعید کاظمی', employees: 640, city: 'تهران',
    summary: 'پیمانکار اصلی پروژه‌های بلندمرتبه و مجتمع‌های تجاری گروه.',
    about: [
      'آ.اس.پ قدیمی‌ترین بازوی اجرایی هلدینگ است و اجرای برج‌ها و مجتمع‌های تجاری-اداری گروه را بر عهده دارد.',
      'تمرکز شرکت بر سازه‌های بلندمرتبه، مدیریت پیمان و تحویل به‌موقع است.',
    ],
    image: ph('tower', 1),
  },
  {
    slug: 'medc', name: 'توسعه ساختمان خاورمیانه', mark: 'MEDC', markSub: 'MIDDLE EAST', tag: 'توسعه املاک',
    specialty: 'سرمایه‌گذاری و ساخت مجتمع‌های فاخر', founded: 1372, holdingShare: 64, ceo: 'دکتر نادر فرهمند', employees: 210, city: 'تهران',
    summary: 'توسعه‌دهنده مجتمع‌های تجاری و چندمنظوره در کلان‌شهرها.',
    about: [
      'توسعه ساختمان خاورمیانه پروژه‌های تجاری و چندمنظوره گروه را از مرحله امکان‌سنجی تا بهره‌برداری هدایت می‌کند.',
      'مدیریت دارایی و بهره‌برداری از مراکز تجاری تکمیل‌شده نیز با این شرکت است.',
    ],
    image: ph('commercial', 1),
  },
  {
    slug: 'baghmisheh', name: 'شرکت شهرسازی و خانه‌سازی باغمیشه', mark: 'باغمیشه', markSub: 'BAGHMISHEH', tag: 'نماد: ثباغ', isListed: true,
    specialty: 'شهرسازی و انبوه‌سازی مسکونی', founded: 1353, holdingShare: 58, ceo: 'مهندس رضا تبریزی', employees: 380, city: 'تبریز',
    summary: 'انبوه‌ساز مجموعه‌های مسکونی و شهرک‌های جدید.',
    about: [
      'باغمیشه از نخستین شرکت‌های شهرسازی کشور است و مجموعه‌های مسکونی بزرگ‌مقیاس گروه را می‌سازد.',
      'شرکت در بورس تهران با نماد ثباغ پذیرفته شده است.',
    ],
    image: ph('residential', 1),
  },
  {
    slug: 'pars-sazeh', name: 'شرکت پارس سازه', mark: 'پارس', markSub: 'PARS SAZEH', tag: 'سازه‌های نوین',
    specialty: 'پارس‌سازان مهندسی و ابنیه سنگین', founded: 1330, holdingShare: 100, ceo: 'مهندس امیر رحیمی', employees: 290, city: 'اصفهان',
    summary: 'هسته تاریخی گروه از ۱۳۳۰؛ اجرای ابنیه سنگین و سازه‌های خاص.',
    about: [
      'پارس سازه در ۱۳۳۰ تاسیس شد و ریشه تاریخی هلدینگ ثاخت است.',
      'امروز اجرای سازه‌های خاص، هتل‌ها و ابنیه سنگین گروه با این شرکت است.',
    ],
    image: ph('hotel', 1),
  },
  {
    slug: 'rahshahr', name: 'مهندسان مشاور رهشهر', mark: 'رهشهر', markSub: 'RAHSHAHR', tag: 'مطالعات و طراحی',
    specialty: 'طراحی جامع معماری و ژئوتکنیک', founded: 1368, holdingShare: 70, ceo: 'دکتر لیلا صدری', employees: 150, city: 'تهران',
    summary: 'مشاور طراحی معماری، سازه و ژئوتکنیک پروژه‌های گروه.',
    about: [
      'رهشهر طراحی مفهومی تا تفصیلی پروژه‌های گروه را انجام می‌دهد.',
      'مطالعات ژئوتکنیک و طراحی پایدار از تخصص‌های اصلی این شرکت است.',
    ],
    image: ph('blueprint', 1),
  },
  {
    slug: 'omid', name: 'توسعه و عمران امید', mark: 'امید', markSub: 'OMID DEV', tag: 'توسعه منطقه‌ای',
    specialty: 'توسعه بافت‌های شهری و چندمنظوره', founded: 1381, holdingShare: 55, ceo: 'مهندس حسین مقدم', employees: 230, city: 'شیراز',
    summary: 'توسعه‌دهنده پروژه‌های منطقه‌ای در جنوب و شمال کشور.',
    about: [
      'امید پروژه‌های چندمنظوره گروه در شیراز، شمال کشور و مناطق آزاد را توسعه می‌دهد.',
      'بازآفرینی بافت‌های شهری و مجتمع‌های ساحلی از محورهای فعالیت شرکت است.',
    ],
    image: ph('coastal', 1),
  },
  {
    slug: 'iec', name: 'شرکت خدمات مهندسی ایران', mark: 'IEC', markSub: 'IRAN ENG', tag: 'نظارت و ژئومکانیک',
    specialty: 'خدمات آزمایشگاهی و پایش کنترل کیفیت', founded: 1376, holdingShare: 80, ceo: 'مهندس مریم اسدی', employees: 120, city: 'کرج',
    summary: 'نظارت کارگاهی، آزمایشگاه مصالح و پایش کیفیت.',
    about: [
      'خدمات مهندسی ایران نظارت عالیه و کارگاهی پروژه‌های گروه را بر عهده دارد.',
      'آزمایشگاه مصالح و پایش سلامت سازه از خدمات این شرکت است.',
    ],
    image: ph('campus', 1),
  },
  {
    slug: 'choob-felez', name: 'شرکت صنایع چوب و فلز ثاخت', mark: 'چوب و فلز', markSub: 'WOOD & METAL', tag: 'صنایع تکمیلی',
    specialty: 'تجهیز و ساخت نما و دکوراسیون داخلی صنعتی', founded: 1385, holdingShare: 90, ceo: 'مهندس پیمان نوری', employees: 180, city: 'یزد',
    summary: 'تولید نما، درب و پنجره و تجهیزات داخلی پروژه‌ها.',
    about: [
      'صنایع چوب و فلز تجهیزات نما و فضاهای داخلی پروژه‌های گروه را تولید می‌کند.',
      'کارخانه شرکت در یزد مستقر است.',
    ],
    image: ph('industrial', 1),
  },
]

export function getCompany(slug: string) {
  return companies.find(c => c.slug === slug)
}

// ──────────────────────────────────────────────────────────────── projects

export type ProjectStatusKey = 'upcoming' | 'under-construction' | 'operating' | 'completed'

export const projectStatus: Record<ProjectStatusKey, { label: string, href: string, short: string }> = {
  'upcoming': { label: 'پروژه‌های آتی', short: 'آتی', href: '/projects/upcoming' },
  'under-construction': { label: 'پروژه‌های در حال ساخت', short: 'در حال ساخت', href: '/projects/under-construction' },
  'operating': { label: 'پروژه‌های در حال بهره‌برداری', short: 'در حال بهره‌برداری', href: '/projects/operating' },
  'completed': { label: 'پروژه‌های تکمیل‌شده', short: 'تکمیل‌شده', href: '/projects/completed' },
}

export interface Project {
  slug: string
  name: string
  status: ProjectStatusKey
  company: string
  city: string
  district: string
  usage: string
  areaSqm: number
  floors: number
  /** Number of residential/commercial units, when the project sells units. */
  units?: number
  /** Solar-hijri year: start for upcoming/under-construction, delivery otherwise. */
  year: number
  progress?: number
  excerpt: string
  image: string
  /** Position on the stylised national map, percent of width/height. */
  map: { x: number, y: number }
  featured?: boolean
  origin: 'site' | 'design'
}

const P = (p: Omit<Project, 'image'> & { kind: PhKind, v?: number }): Project => {
  const { kind, v, ...rest } = p
  return { ...rest, image: ph(kind, v ?? 1) }
}

export const projects: Project[] = [
  // ── under construction
  P({ slug: 'tehran-international-tower', name: 'برج بین‌المللی تهران', status: 'under-construction', company: 'asp', city: 'تهران', district: 'منطقه ۱', usage: 'تجاری، اداری و مسکونی', areaSqm: 42000, floors: 56, units: 320, year: 1402, progress: 68, featured: true, origin: 'site', kind: 'tower', v: 2, map: { x: 50, y: 34 },
    excerpt: 'برج چندمنظوره شاخص پایتخت با چشم‌انداز البرز و سامانه مدیریت هوشمند ساختمان.' }),
  P({ slug: 'afafabad-shiraz', name: 'عفاف‌آباد شیراز', status: 'under-construction', company: 'omid', city: 'شیراز', district: 'عفیف‌آباد', usage: 'مسکونی', areaSqm: 26000, floors: 9, units: 140, year: 1401, progress: 45, origin: 'site', kind: 'residential', v: 1, map: { x: 46, y: 70 },
    excerpt: 'معماری شیرازی با پوسته دولایه، تهویه طبیعی و مصرف انرژی بهینه.' }),
  P({ slug: 'narenjestan-izadshahr', name: 'نارنجستان ایزدشهر', status: 'under-construction', company: 'omid', city: 'ایزدشهر', district: 'نوار ساحلی', usage: 'مسکونی و تجاری', areaSqm: 31000, floors: 8, units: 210, year: 1402, progress: 30, origin: 'site', kind: 'coastal', v: 1, map: { x: 56, y: 22 },
    excerpt: 'شهرک ساحلی خزر با دسترسی مستقیم به دریا و فضای سبز پیوسته.' }),
  P({ slug: 'elahiyeh-residence', name: 'مجموعه مسکونی الهیه', status: 'under-construction', company: 'baghmisheh', city: 'تهران', district: 'الهیه', usage: 'مسکونی لوکس', areaSqm: 18500, floors: 14, units: 64, year: 1402, progress: 52, origin: 'design', kind: 'residential', v: 2, map: { x: 51, y: 32 },
    excerpt: 'برج مسکونی کم‌تراکم با تراس‌های باغ و لابی دوطبقه.' }),
  P({ slug: 'firouzeh-tower', name: 'برج تجاری و اداری فیروزه', status: 'under-construction', company: 'medc', city: 'تهران', district: 'جردن', usage: 'تجاری و اداری', areaSqm: 36000, floors: 28, units: 180, year: 1401, progress: 74, origin: 'design', kind: 'tower', v: 1, map: { x: 49, y: 35 },
    excerpt: 'برج اداری با پوسته شیشه‌ای دوجداره و طبقات تجاری در تراز خیابان.' }),
  P({ slug: 'alborz-campus', name: 'پردیس دانش و فناوری البرز', status: 'under-construction', company: 'rahshahr', city: 'کرج', district: 'محمدشهر', usage: 'آموزشی و فناوری', areaSqm: 48000, floors: 5, year: 1403, progress: 18, origin: 'design', kind: 'campus', map: { x: 41, y: 31 },
    excerpt: 'پردیس فناوری با ساختمان‌های کم‌ارتفاع و محوطه سبز پیوسته.' }),

  // ── upcoming
  P({ slug: 'royaye-kish', name: 'رویای کیش', status: 'upcoming', company: 'omid', city: 'کیش', district: 'نوار ساحلی مرجان', usage: 'مسکونی و گردشگری', areaSqm: 18500, floors: 12, units: 96, year: 1404, origin: 'site', kind: 'coastal', v: 2, map: { x: 58, y: 88 },
    excerpt: 'واحدهای هوشمند با تراس رو به خلیج فارس و کلوپ دریایی اختصاصی.' }),
  P({ slug: 'persian-gulf-office', name: 'پروژه تجاری اداری خلیج فارس', status: 'upcoming', company: 'medc', city: 'بندرعباس', district: 'بلوار ساحلی', usage: 'تجاری و اداری', areaSqm: 27000, floors: 18, year: 1404, origin: 'design', kind: 'commercial', v: 2, map: { x: 66, y: 84 },
    excerpt: 'مرکز اداری-تجاری بندری با دسترسی مستقیم به بلوار ساحلی.' }),
  P({ slug: 'alborz-innovation-tower', name: 'برج تجارت و نوآوری البرز', status: 'upcoming', company: 'rahshahr', city: 'کرج', district: 'گوهردشت', usage: 'اداری و نوآوری', areaSqm: 33000, floors: 32, year: 1405, origin: 'design', kind: 'tower', v: 1, map: { x: 42, y: 30 },
    excerpt: 'برج اداری نسل جدید برای شرکت‌های فناور و دفاتر منطقه‌ای.' }),
  P({ slug: 'niloufar-garden-city', name: 'مجموعه مسکونی باغ‌شهر نیلوفر', status: 'upcoming', company: 'baghmisheh', city: 'اصفهان', district: 'شمال‌غرب', usage: 'مسکونی', areaSqm: 54000, floors: 10, units: 420, year: 1404, origin: 'design', kind: 'residential', v: 1, map: { x: 52, y: 52 },
    excerpt: 'شهرک مسکونی با بلوک‌های میان‌مرتبه و پارک مرکزی.' }),
  P({ slug: 'arvand-coastal', name: 'مجتمع چندمنظوره ساحلی اروند', status: 'upcoming', company: 'omid', city: 'خرمشهر', district: 'منطقه آزاد اروند', usage: 'چندمنظوره', areaSqm: 29000, floors: 9, year: 1405, origin: 'design', kind: 'coastal', v: 1, map: { x: 30, y: 66 },
    excerpt: 'مجتمع تجاری-اقامتی در کرانه اروند با اسکله گردشگری.' }),
  P({ slug: 'arg-kavir-hotel', name: 'هتل و اقامتگاه بین‌المللی ارگ کویر', status: 'upcoming', company: 'choob-felez', city: 'یزد', district: 'بافت تاریخی', usage: 'هتل و اقامتی', areaSqm: 16000, floors: 6, year: 1404, origin: 'design', kind: 'hotel', v: 1, map: { x: 62, y: 58 },
    excerpt: 'هتل پنج‌ستاره با معماری اقلیمی و حیاط‌های مرکزی.' }),

  // ── operating
  P({ slug: 'asp-mashhad', name: 'آ.اس.پ مشهد', status: 'operating', company: 'asp', city: 'مشهد', district: 'بلوار سجاد', usage: 'تجاری و اداری', areaSqm: 22000, floors: 7, year: 1399, origin: 'site', kind: 'commercial', v: 1, map: { x: 82, y: 30 },
    excerpt: 'مجتمع تجاری-اداری در قلب مشهد با پارکینگ طبقاتی.' }),
  P({ slug: 'asp-tehran', name: 'آ.اس.پ تهران', status: 'operating', company: 'asp', city: 'تهران', district: 'شیخ بهایی', usage: 'تجاری و اداری', areaSqm: 29000, floors: 10, year: 1400, origin: 'site', kind: 'tower', v: 1, map: { x: 52, y: 33 },
    excerpt: 'مجتمع اداری-تجاری با لابی‌های مستقل و تاسیسات مرکزی هوشمند.' }),
  P({ slug: 'tabriz-trade-center', name: 'مرکز تجاری اداری بین‌المللی تبریز', status: 'operating', company: 'medc', city: 'تبریز', district: 'ولیعصر', usage: 'تجاری و اداری', areaSqm: 34000, floors: 16, year: 1398, origin: 'design', kind: 'commercial', v: 2, map: { x: 30, y: 16 },
    excerpt: 'مرکز تجاری شمال‌غرب با سالن همایش و دفاتر اداری.' }),
  P({ slug: 'sakht-hq-tower', name: 'برج اداری مرکزی ثاخت', status: 'operating', company: 'asp', city: 'تهران', district: 'خیابان ولیعصر', usage: 'اداری', areaSqm: 21000, floors: 20, year: 1396, origin: 'design', kind: 'tower', v: 2, map: { x: 50, y: 36 },
    excerpt: 'ستاد مرکزی هلدینگ با نمای شیشه‌ای و فولادی.' }),
  P({ slug: 'morvarid-kish', name: 'مجموعه مسکونی مروارید خلیج فارس', status: 'operating', company: 'medc', city: 'کیش', district: 'میرمهنا', usage: 'مسکونی و اقامتی', areaSqm: 19000, floors: 8, units: 120, year: 1397, origin: 'design', kind: 'coastal', v: 1, map: { x: 60, y: 90 },
    excerpt: 'مجموعه ساحلی با واحدهای رو به دریا و خدمات هتلی.' }),
  P({ slug: 'alborz-tech-town', name: 'شهرک اداری و فناوری البرز', status: 'operating', company: 'iec', city: 'کرج', district: 'فردیس', usage: 'اداری و فناوری', areaSqm: 41000, floors: 4, year: 1399, origin: 'design', kind: 'campus', map: { x: 41, y: 33 },
    excerpt: 'شهرک اداری کم‌ارتفاع برای شرکت‌های فنی و آزمایشگاه‌ها.' }),

  // ── completed
  P({ slug: 'megapars-tehran', name: 'مگاپارس تهران', status: 'completed', company: 'medc', city: 'تهران', district: 'منطقه ۶', usage: 'تجاری', areaSqm: 38000, floors: 14, year: 1397, featured: true, origin: 'site', kind: 'commercial', v: 1, map: { x: 51, y: 36 },
    excerpt: 'مرکز تجاری چندمنظوره پایتخت با بام سبز پیوسته.' }),
  P({ slug: 'sahel-noshahr', name: 'مجتمع ساحل نوشهر', status: 'completed', company: 'pars-sazeh', city: 'نوشهر', district: 'نوار ساحلی', usage: 'مسکونی و گردشگری', areaSqm: 15000, floors: 6, units: 72, year: 1395, origin: 'site', kind: 'coastal', v: 2, map: { x: 48, y: 22 },
    excerpt: 'ویلا-آپارتمان‌های متصل به ساحل خزر با طراحی مینیمال.' }),
  P({ slug: 'sepehr-isfahan', name: 'برج تجاری اداری سپهر اصفهان', status: 'completed', company: 'pars-sazeh', city: 'اصفهان', district: 'چهارباغ بالا', usage: 'تجاری و اداری', areaSqm: 24000, floors: 22, year: 1394, origin: 'design', kind: 'tower', v: 1, map: { x: 51, y: 54 },
    excerpt: 'برج اداری با پانل‌های بتنی پیش‌ساخته و مرکز همایش.' }),
  P({ slug: 'negin-darrous', name: 'برج مسکونی نگین دروس', status: 'completed', company: 'asp', city: 'تهران', district: 'دروس', usage: 'مسکونی', areaSqm: 12000, floors: 16, units: 48, year: 1396, origin: 'design', kind: 'residential', v: 2, map: { x: 53, y: 31 },
    excerpt: 'برج مسکونی با پیلسترهای سنگی و پنجره‌های قاب‌برنزی.' }),
  P({ slug: 'kouhsar-mashhad', name: 'مجموعه اقامتی و تفریحی کوهسار', status: 'completed', company: 'pars-sazeh', city: 'مشهد', district: 'کوهسنگی', usage: 'هتل و اقامتی', areaSqm: 28000, floors: 12, year: 1398, origin: 'design', kind: 'hotel', v: 2, map: { x: 80, y: 32 },
    excerpt: 'هتل و مجموعه تفریحی با نمای سنگی و دیوار پرده‌ای.' }),
  P({ slug: 'zagros-tabriz', name: 'مجموعه مسکونی زاگرس', status: 'completed', company: 'baghmisheh', city: 'تبریز', district: 'ائل‌گلی', usage: 'مسکونی', areaSqm: 62000, floors: 9, units: 480, year: 1393, origin: 'design', kind: 'aerial', v: 1, map: { x: 28, y: 18 },
    excerpt: 'شهرک چندبلوکی با معابر پیاده و کریدورهای سبز.' }),
]

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug)
}

export function projectsByStatus(status: ProjectStatusKey) {
  return projects.filter(p => p.status === status)
}

export function projectsByCompany(company: string) {
  return projects.filter(p => p.company === company)
}

export function relatedProjects(slug: string, count = 3) {
  const self = getProject(slug)
  if (!self) return []
  const same = projects.filter(p => p.slug !== slug && p.company === self.company)
  const rest = projects.filter(p => p.slug !== slug && p.company !== self.company && p.status === self.status)
  return [...same, ...rest].slice(0, count)
}

// ─────────────────────────────────────────────────────────────────── units

export type UnitStatus = 'ready' | 'pre-sale' | 'reserved'

export const unitStatus: Record<UnitStatus, string> = {
  'ready': 'آماده تحویل',
  'pre-sale': 'پیش‌فروش',
  'reserved': 'رزروشده',
}

export interface Unit {
  id: string
  ref: string
  title: string
  project: string
  usage: 'مسکونی' | 'اداری' | 'تجاری'
  areaSqm: number
  floor: number
  bedrooms?: number
  facing: string
  /** Total price in rials. */
  price: number
  status: UnitStatus
  image: string
  plan: string
}

const U = (u: Omit<Unit, 'image' | 'plan'> & { kind: PhKind, v?: number }): Unit => {
  const { kind, v, ...rest } = u
  return { ...rest, image: ph(kind, v ?? 1), plan: ph('blueprint', 1) }
}

export const units: Unit[] = [
  U({ id: '1404', ref: 'TIT-1404', title: 'واحد اداری ۱۴۰۴ با دید ۳۶۰ درجه', project: 'tehran-international-tower', usage: 'اداری', areaSqm: 185, floor: 14, facing: 'جنوب و غرب', price: 53_650_000_000, status: 'pre-sale', kind: 'interior', v: 1 }),
  U({ id: '2208', ref: 'TIT-2208', title: 'آپارتمان سه‌خوابه پانوراما', project: 'tehran-international-tower', usage: 'مسکونی', areaSqm: 210, floor: 22, bedrooms: 3, facing: 'شمال (رو به البرز)', price: 71_400_000_000, status: 'pre-sale', kind: 'interior', v: 2 }),
  U({ id: '0819', ref: 'RK-0819', title: 'سوئیت پانوراما با تراس باغ', project: 'royaye-kish', usage: 'مسکونی', areaSqm: 142, floor: 8, bedrooms: 2, facing: 'رو به دریا', price: 41_180_000_000, status: 'pre-sale', kind: 'coastal', v: 1 }),
  U({ id: '0410', ref: 'TTC-0410', title: 'دفتر ستادی و سالن کنفرانس یکپارچه', project: 'tabriz-trade-center', usage: 'اداری', areaSqm: 290, floor: 4, facing: 'شمالی', price: 72_500_000_000, status: 'ready', kind: 'office' }),
  U({ id: '1801', ref: 'EL-1801', title: 'پنت‌هاوس دوبلکس با بام سبز', project: 'elahiyeh-residence', usage: 'مسکونی', areaSqm: 430, floor: 14, bedrooms: 4, facing: '۴ جهت', price: 146_200_000_000, status: 'pre-sale', kind: 'interior', v: 1 }),
  U({ id: '0012', ref: 'MP-0012', title: 'واحد تجاری سرنبش همکف', project: 'megapars-tehran', usage: 'تجاری', areaSqm: 96, floor: 0, facing: 'دو بر خیابان', price: 88_000_000_000, status: 'ready', kind: 'commercial', v: 1 }),
  U({ id: '0605', ref: 'AF-0605', title: 'آپارتمان سه‌خوابه مدرن', project: 'afafabad-shiraz', usage: 'مسکونی', areaSqm: 165, floor: 6, bedrooms: 3, facing: 'جنوبی', price: 32_600_000_000, status: 'pre-sale', kind: 'residential', v: 1 }),
  U({ id: '0302', ref: 'NR-0302', title: 'آپارتمان دوخوابه ساحلی', project: 'narenjestan-izadshahr', usage: 'مسکونی', areaSqm: 118, floor: 3, bedrooms: 2, facing: 'رو به دریا', price: 24_900_000_000, status: 'pre-sale', kind: 'coastal', v: 2 }),
  U({ id: '1207', ref: 'FZ-1207', title: 'دفتر اداری نیم‌طبقه', project: 'firouzeh-tower', usage: 'اداری', areaSqm: 240, floor: 12, facing: 'شرقی', price: 64_800_000_000, status: 'reserved', kind: 'office' }),
  U({ id: '0503', ref: 'MK-0503', title: 'آپارتمان ساحلی با خدمات هتلی', project: 'morvarid-kish', usage: 'مسکونی', areaSqm: 128, floor: 5, bedrooms: 2, facing: 'رو به دریا', price: 38_700_000_000, status: 'ready', kind: 'coastal', v: 1 }),
  U({ id: '0901', ref: 'ND-0901', title: 'آپارتمان چهارخوابه دروس', project: 'negin-darrous', usage: 'مسکونی', areaSqm: 260, floor: 9, bedrooms: 4, facing: 'جنوبی', price: 92_300_000_000, status: 'ready', kind: 'interior', v: 2 }),
  U({ id: '0115', ref: 'AM-0115', title: 'واحد تجاری گالری مرکزی', project: 'asp-mashhad', usage: 'تجاری', areaSqm: 74, floor: 1, facing: 'رو به آتریوم', price: 29_500_000_000, status: 'ready', kind: 'commercial', v: 2 }),
]

export function getUnit(id: string) {
  return units.find(u => u.id === id)
}

export function unitsByProject(project: string) {
  return units.filter(u => u.project === project)
}

/** «۵۳٫۶ میلیارد تومان» from a rial amount. */
export function priceLabel(rials: number): string {
  const toman = rials / 10
  const billions = toman / 1_000_000_000
  const s = billions.toLocaleString('en-US', { maximumFractionDigits: 1 })
  return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!).replace('.', '٫') + ' میلیارد تومان'
}
