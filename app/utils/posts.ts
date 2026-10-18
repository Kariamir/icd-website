/**
 * Media posts for /media and /media/[slug] (ADR-005, ADR-015).
 *
 * One categorised feed. The editorial articles recovered in articlesData.ts
 * are mapped onto the five sitemap §8.1 categories here; tender notices are
 * added as ordinary posts in the `tenders` category (ADR-009 — no Tender
 * model). Formal performance reports are not media posts: they live on
 * /ir/financials (ADR-005), so the two report-type articles that are formal
 * disclosures are left out of this feed.
 */
import { articles, type ArticleBlock, type ArticleAuthor, type ArticleAudio } from '~/utils/articlesData'

import type { MediaCategory } from '~/utils/routes'

export interface Post {
  slug: string
  category: MediaCategory
  title: string
  excerpt: string
  date: string
  sortKey: number
  image: string
  author: ArticleAuthor
  readingMinutes: number
  views: number
  audio?: ArticleAudio
  tags: string[]
  body: ArticleBlock[]
  /** Tender notices: document deadline label. */
  deadline?: string
}

/** Formal disclosures — these belong on /ir/financials, not in the feed. */
const DISCLOSURES = new Set(['board-performance-1402', 'projects-scorecard-q4-1402'])

/*
 * Cover photographs, from the client's own project folders (ADR-017) rather
 * than the illustrated placeholders they replaced (owner's request,
 * 2026-10-18).
 *
 * Where a post names a project, its cover is that project's own photograph —
 * the tower milestone shows the tower, the Narenjestan site diary shows
 * Narenjestan. The rest are market, finance and regulation pieces with no
 * project of their own; they carry a photograph of the group's work so the
 * feed reads as one portfolio, and the editorial team should swap in a
 * per-post image as real articles are written.
 */
const IMAGE: Record<string, string> = {
  // named project → that project's own photograph
  'tehran-tower-structural-milestone': 'tehran-international-tower-6',
  'megapars-physical-progress': 'mega-pars-tehran-1',
  'kish-dream-permit': 'roya-elite-9',
  'site-engineer-diary-narenjestan': 'narenjestan-izadshahr-1',
  'scc-concrete-coastal-towers': 'roya-elite-4',
  'icd-founding-to-bourse-listing': 'tehran-international-tower-1',

  // no named project — group imagery, to be replaced per post
  'resilience-strategy-1410': 'ara-tower-3',
  'geotechnical-engineering-megaprojects': 'nbo12-1',
  'parametric-facade-hot-climate': 'kia-tower-2',
  'deep-excavation-metro-monitoring': 'ghadir-office-tehran-2',
  'e-procurement-transparency': 'ghadir-office-tehran-14',
  'aerogel-insulation-panels': 'x-tisashahr-1',
  'agm-1403-dividend': 'ghadir-office-tehran-16',
  'real-estate-financing-bourse': 'sparrow-rasht-1',
  'leed-green-certification-iran': 'x-baharan-1',
  'epc-supply-chain-steel-cement': 'ofogh-sina-mashhad-4',
  'women-in-construction-icd': 'ofogh-sina-mashhad-9',
  'quarterly-market-outlook-1403': 'x-atlas-tabriz-1',
  'housing-price-index-spring-1403': 'tehran-international-tower-2',
  'nav-analysis-ordibehesht': 'x-yas-1',
  'density-regulations-district-1': 'sparrow-rasht-2',
  'kish-residential-yield': 'x-marjan-kish-1',
}

const photo = (name: string) => `/img/projects/${name}.jpg`

/** Covers used inside article bodies and by the tender notices. */
const BODY_PHOTOS = [
  'ghadir-office-tehran-13',
  'nbo12-3',
  'ara-tower-4',
  'ofogh-sina-mashhad-2',
] as const

function categoryOf(a: (typeof articles)[number]): MediaCategory {
  if (a.contentType === 'news') return 'news'
  if (a.contentType === 'report') return 'analysis'
  return a.audio?.episode ? 'podcast' : 'stories'
}

function withImages(body: ArticleBlock[]): ArticleBlock[] {
  let i = 0
  return body.map(b => b.type === 'figure'
    ? { ...b, image: { ...b.image, src: photo(BODY_PHOTOS[i++ % BODY_PHOTOS.length]!) } }
    : b)
}

