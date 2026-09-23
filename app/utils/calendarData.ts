/**
 * Mock content for /ir/calendar — placeholder pending the real WordPress
 * data layer (docs/decisions.md ADR-002).
 */
import type { CalendarEventViewModel } from '~/types/content'

export const calendarEventTypeLabels: Record<CalendarEventViewModel['type'], string> = {
  assembly: 'مجمع عمومی',
  'quarterly-report': 'گزارش فصلی',
  disclosure: 'افشای اطلاعات',
}

export const calendarEvents: CalendarEventViewModel[] = [
  { title: 'مجمع عمومی عادی سالیانه — تصویب صورت‌های مالی ۱۴۰۲', jalaliDate: '۱۴۰۳/۰۴/۲۵', type: 'assembly', href: '#' },
  { title: 'انتشار صورت‌های مالی میان‌دوره‌ای ۶ ماهه', jalaliDate: '۱۴۰۳/۰۵/۳۱', type: 'quarterly-report', href: '#' },
  { title: 'افشای اطلاعات با اهمیت — قرارداد پیمانکاری مگاپارس', jalaliDate: '۱۴۰۳/۰۶/۱۰', type: 'disclosure', href: '#' },
  { title: 'انتشار صورت‌های مالی میان‌دوره‌ای ۹ ماهه', jalaliDate: '۱۴۰۳/۰۸/۳۰', type: 'quarterly-report', href: '#' },
  { title: 'مجمع عمومی فوق‌العاده — افزایش سرمایه', jalaliDate: '۱۴۰۳/۰۹/۱۵', type: 'assembly', href: '#' },
]
