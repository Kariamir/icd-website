// Recovered from the pre-migration React app (src/pages/projectsMapData.js +
// projectDetails.js) — this is the project's real content, not placeholder
// copy. Project names + statuses per docs/01-sitemap.md §5.2 (Option A, 8
// project-companies). Pin x/y (%) are placeholder layout coordinates for the
// stylized map panel — replace with real coordinates once the 3D Tehran map
// engine lands (docs/02-build-checklist.md Phase 6/7).

export type ProjectStatusKey = 'upcoming' | 'under-construction' | 'operating' | 'completed'

export const STATUS: Record<ProjectStatusKey, { label: string; index: string }> = {
  'upcoming': { label: 'آتی', index: '/projects/upcoming' },
  'under-construction': { label: 'در حال ساخت', index: '/projects/under-construction' },
  'operating': { label: 'در حال بهره‌برداری', index: '/projects/operating' },
  'completed': { label: 'تکمیل‌شده', index: '/projects/completed' },
}

export interface ProjectSummary {
  slug: string
  name: string
  status: ProjectStatusKey
  featured?: boolean
  /** Short internal reference code shown on map pins/cards (`01b-cluster-hub-visual`). */
  code: string
  x: number
  y: number
}

export const projects: ProjectSummary[] = [
  { slug: 'tehran-international-tower', name: 'برج بین‌المللی تهران', status: 'under-construction', featured: true, code: 'TIT-01', x: 52, y: 38 },
  { slug: 'royaye-kish', name: 'رویای کیش', status: 'upcoming', code: 'KSH-01', x: 30, y: 82 },
  { slug: 'afafabad-shiraz', name: 'عفاف‌آباد شیراز', status: 'under-construction', code: 'SHZ-01', x: 40, y: 66 },
  { slug: 'narenjestan-izadshahr', name: 'نارنجستان ایزدشهر', status: 'under-construction', code: 'MZN-01', x: 70, y: 20 },
  { slug: 'asp-mashhad', name: 'آ.اس.پ مشهد', status: 'operating', code: 'MSH-01', x: 82, y: 30 },
  { slug: 'asp-tehran', name: 'آ.اس.پ تهران', status: 'operating', code: 'TH-02', x: 48, y: 30 },
  { slug: 'megapars-tehran', name: 'مگاپارس تهران', status: 'completed', code: 'TH-01', x: 58, y: 44 },
  { slug: 'sahel-noshahr', name: 'مجتمع ساحل نوشهر', status: 'completed', code: 'NOW-01', x: 60, y: 15 },
]

export const featuredProject = projects.find(p => p.featured)!

// Extra per-project fields for template `03-project-detail`
// (docs/page-templates-icd3d.md §7). `ownerCompany` is nullable on purpose
// (docs/01-sitemap.md §13 Q1 is still open on Option A/B;
// docs/technical-requirements-icd3d.md §11 recommends keeping the field
// nullable either way), so it's not a link yet — just a label when present.
interface ProjectDetailFields {
  /** Eyebrow category line shown above the card title (`01b-cluster-hub-visual`). */
  category: string
  area: string
  /** Numeric built area (m²) for the area-range filter and "sort by area". */
  areaSqm: number
  floors: string
  usage: string
  year: string
  location: string
  ownerCompany: string | null
  /** Physical construction progress, under-construction projects only. */
  progressPercent?: number
  hasTour: boolean
  gallerySize: number
}

