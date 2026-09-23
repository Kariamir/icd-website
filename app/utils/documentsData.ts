/**
 * Mock content for /ir/financials and /ir/governance — placeholder pending
 * the real WordPress data layer (docs/decisions.md ADR-002) and a real
 * CODAL/document-archive integration.
 */
import type { DocumentViewModel } from '~/types/content'

export const financialDocuments: DocumentViewModel[] = [
  { title: 'صورت‌های مالی حسابرسی‌شده سال مالی ۱۴۰۲', year: '۱۴۰۲', fileType: 'PDF', fileSizeLabel: '۳.۲ MB', href: '#' },
  { title: 'گزارش فعالیت هیات‌مدیره — سال مالی ۱۴۰۲', year: '۱۴۰۲', fileType: 'PDF', fileSizeLabel: '۱.۸ MB', href: '#' },
  { title: 'صورت‌های مالی میان‌دوره‌ای ۹ ماهه ۱۴۰۳', year: '۱۴۰۳', fileType: 'PDF', fileSizeLabel: '۲.۱ MB', href: '#' },
  { title: 'صورت‌های مالی حسابرسی‌شده سال مالی ۱۴۰۱', year: '۱۴۰۱', fileType: 'PDF', fileSizeLabel: '۳.۰ MB', href: '#' },
]

export const governanceDocuments: DocumentViewModel[] = [
  { title: 'گزارش حاکمیت شرکتی و کنترل‌های داخلی ۱۴۰۲', year: '۱۴۰۲', fileType: 'PDF', fileSizeLabel: '۱.۴ MB', href: '#' },
  { title: 'منشور اخلاقی و سیاست معاملات با اشخاص وابسته', year: '۱۴۰۲', fileType: 'PDF', fileSizeLabel: '۶۴۰ KB', href: '#' },
  { title: 'صورت‌جلسه مجمع عمومی عادی سالیانه ۱۴۰۳', year: '۱۴۰۳', fileType: 'PDF', fileSizeLabel: '۹۲۰ KB', href: '#' },
]
