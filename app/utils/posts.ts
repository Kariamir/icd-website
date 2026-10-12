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
import { ph, type PhKind } from '~/utils/media'
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

const IMAGE: Record<string, [PhKind, number]> = {
  'resilience-strategy-1410': ['tower', 2],
  'geotechnical-engineering-megaprojects': ['construction', 1],
  'parametric-facade-hot-climate': ['residential', 1],
  'deep-excavation-metro-monitoring': ['construction', 2],
  'e-procurement-transparency': ['document', 1],
  'tehran-tower-structural-milestone': ['tower', 1],
  'megapars-physical-progress': ['commercial', 1],
  'aerogel-insulation-panels': ['industrial', 1],
  'kish-dream-permit': ['coastal', 1],
  'agm-1403-dividend': ['office', 1],
  'icd-founding-to-bourse-listing': ['archive', 1],
  'scc-concrete-coastal-towers': ['coastal', 2],
  'real-estate-financing-bourse': ['skyline', 2],
  'leed-green-certification-iran': ['campus', 1],
  'epc-supply-chain-steel-cement': ['industrial', 1],
  'site-engineer-diary-narenjestan': ['portrait', 1],
  'women-in-construction-icd': ['portrait', 2],
  'quarterly-market-outlook-1403': ['document', 1],
  'housing-price-index-spring-1403': ['skyline', 1],
  'nav-analysis-ordibehesht': ['document', 1],
  'density-regulations-district-1': ['aerial', 1],
  'kish-residential-yield': ['coastal', 1],
}

function categoryOf(a: (typeof articles)[number]): MediaCategory {
  if (a.contentType === 'news') return 'news'
  if (a.contentType === 'report') return 'analysis'
  return a.audio?.episode ? 'podcast' : 'stories'
}

const FIGURES: PhKind[] = ['construction', 'interior', 'aerial', 'office']

function withImages(body: ArticleBlock[]): ArticleBlock[] {
  let i = 0
  return body.map(b => b.type === 'figure' ? { ...b, image: { ...b.image, src: ph(FIGURES[i++ % FIGURES.length]!, i) } } : b)
}

const fromArticles: Post[] = articles
  .filter(a => !DISCLOSURES.has(a.slug))
  .map((a) => {
    const [kind, v] = IMAGE[a.slug] ?? ['skyline', 1]
    return {
      slug: a.slug,
      category: categoryOf(a),
      title: a.title,
      excerpt: a.excerpt ?? '',
      date: a.date ?? '',
      sortKey: a.sortKey,
      image: ph(kind, v),
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
    date: '۱۰ اردیبهشت ۱۴۰۳', sortKey: 14030210, image: ph('construction', 1), author: PR, readingMinutes: 3, views: 1210,
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
    date: '۲۸ فروردین ۱۴۰۳', sortKey: 14030128, image: ph('industrial', 1), author: PR, readingMinutes: 2, views: 860,
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
    date: '۵ اردیبهشت ۱۴۰۳', sortKey: 14030205, image: ph('residential', 2), author: PR, readingMinutes: 2, views: 640,
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