const details: Record<string, ProjectDetailFields> = {
  'tehran-international-tower': {
    category: 'برج چندمنظوره تجاری، اداری و مسکونی',
    area: '۴۲,۰۰۰ متر مربع', areaSqm: 42000, floors: '۵۶ طبقه', usage: 'تجاری، اداری و مسکونی',
    year: 'شروع ساخت ۱۴۰۲', location: 'تهران، منطقه ۱', ownerCompany: null, progressPercent: 68, hasTour: true, gallerySize: 6,
  },
  'royaye-kish': {
    category: 'مجتمع مسکونی و گردشگری ساحلی',
    area: '۱۸,۵۰۰ متر مربع', areaSqm: 18500, floors: '۱۲ طبقه', usage: 'مسکونی و گردشگری',
    year: 'مطالعات ۱۴۰۳', location: 'کیش', ownerCompany: 'شرکت ثاخت مسکن رویا', hasTour: false, gallerySize: 4,
  },
  'afafabad-shiraz': {
    category: 'مجتمع مسکونی شهری',
    area: '۲۶,۰۰۰ متر مربع', areaSqm: 26000, floors: '۹ طبقه', usage: 'مسکونی',
    year: 'شروع ساخت ۱۴۰۱', location: 'شیراز', ownerCompany: null, progressPercent: 45, hasTour: false, gallerySize: 5,
  },
  'narenjestan-izadshahr': {
    category: 'شهرک مسکونی و تجاری ساحلی',
    area: '۳۱,۰۰۰ متر مربع', areaSqm: 31000, floors: '۸ طبقه', usage: 'مسکونی و تجاری',
    year: 'شروع ساخت ۱۴۰۲', location: 'ایزدشهر', ownerCompany: null, progressPercent: 30, hasTour: false, gallerySize: 5,
  },
  'asp-mashhad': {
    category: 'مجتمع تجاری و اداری',
    area: '۲۲,۰۰۰ متر مربع', areaSqm: 22000, floors: '۷ طبقه', usage: 'تجاری و اداری',
    year: 'بهره‌برداری از ۱۳۹۹', location: 'مشهد', ownerCompany: 'شرکت آ.اس.پ ایران', hasTour: false, gallerySize: 4,
  },
  'asp-tehran': {
    category: 'مجتمع تجاری و اداری',
    area: '۲۹,۰۰۰ متر مربع', areaSqm: 29000, floors: '۱۰ طبقه', usage: 'تجاری و اداری',
    year: 'بهره‌برداری از ۱۴۰۰', location: 'تهران، منطقه ۳', ownerCompany: 'شرکت آ.اس.پ ایران', hasTour: false, gallerySize: 4,
  },
  'megapars-tehran': {
    category: 'مرکز تجاری چندمنظوره',
    area: '۳۸,۰۰۰ متر مربع', areaSqm: 38000, floors: '۱۴ طبقه', usage: 'تجاری',
    year: 'تکمیل ۱۳۹۷', location: 'تهران، منطقه ۶', ownerCompany: null, hasTour: false, gallerySize: 6,
  },
  'sahel-noshahr': {
    category: 'مجتمع مسکونی و گردشگری',
    area: '۱۵,۰۰۰ متر مربع', areaSqm: 15000, floors: '۶ طبقه', usage: 'مسکونی و گردشگری',
    year: 'تکمیل ۱۳۹۵', location: 'نوشهر', ownerCompany: null, hasTour: false, gallerySize: 5,
  },
}

export function getProjectDetail(slug: string) {
  const base = projects.find(p => p.slug === slug)
  const extra = details[slug]
  if (!base || !extra) return null
  return { ...base, ...extra, statusLabel: STATUS[base.status].label }
}

export function getRelatedProjects(slug: string, count = 3) {
  return projects.filter(p => p.slug !== slug).slice(0, count)
}

// ---------------------------------------------------------------------------
// Template `02a-index-card-grid` (docs/page-templates-icd3d.md §4) — extra
// archive fields for the four status indexes (/projects/upcoming, …). Add-only
// on purpose: `projects`, `details` and `getProjectDetail` above are shared
// with ProjectsMapExplorer / ProjectDetailView and must not change shape.
// ---------------------------------------------------------------------------

export type ProjectRegionKey = 'tehran' | 'khorasan' | 'fars' | 'kish' | 'north'
export type ProjectUsageKey = 'commercial' | 'residential' | 'hospitality' | 'mixed'

/** Region filter options — copy follows the `02a_index_card_grid` mockup. */
export const PROJECT_REGIONS: Record<ProjectRegionKey, string> = {
  tehran: 'تهران بزرگ',
  khorasan: 'خراسان رضوی (مشهد مقدس)',
  fars: 'فارس (شیراز)',
  kish: 'منطقه آزاد کیش',
  north: 'نوار ساحلی شمال (مازندران و نوشهر)',
}

/** Usage-type filter options — copy follows the `02a_index_card_grid` mockup. */
export const PROJECT_USAGE_TYPES: Record<ProjectUsageKey, string> = {
  commercial: 'چندمنظوره تجاری و اداری',
  residential: 'برج‌ها و مجموعه‌های مسکونی',
  hospitality: 'هتلینگ و اقامتی گردشگری',
  mixed: 'مختلط شهری و خدماتی',
}

interface ProjectArchiveFields {
  region: ProjectRegionKey
  usageType: ProjectUsageKey
  /** Numeric floor count for the floors-range filter. */
  floorsCount: number
  /** Solar-hijri start year, drives the «جدیدترین» sort. */
  startYear: number
  excerpt: string
}

