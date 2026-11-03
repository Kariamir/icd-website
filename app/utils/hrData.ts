/**
 * «منابع انسانی» — /hr (ADR-024, amended by ADR-031).
 *
 * The HR news section is an INDEX, not a copy. Each entry names the post in
 * «رسانه ثاخت» that carries it, and the page reads the title, excerpt, date
 * and photograph from `posts.ts` — so the card and the article it opens can
 * never say different things. `kind` is the only thing the HR desk adds here,
 * because the media feed has no field for it.
 *
 * ⛔ The four posts these point at are SAMPLE records (`origin: 'design'` in
 * posts.ts) and are now live in the public media feed. The HR desk must
 * confirm or replace them before launch — nothing here should be read as a
 * statement by the company.
 */
import type { IconName } from '~/utils/icons'

export interface HrNewsItem {
  id: string
  /** Sort only; higher is newer. */
  sortKey: number
  kind: 'اطلاعیه' | 'آموزش' | 'رفاهی' | 'فراخوان'
  /** Slug of the post in posts.ts that carries this announcement. */
  post: string
}

export const hrNews: HrNewsItem[] = [
  { id: 'training-calendar-1405', sortKey: 5, kind: 'آموزش', post: 'hr-training-calendar-second-half' },
  { id: 'supplementary-insurance-renewal', sortKey: 4, kind: 'اطلاعیه', post: 'hr-supplementary-insurance-renewal' },
  { id: 'internal-call-site-supervisors', sortKey: 3, kind: 'فراخوان', post: 'hr-internal-call-site-supervisors' },
  { id: 'family-welfare-programme', sortKey: 2, kind: 'رفاهی', post: 'hr-family-welfare-programme' },
]

/** The organisational slogan and the values it stands on. */
export const hrSlogan = {
  eyebrow: 'شعار سازمانی',
  line: 'ما ثاختیم',
  lede: 'چهار دهه ساختن، با همان انضباطی که روز اول داشتیم — و با همان آدم‌هایی که آن را می‌سازند.',
  pillars: [
    { icon: 'workspace_premium' as IconName, title: 'شایسته‌سالاری', text: 'مسیر رشد بر پایه عملکرد سنجیده، نه سابقه صرف.' },
    { icon: 'groups' as IconName, title: 'کار گروهی', text: 'ستاد و کارگاه یک تیم‌اند؛ تصمیم در کنار اجرا گرفته می‌شود.' },
    { icon: 'health_and_safety' as IconName, title: 'ایمنی بی‌قیدوشرط', text: 'هیچ برنامه‌ای مقدم بر سلامت نیروی انسانی نیست.' },
    { icon: 'school' as IconName, title: 'یادگیری پیوسته', text: 'آموزش، بخشی از کار روزمره است نه رویدادی سالانه.' },
  ],
}
