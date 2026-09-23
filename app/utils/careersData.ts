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
