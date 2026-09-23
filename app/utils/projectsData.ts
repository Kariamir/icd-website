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
  x: number
  y: number
}

export const projects: ProjectSummary[] = [
  { slug: 'tehran-international-tower', name: 'برج بین‌المللی تهران', status: 'under-construction', featured: true, x: 52, y: 38 },
  { slug: 'royaye-kish', name: 'رویای کیش', status: 'upcoming', x: 30, y: 82 },
  { slug: 'afafabad-shiraz', name: 'عفاف‌آباد شیراز', status: 'under-construction', x: 40, y: 66 },
  { slug: 'narenjestan-izadshahr', name: 'نارنجستان ایزدشهر', status: 'under-construction', x: 70, y: 20 },
  { slug: 'asp-mashhad', name: 'آ.اس.پ مشهد', status: 'operating', x: 82, y: 30 },
  { slug: 'asp-tehran', name: 'آ.اس.پ تهران', status: 'operating', x: 48, y: 30 },
  { slug: 'megapars-tehran', name: 'مگاپارس تهران', status: 'completed', x: 58, y: 44 },
  { slug: 'sahel-noshahr', name: 'مجتمع ساحل نوشهر', status: 'completed', x: 60, y: 15 },
]

export const featuredProject = projects.find(p => p.featured)!

// Extra per-project fields for template `03-project-detail`
// (docs/page-templates-icd3d.md §7). `ownerCompany` is nullable on purpose
// (docs/01-sitemap.md §13 Q1 is still open on Option A/B;
// docs/technical-requirements-icd3d.md §11 recommends keeping the field
// nullable either way), so it's not a link yet — just a label when present.
interface ProjectDetailFields {
  area: string
  floors: string
  usage: string
  year: string
  location: string
  ownerCompany: string | null
  hasTour: boolean
  gallerySize: number
}

const details: Record<string, ProjectDetailFields> = {
  'tehran-international-tower': {
    area: '۴۲,۰۰۰ متر مربع', floors: '۵۶ طبقه', usage: 'تجاری، اداری و مسکونی',
    year: 'شروع ساخت ۱۴۰۲', location: 'تهران، منطقه ۱', ownerCompany: null, hasTour: true, gallerySize: 6,
  },
  'royaye-kish': {
    area: '۱۸,۵۰۰ متر مربع', floors: '۱۲ طبقه', usage: 'مسکونی و گردشگری',
    year: 'مطالعات ۱۴۰۳', location: 'کیش', ownerCompany: 'شرکت ثاخت مسکن رویا', hasTour: false, gallerySize: 4,
  },
  'afafabad-shiraz': {
    area: '۲۶,۰۰۰ متر مربع', floors: '۹ طبقه', usage: 'مسکونی',
    year: 'شروع ساخت ۱۴۰۱', location: 'شیراز', ownerCompany: null, hasTour: false, gallerySize: 5,
  },
  'narenjestan-izadshahr': {
    area: '۳۱,۰۰۰ متر مربع', floors: '۸ طبقه', usage: 'مسکونی و تجاری',
    year: 'شروع ساخت ۱۴۰۲', location: 'ایزدشهر', ownerCompany: null, hasTour: false, gallerySize: 5,
  },
  'asp-mashhad': {
    area: '۲۲,۰۰۰ متر مربع', floors: '۷ طبقه', usage: 'تجاری و اداری',
    year: 'بهره‌برداری از ۱۳۹۹', location: 'مشهد', ownerCompany: 'شرکت آ.اس.پ ایران', hasTour: false, gallerySize: 4,
  },
  'asp-tehran': {
    area: '۲۹,۰۰۰ متر مربع', floors: '۱۰ طبقه', usage: 'تجاری و اداری',
    year: 'بهره‌برداری از ۱۴۰۰', location: 'تهران، منطقه ۳', ownerCompany: 'شرکت آ.اس.پ ایران', hasTour: false, gallerySize: 4,
  },
  'megapars-tehran': {
    area: '۳۸,۰۰۰ متر مربع', floors: '۱۴ طبقه', usage: 'تجاری',
    year: 'تکمیل ۱۳۹۷', location: 'تهران، منطقه ۶', ownerCompany: null, hasTour: false, gallerySize: 6,
  },
  'sahel-noshahr': {
    area: '۱۵,۰۰۰ متر مربع', floors: '۶ طبقه', usage: 'مسکونی و گردشگری',
    year: 'تکمیل ۱۳۹۵', location: 'نوشهر', ownerCompany: null, hasTour: false, gallerySize: 5,
  },
}

export function getProjectDetail(slug: string) {
  const base = projects.find(p => p.slug === slug)
  if (!base) return null
  return { ...base, ...details[slug], statusLabel: STATUS[base.status].label }
}

export function getRelatedProjects(slug: string, count = 3) {
  return projects.filter(p => p.slug !== slug).slice(0, count)
}