const fromArticles: Post[] = articles
  .filter(a => !DISCLOSURES.has(a.slug))
  .map((a) => {
    return {
      slug: a.slug,
      category: categoryOf(a),
      title: a.title,
      excerpt: a.excerpt ?? '',
      date: a.date ?? '',
      sortKey: a.sortKey,
      image: photo(IMAGE[a.slug] ?? 'tehran-international-tower-1'),
      author: a.author,
      readingMinutes: a.readingMinutes,
      views: a.views,
      audio: a.audio,
      tags: a.tags,
      body: withImages(a.body),
    }
  })

const PR: ArticleAuthor = { name: 'روابط عمومی ثاخت', role: 'دفتر مناقصات و قراردادها', initials: 'ر.ع' }

const tenders: Post[] = [
  {
    slug: 'tender-mep-bandar-abbas-hotel',
    category: 'tenders',
    title: 'فراخوان مناقصه عمومی اجرای تاسیسات مکانیکی پروژه تجاری اداری خلیج فارس',
    excerpt: 'دعوت از پیمانکاران دارای رتبه معتبر تاسیسات برای دریافت اسناد مناقصه.',
    date: '۱۰ اردیبهشت ۱۴۰۳', sortKey: 14030210, image: photo('ghadir-office-tehran-12'), author: PR, readingMinutes: 3, views: 1210,
    deadline: '۲۵ اردیبهشت ۱۴۰۳', tags: ['مناقصه', 'تاسیسات'],
    body: [
      { type: 'p', text: 'شرکت توسعه ساختمان خاورمیانه از گروه ثاخت، اجرای تاسیسات مکانیکی پروژه تجاری اداری خلیج فارس در بندرعباس را از طریق مناقصه عمومی یک‌مرحله‌ای به پیمانکار واجد شرایط واگذار می‌کند.' },
      { type: 'h2', text: 'شرایط شرکت' },
      { type: 'checklist', items: ['دارا بودن رتبه معتبر در رشته تاسیسات و تجهیزات', 'ارائه ضمانت‌نامه شرکت در مناقصه', 'سابقه اجرای حداقل دو پروژه مشابه در پنج سال اخیر'] },
      { type: 'p', text: 'اسناد مناقصه و الزامات ثبت مدارک در صفحه اسناد و گزارش‌ها منتشر شده است.' },
    ],
  },
  {
    slug: 'auction-surplus-equipment-1403',
    category: 'tenders',
    title: 'آگهی مزایده فروش ماشین‌آلات و تجهیزات مازاد کارگاهی',
    excerpt: 'فروش تجهیزات مازاد کارگاه‌های تهران و کرج از طریق مزایده عمومی.',
    date: '۲۸ فروردین ۱۴۰۳', sortKey: 14030128, image: photo('nbo12-2'), author: PR, readingMinutes: 2, views: 860,
    deadline: '۱۵ اردیبهشت ۱۴۰۳', tags: ['مزایده', 'تجهیزات'],
    body: [
      { type: 'p', text: 'شرکت ساختمانی آ.اس.پ تعدادی از ماشین‌آلات و تجهیزات مازاد کارگاهی خود را از طریق مزایده عمومی به فروش می‌رساند.' },
      { type: 'p', text: 'فهرست اقلام، قیمت پایه و شرایط بازدید در اسناد مزایده آمده است.' },
    ],
  },
  {
    slug: 'tender-facade-niloufar',
    category: 'tenders',
    title: 'فراخوان ارزیابی کیفی تامین‌کنندگان نمای مجموعه باغ‌شهر نیلوفر',
    excerpt: 'ارزیابی کیفی سازندگان نمای سنگی و کرتین‌وال برای فاز نخست.',
    date: '۵ اردیبهشت ۱۴۰۳', sortKey: 14030205, image: photo('x-besat-1'), author: PR, readingMinutes: 2, views: 640,
    deadline: '۳۰ اردیبهشت ۱۴۰۳', tags: ['ارزیابی_کیفی', 'نما'],
    body: [
      { type: 'p', text: 'شرکت شهرسازی و خانه‌سازی باغمیشه از تامین‌کنندگان نمای سنگی و کرتین‌وال برای ارزیابی کیفی فاز نخست مجموعه باغ‌شهر نیلوفر دعوت می‌کند.' },
    ],
  },
]

export const posts: Post[] = [...fromArticles, ...tenders].sort((a, b) => b.sortKey - a.sortKey)

export function getPost(slug: string) {
  return posts.find(p => p.slug === slug)
}

export function postsByCategory(category?: MediaCategory | '') {
  return category ? posts.filter(p => p.category === category) : posts
}

export function relatedPosts(slug: string, count = 3) {
  const self = getPost(slug)
  return posts.filter(p => p.slug !== slug && p.category === self?.category).slice(0, count)
}
