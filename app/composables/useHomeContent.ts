import type { HeroViewModel, ProjectCardViewModel, ArticleCardViewModel } from '~/types/content'

/**
 * Placeholder/mock content for the 10 fixed homepage blocks
 * (docs/01-sitemap.md §3.1). Replace with real WPNuxt queries once the
 * WordPress content models in docs/technical-requirements-icd3d.md §2 exist
 * — see docs/decisions.md ADR-002. Do not reorder blocks without approval
 * (project CLAUDE.md rule / sitemap §3.1 "fixed — do not reorder").
 */
export function useHomeContent() {
  const hero: HeroViewModel = {
    title: 'ثاخت',
    description: 'هلدینگ ساخت‌وساز و املاک؛ توسعه پروژه‌های نهادی از ۱۳۶۴.',
    primaryAction: { label: 'کشف پروژه‌ها', href: '/projects' },
  }

  const stats = [
    { label: 'سال تاسیس', value: '۱۳۶۴' },
    { label: 'متراژ ساخته‌شده', value: '۴۲۰,۰۰۰ مترمربع' },
    { label: 'تعداد پروژه', value: '۸' },
    { label: 'سرمایه ثبتی', value: '۱,۲۰۰ میلیارد ریال' },
  ]

  const featuredProjects: ProjectCardViewModel[] = [
    { slug: 'tehran-international-tower', title: 'برج بین‌المللی تهران', status: 'under-construction', location: 'تهران، منطقه ۱' },
    { slug: 'royaye-kish', title: 'رویای کیش', status: 'upcoming', location: 'کیش' },
    { slug: 'megapars-tehran', title: 'مگاپارس تهران', status: 'operating', location: 'تهران' },
  ]

  const news: ArticleCardViewModel[] = [
    { slug: 'placeholder-1', title: 'آغاز فاز دوم برج بین‌المللی تهران', contentType: 'news', date: '۱۴۰۴/۰۶/۰۱' },
    { slug: 'placeholder-2', title: 'گزارش فصلی دیده‌بان ثاخت منتشر شد', contentType: 'report', date: '۱۴۰۴/۰۵/۲۰' },
    { slug: 'placeholder-3', title: 'روایت ثاخت: گفت‌وگو با مدیر پروژه رویای کیش', contentType: 'story', date: '۱۴۰۴/۰۵/۱۰' },
  ]

  const subsidiaries = [
    'رویای کیش', 'عفاف‌آباد شیراز', 'نارنجستان ایزدشهر', 'آ.اس.پ مشهد',
    'آ.اس.پ تهران', 'مگاپارس تهران', 'برج بین‌المللی تهران', 'مجتمع ساحل نوشهر',
  ]

  return { hero, stats, featuredProjects, news, subsidiaries }
}
