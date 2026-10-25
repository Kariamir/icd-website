/**
 * «امور اداری و منابع انسانی» — /hr (ADR-024).
 *
 * ⛔ SAMPLE CONTENT. The client asked for an HR news section and an
 * organisational-slogan section; neither was supplied with copy. The entries
 * below are written to the shape the page needs so it can be reviewed as a
 * design, exactly as the sample units and prices are in catalog.ts (ADR-015).
 * They are `origin: 'design'` and must be replaced by the HR desk before
 * launch — nothing here should be read as a statement by the company.
 */
import type { IconName } from '~/utils/icons'

export interface HrNewsItem {
  id: string
  date: string
  /** Sort only; higher is newer. */
  sortKey: number
  kind: 'اطلاعیه' | 'آموزش' | 'رفاهی' | 'فراخوان'
  title: string
  excerpt: string
  origin: 'design' | 'site'
}

export const hrNews: HrNewsItem[] = [
  {
    id: 'training-calendar-1405',
    date: '۱۴۰۵/۰۷/۱۲',
    sortKey: 5,
    kind: 'آموزش',
    title: 'انتشار تقویم آموزشی نیمه دوم سال',
    excerpt: 'دوره‌های مدیریت پروژه، ایمنی کارگاهی و مدل‌سازی اطلاعات ساخت برای ستاد و کارگاه‌های گروه.',
    origin: 'design',
  },
  {
    id: 'supplementary-insurance-renewal',
    date: '۱۴۰۵/۰۶/۲۸',
    sortKey: 4,
    kind: 'اطلاعیه',
    title: 'تمدید قرارداد بیمه درمان تکمیلی کارکنان',
    excerpt: 'پوشش جدید از ابتدای مهر اجرا می‌شود؛ ثبت افراد تحت تکفل از طریق سامانه بیمه انجام می‌گیرد.',
    origin: 'design',
  },
  {
    id: 'internal-call-site-supervisors',
    date: '۱۴۰۵/۰۶/۱۰',
    sortKey: 3,
    kind: 'فراخوان',
    title: 'فراخوان داخلی جذب سرپرست کارگاه',
    excerpt: 'اولویت با همکاران شاغل در شرکت‌های تابعه و دارای سابقه اجرایی در پروژه‌های مسکونی بلندمرتبه.',
    origin: 'design',
  },
  {
    id: 'family-welfare-programme',
    date: '۱۴۰۵/۰۵/۲۲',
    sortKey: 2,
    kind: 'رفاهی',
    title: 'برنامه رفاهی خانواده‌های همکاران',
    excerpt: 'بن ورزشی، اردوهای خانوادگی و تسهیلات اقامتی در مجموعه‌های گردشگری گروه.',
    origin: 'design',
  },
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
