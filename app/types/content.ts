/**
 * Frontend view models — the mapped shape components consume. Raw WordPress/
 * WPGraphQL shapes must never reach components directly (content-contract.md).
 * Field set derived from docs/technical-requirements-icd3d.md §2.
 */

export type ProjectStatus = 'upcoming' | 'under-construction' | 'operating' | 'completed'

export interface ImageViewModel {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface LinkViewModel {
  label: string
  href: string
}

export interface ProjectCardViewModel {
  slug: string
  title: string
  status: ProjectStatus
  location?: string
  image?: ImageViewModel
  excerpt?: string
}

export interface ProjectDetailViewModel extends ProjectCardViewModel {
  area?: string
  floors?: string
  usage?: string
  yearLabel?: string
  ownerCompany?: LinkViewModel | null
  hasTour: boolean
  gallery: ImageViewModel[]
  specs: { label: string; value: string }[]
}

export interface CompanyViewModel {
  slug: string
  name: string
  ownershipPercent?: number
  management?: string
  projects: ProjectCardViewModel[]
}

export interface ArticleCardViewModel {
  slug: string
  title: string
  excerpt?: string
  date?: string
  category?: string
  image?: ImageViewModel
  contentType: 'news' | 'story' | 'report'
}

export interface ArticleDetailViewModel extends ArticleCardViewModel {
  bodyHtml: string
  audioUrl?: string
  related: ArticleCardViewModel[]
}

export interface HubCardViewModel {
  title: string
  description: string
  href: string
  image?: ImageViewModel
}

export interface HeroViewModel {
  eyebrow?: string
  title: string
  description?: string
  image?: ImageViewModel
  primaryAction?: LinkViewModel
}

export interface DocumentViewModel {
  title: string
  year: string
  fileType: string
  fileSizeLabel: string
  href: string
}

export interface CalendarEventViewModel {
  title: string
  jalaliDate: string
  type: 'assembly' | 'quarterly-report' | 'disclosure'
  href?: string
}

export interface UnitViewModel {
  id: string
  projectSlug: string
  projectTitle: string
  area: string
  floor: string
  orientation?: string
  priceLabel: string
  status: 'available' | 'reserved' | 'sold'
  floorPlanImage?: ImageViewModel
}

export interface SearchResultViewModel {
  title: string
  href: string
  excerpt?: string
  contentType: 'project' | 'news' | 'report' | 'company' | 'job'
}

export interface FaqItemViewModel {
  question: string
  answer: string
}

export interface UnitDetailViewModel extends UnitViewModel {
  trackingCode: string
  parkingCount: number
  description: string
  gallery: ImageViewModel[]
  specs: { label: string; value: string }[]
}

export interface BoardMemberViewModel {
  slug: string
  name: string
  role: string
  bioHtml: string
  image?: ImageViewModel
}

export interface HonorViewModel {
  title: string
  year: string
  issuer: string
  image?: ImageViewModel
}

export interface JobPostingViewModel {
  slug: string
  title: string
  department: string
  location: string
  employmentType: string
  summary: string
}
