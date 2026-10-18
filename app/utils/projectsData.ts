/**
 * Legacy adapter over app/utils/catalog.ts (ADR-015).
 *
 * The project list used to live here, separately from what the designed
 * pages showed, so the map, search and the status indexes could disagree.
 * The catalog is now the single source; this file keeps the older API that
 * ProjectsMapExplorer, search, the org chart and the editorial pages were
 * written against, and derives every value from the catalog.
 */
import {
  projects as catalog,
  projectStatus,
  getCompany,
  type ProjectStatusKey,
} from '~/utils/catalog'
import { faArea, faDigits } from '~/utils/format'

export const STATUS: Record<ProjectStatusKey, { label: string; index: string }> = Object.fromEntries(
  (Object.keys(projectStatus) as ProjectStatusKey[]).map(k => [k, { label: projectStatus[k].short, index: projectStatus[k].href }]),
) as Record<ProjectStatusKey, { label: string; index: string }>

export interface ProjectSummary {
  slug: string
  name: string
  status: ProjectStatusKey
  featured?: boolean
  code: string
  x: number
  y: number
  /** Real lon/lat for the map on /projects/map (city-level — see catalog). */
  coords: { lon: number, lat: number }
  city: string
}

export const projectSummaries: ProjectSummary[] = catalog.map((p, i) => ({
  slug: p.slug,
  name: p.name,
  status: p.status,
  featured: p.featured,
  code: `ICD-${String(i + 1).padStart(2, '0')}`,
  x: p.map.x,
  y: p.map.y,
  coords: p.coords,
  city: p.city,
}))

export const featuredProject = projectSummaries.find(p => p.featured)!

export function getProjectDetail(slug: string) {
  const p = catalog.find(x => x.slug === slug)
  const base = projectSummaries.find(x => x.slug === slug)
  if (!p || !base) return null
  const started = p.status === 'upcoming' || p.status === 'under-construction'
  return {
    ...base,
    category: p.usage,
    area: faArea(p.areaSqm),
    areaSqm: p.areaSqm,
    floors: `${faDigits(p.floors)} طبقه`,
    usage: p.usage,
    year: `${started ? 'شروع' : 'تحویل'} ${faDigits(p.year)}`,
    location: `${p.city}، ${p.district}`,
    ownerCompany: getCompany(p.company)?.name ?? null,
    progressPercent: p.progress,
    hasTour: false,
    gallerySize: 4,
    statusLabel: STATUS[p.status].label,
    image: p.image,
    excerpt: p.excerpt,
  }
}

export function getRelatedProjects(slug: string, count = 3) {
  return projectSummaries.filter(p => p.slug !== slug).slice(0, count)
}
