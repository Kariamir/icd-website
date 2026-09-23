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
