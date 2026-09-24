/**
 * Mock content for /careers — placeholder pending the real WordPress data
 * layer (ADR-002).
 */
import type { JobPostingViewModel } from '~/types/content'

export const jobPostings: JobPostingViewModel[] = [
  {
    slug: 'senior-geotechnical-engineer',
    title: 'مهندس ارشد ژئوتکنیک',
    department: 'مهندسی و اجرا',
    location: 'تهران',
    employmentType: 'تمام‌وقت',
    summary: 'طراحی و نظارت بر عملیات گودبرداری و پایدارسازی در پروژه‌های مگاپروژه هلدینگ.',
  },
  {
    slug: 'ir-analyst',
    title: 'کارشناس امور سهامداران و دیده‌بان',
    department: 'دیده‌بان ثاخت',
    location: 'تهران',
    employmentType: 'تمام‌وقت',
    summary: 'پیگیری الزامات افشای اطلاعات، سامانه کدال و پاسخگویی به پرسش‌های سهامداران.',
  },
  {
    slug: 'sales-consultant-mashhad',
    title: 'کارشناس فروش و مشاوره املاک',
    department: 'فروش و پیش‌فروش',
    location: 'مشهد',
    employmentType: 'تمام‌وقت',
    summary: 'مشاوره حضوری و تلفنی خریداران واحدهای پروژه آ.اس.پ مشهد.',
  },
]

// ---------------------------------------------------------------------------
// Template `02a-index-card-grid` for /careers — extra openings (placeholder
// pending WordPress) and index fields for the experience / deadline stats and
// sort. Add-only.
// ---------------------------------------------------------------------------

jobPostings.push(
  {
    slug: 'site-manager-kish',
    title: 'رئیس کارگاه پروژه رویای کیش',
    department: 'مهندسی و اجرا',
    location: 'کیش',
    employmentType: 'تمام‌وقت',
    summary: 'مدیریت عملیات اجرایی کارگاه، هماهنگی پیمانکاران و کنترل برنامه زمان‌بندی پروژه مسکونی و گردشگری رویای کیش.',
  },
  {
    slug: 'bim-specialist',
    title: 'کارشناس مدل‌سازی اطلاعات ساختمان (BIM)',
    department: 'طراحی و فناوری',
    location: 'تهران',
    employmentType: 'تمام‌وقت',
    summary: 'تهیه و هماهنگی مدل‌های BIM معماری و تاسیسات، کشف تداخلات و پشتیبانی از تورهای مجازی واحدهای فروش.',
  },
  {
    slug: 'financial-analyst',
    title: 'تحلیلگر مالی و بودجه پروژه',
    department: 'مالی و سرمایه‌گذاری',
    location: 'تهران',
    employmentType: 'تمام‌وقت',
    summary: 'مدل‌سازی مالی پروژه‌ها، کنترل بودجه و تهیه گزارش‌های دوره‌ای برای مدیریت و هیات‌مدیره.',
  },
  {
    slug: 'hse-officer-shiraz',
    title: 'کارشناس ایمنی و بهداشت کارگاه (HSE)',
    department: 'مهندسی و اجرا',
    location: 'شیراز',
    employmentType: 'تمام‌وقت',
    summary: 'پایش الزامات ایمنی کارگاه پروژه عفاف‌آباد شیراز، آموزش نیروها و گزارش‌دهی رخدادها.',
  },
  {
    slug: 'content-producer',
    title: 'تولیدکننده محتوای رسانه‌ای',
    department: 'رسانه و ارتباطات',
    location: 'تهران',
    employmentType: 'پاره‌وقت',
    summary: 'تولید گزارش‌های تصویری و متنی پیشرفت پروژه‌ها برای وب‌سایت، شبکه‌های اجتماعی و روایت ثاخت.',
  },
  {
    slug: 'architecture-intern',
    title: 'کارآموز طراحی معماری',
    department: 'طراحی و فناوری',
    location: 'تهران',
    employmentType: 'کارآموزی',
    summary: 'همکاری با تیم طراحی در تهیه نقشه‌های مفهومی و مدارک فنی پروژه‌های آتی هلدینگ.',
  },
  {
    slug: 'leasing-manager-mashhad',
    title: 'مدیر بهره‌برداری و اجاره واحدهای تجاری',
    department: 'فروش و پیش‌فروش',
    location: 'مشهد',
    employmentType: 'تمام‌وقت',
    summary: 'مدیریت قراردادهای اجاره و ترکیب مستاجران مجتمع تجاری آ.اس.پ مشهد و افزایش نرخ بهره‌برداری.',
  },
)

interface JobIndexFields { experience: string; postedDaysAgo: number; deadlineDays: number }

export const jobIndexFields: Record<string, JobIndexFields> = {
  'senior-geotechnical-engineer': { experience: 'حداقل ۸ سال', postedDaysAgo: 3, deadlineDays: 20 },
  'ir-analyst': { experience: 'حداقل ۳ سال', postedDaysAgo: 10, deadlineDays: 12 },
  'sales-consultant-mashhad': { experience: 'حداقل ۲ سال', postedDaysAgo: 6, deadlineDays: 25 },
  'site-manager-kish': { experience: 'حداقل ۱۰ سال', postedDaysAgo: 1, deadlineDays: 30 },
  'bim-specialist': { experience: 'حداقل ۳ سال', postedDaysAgo: 4, deadlineDays: 18 },
  'financial-analyst': { experience: 'حداقل ۴ سال', postedDaysAgo: 8, deadlineDays: 9 },
  'hse-officer-shiraz': { experience: 'حداقل ۳ سال', postedDaysAgo: 12, deadlineDays: 6 },
  'content-producer': { experience: 'حداقل ۱ سال', postedDaysAgo: 2, deadlineDays: 28 },
  'architecture-intern': { experience: 'دانشجو / فارغ‌التحصیل', postedDaysAgo: 5, deadlineDays: 15 },
  'leasing-manager-mashhad': { experience: 'حداقل ۶ سال', postedDaysAgo: 14, deadlineDays: 4 },
}
