/**
 * Client-side site search over the mock content built so far. This is a
 * real, working implementation (no backend needed) — unlike most other
 * *Data.ts files in this folder, it is not a placeholder: simple substring
 * search over in-memory content is a reasonable v1 for a site this size,
 * and can be swapped for a real search index later without changing the
 * SearchResultViewModel contract consumed by the UI.
 */
import type { SearchResultViewModel } from '~/types/content'
import { projects, getProjectDetail } from '~/utils/projectsData'
import { articles } from '~/utils/articlesData'
import { boardMembers } from '~/utils/boardData'
import { jobPostings } from '~/utils/careersData'
import { visionPage, csrPage } from '~/utils/editorialData'

function buildIndex(): SearchResultViewModel[] {
  const results: SearchResultViewModel[] = []

  for (const project of projects) {
    const detail = getProjectDetail(project.slug)
    results.push({
      title: project.name,
      href: `/projects/${project.slug}`,
      excerpt: detail?.location,
      contentType: 'project',
    })
  }

  for (const article of articles) {
    results.push({
      title: article.title,
      href: `/media/${article.contentType === 'news' ? 'news' : article.contentType === 'story' ? 'stories' : 'reports'}/${article.slug}`,
      excerpt: article.excerpt,
      contentType: 'news',
    })
  }

  for (const member of boardMembers) {
    results.push({
      title: member.name,
      href: `/about/board/${member.slug}`,
      excerpt: member.role,
      contentType: 'company',
    })
  }

  for (const job of jobPostings) {
    results.push({
      title: job.title,
      href: '/careers',
      excerpt: job.summary,
      contentType: 'job',
    })
  }

  for (const page of [visionPage, csrPage]) {
    results.push({
      title: page.title,
      href: page === visionPage ? '/about/vision' : '/about/csr',
      excerpt: page.intro,
      contentType: 'report',
    })
  }

  return results
}

const searchIndex = buildIndex()

export const searchContentTypeLabels: Record<SearchResultViewModel['contentType'], string> = {
  project: 'پروژه',
  news: 'رسانه',
  report: 'محتوای شرکت',
  company: 'هیات‌مدیره',
  job: 'فرصت شغلی',
}

export function searchSite(query: string): SearchResultViewModel[] {
  const q = query.trim()
  if (!q) return []
  return searchIndex.filter(item =>
    item.title.includes(q) || (item.excerpt && item.excerpt.includes(q)),
  )
}