const archiveFields: Record<string, ProjectArchiveFields> = {
  'tehran-international-tower': {
    region: 'tehran', usageType: 'mixed', floorsCount: 56, startYear: 1402,
    excerpt: 'بلندترین برج چندمنظوره شاخص ایران با چشم‌انداز ۳۶۰ درجه البرز و مدرن‌ترین سیستم‌های مدیریت هوشمند ساختمان (BMS).',
  },
  'royaye-kish': {
    region: 'kish', usageType: 'residential', floorsCount: 12, startYear: 1403,
    excerpt: 'واحدهای هوشمند با تراس‌های عریض رو به خلیج فارس، کلوپ دریایی اختصاصی و معماری سازگار با اقلیم گرم و مرطوب.',
  },
  'afafabad-shiraz': {
    region: 'fars', usageType: 'residential', floorsCount: 9, startYear: 1401,
    excerpt: 'ترکیب معماری اصیل شیرازی با فناوری مدرن پوسته دو لایه، تهویه طبیعی و بهینه‌سازی حداکثری مصرف انرژی.',
  },
  'narenjestan-izadshahr': {
    region: 'north', usageType: 'mixed', floorsCount: 8, startYear: 1402,
    excerpt: 'شهرک مسکونی و تجاری ساحلی در ایزدشهر با دسترسی مستقیم به ساحل دریای خزر، فضای سبز پیوسته و مرکز خرید محلی.',
  },
  'asp-mashhad': {
    region: 'khorasan', usageType: 'commercial', floorsCount: 7, startYear: 1399,
    excerpt: 'مجتمع تجاری و اداری در قلب مشهد با گالری‌های تجاری برندهای معتبر، دفاتر اداری مدرن و پارکینگ طبقاتی.',
  },
  'asp-tehran': {
    region: 'tehran', usageType: 'commercial', floorsCount: 10, startYear: 1400,
    excerpt: 'مجتمع اداری-تجاری شمال پایتخت با لابی‌های مستقل، سیستم تاسیسات مرکزی هوشمند و دسترسی به بزرگراه‌های اصلی.',
  },
  'megapars-tehran': {
    region: 'tehran', usageType: 'commercial', floorsCount: 14, startYear: 1397,
    excerpt: 'مرکز تجاری چندمنظوره پایتخت با بام سبز پیوسته و سازه مدرن مقاوم در برابر زلزله، میزبان برندهای ملی و بین‌المللی.',
  },
  'sahel-noshahr': {
    region: 'north', usageType: 'hospitality', floorsCount: 6, startYear: 1395,
    excerpt: 'ویلا آپارتمان‌های لوکس متصل به خط ساحلی دریای خزر با طراحی مینیمال و متریال مقاوم در برابر رطوبت.',
  },
}

/** Rank used by the «پیشرفته‌ترین فاز اجرایی» sort (higher = further along). */
const PHASE_RANK: Record<ProjectStatusKey, number> = {
  'upcoming': 1,
  'under-construction': 2,
  'operating': 3,
  'completed': 4,
}

/** Card view model for the status indexes — a superset of `ProjectCardViewModel`. */
export interface ProjectArchiveCard {
  slug: string
  title: string
  status: ProjectStatusKey
  location: string
  image: { src: string; alt: string }
  excerpt: string
  category: string
  builder: string
  stats: { label: string; value: string }[]
  region: ProjectRegionKey
  usageType: ProjectUsageKey
  areaSqm: number
  floorsCount: number
  startYear: number
  progressPercent?: number
  phaseScore: number
}

export function getProjectArchiveCards(): ProjectArchiveCard[] {
  return projects.flatMap((p) => {
    const d = getProjectDetail(p.slug)
    const a = archiveFields[p.slug]
    if (!d || !a) return []
    return [{
      slug: p.slug,
      title: p.name,
      status: p.status,
      location: d.location,
      image: { src: `https://picsum.photos/seed/project-${p.slug}/960/640`, alt: p.name },
      excerpt: a.excerpt,
      category: d.category,
      builder: d.ownerCompany ?? 'هلدینگ ثاخت',
      stats: [
        { label: 'متراژ زیربنا', value: d.area },
        { label: 'تعداد طبقات', value: d.floors },
      ],
      region: a.region,
      usageType: a.usageType,
      areaSqm: d.areaSqm,
      floorsCount: a.floorsCount,
      startYear: a.startYear,
      progressPercent: d.progressPercent,
      phaseScore: PHASE_RANK[p.status] + (d.progressPercent ?? 0) / 100,
    }]
  })
}
