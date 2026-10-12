/**
 * Official documents on /ir/financials (ADR-009, ADR-012, ADR-015).
 *
 * Every record carries a document group (routes.ts `documentGroups`), a fiscal
 * year, a readable summary for /ir/financials/[slug] and a downloadable file —
 * "readable and downloadable" is a requirement here, not a nicety (sitemap
 * §7.3). Titles follow the approved ir_financials design; the files are a
 * single placeholder PDF until the real documents are uploaded.
 */
import type { DocumentGroup } from '~/utils/routes'

export interface IrDocument {
  slug: string
  group: DocumentGroup
  title: string
  /** Fiscal year the document covers. */
  year: number
  date: string
  sortKey: number
  format: 'PDF' | 'XLSX'
  size: string
  codal?: string
  summary: string[]
}

const D = (d: IrDocument) => d

export const irDocuments: IrDocument[] = [
  D({ slug: 'statements-1404-consolidated', group: 'statements', year: 1404, date: '۲۸ آبان ۱۴۰۴', sortKey: 14040828, format: 'PDF', size: '۴٫۸ مگابایت', codal: '1248091',
    title: 'صورت‌های مالی تلفیقی سال مالی منتهی به ۳۱ شهریور ۱۴۰۴ (حسابرسی‌شده)',
    summary: ['صورت‌های مالی تلفیقی گروه و شرکت اصلی برای سال مالی ۱۴۰۴ همراه با گزارش حسابرس مستقل و بازرس قانونی.', 'افزایش سرمایه از محل مازاد تجدید ارزیابی در این سال، مقایسه برخی اقلام با سال‌های قبل را ناممکن می‌کند؛ یادداشت‌های توضیحی را ببینید.'] }),
  D({ slug: 'statements-1404-workbook', group: 'statements', year: 1404, date: '۱۵ آبان ۱۴۰۴', sortKey: 14040815, format: 'XLSX', size: '۴٫۲ مگابایت',
    title: 'جداول اقلام صورت‌های مالی و یادداشت‌های تفصیلی (Excel)',
    summary: ['سری زمانی پنج‌ساله اقلام صورت‌های مالی، مبنای جداول عملکرد مالی همین صفحه.'] }),
  D({ slug: 'statements-1403-consolidated', group: 'statements', year: 1403, date: '۲۵ آبان ۱۴۰۳', sortKey: 14030825, format: 'PDF', size: '۴٫۱ مگابایت', codal: '1129854',
    title: 'صورت‌های مالی تلفیقی سال مالی منتهی به ۳۱ شهریور ۱۴۰۳ (حسابرسی‌شده)',
    summary: ['صورت‌های مالی سال مالی ۱۴۰۳ گروه و شرکت اصلی همراه با گزارش حسابرس.'] }),
  D({ slug: 'statements-1404-h1', group: 'statements', year: 1404, date: '۲۹ فروردین ۱۴۰۴', sortKey: 14040129, format: 'PDF', size: '۲٫۹ مگابایت',
    title: 'صورت‌های مالی میان‌دوره‌ای شش‌ماهه منتهی به ۳۰ اسفند ۱۴۰۳',
    summary: ['صورت‌های مالی میان‌دوره‌ای شش‌ماهه با بررسی اجمالی حسابرس.'] }),
  D({ slug: 'mda-1404', group: 'mda', year: 1404, date: '۲۵ آبان ۱۴۰۴', sortKey: 14040825, format: 'PDF', size: '۶٫۱ مگابایت',
    title: 'گزارش تفسیری مدیریت دوره ۱۲ ماهه منتهی به ۳۱ شهریور ۱۴۰۴',
    summary: ['تحلیل مدیریت از عملکرد، ریسک‌ها و برنامه سال آتی، همراه با پیش‌بینی بودجه.'] }),
  D({ slug: 'mda-1403', group: 'mda', year: 1403, date: '۲۲ آبان ۱۴۰۳', sortKey: 14030822, format: 'PDF', size: '۵٫۴ مگابایت',
    title: 'گزارش تفسیری مدیریت دوره ۱۲ ماهه منتهی به ۳۱ شهریور ۱۴۰۳',
    summary: ['گزارش تفسیری مدیریت سال مالی ۱۴۰۳.'] }),
  D({ slug: 'board-report-1404', group: 'board-reports', year: 1404, date: '۲۰ آبان ۱۴۰۴', sortKey: 14040820, format: 'PDF', size: '۱۱٫۴ مگابایت',
    title: 'گزارش فعالیت هیات‌مدیره به مجمع عمومی عادی سالیانه — سال مالی ۱۴۰۴',
    summary: ['گزارش هیات‌مدیره درباره عملکرد سال، پروژه‌ها، سرمایه‌گذاری‌ها و پیشنهاد تقسیم سود.'] }),
  D({ slug: 'board-report-1403', group: 'board-reports', year: 1403, date: '۱۸ آبان ۱۴۰۳', sortKey: 14030818, format: 'PDF', size: '۹٫۸ مگابایت',
    title: 'گزارش فعالیت هیات‌مدیره به مجمع عمومی عادی سالیانه — سال مالی ۱۴۰۳',
    summary: ['گزارش هیات‌مدیره سال مالی ۱۴۰۳.'] }),
  D({ slug: 'sustainability-1403', group: 'sustainability', year: 1403, date: '۱۰ دی ۱۴۰۳', sortKey: 14031010, format: 'PDF', size: '۷٫۲ مگابایت',
    title: 'گزارش پایداری و مسئولیت اجتماعی ۱۴۰۳',
    summary: ['عملکرد زیست‌محیطی، اجتماعی و حاکمیتی گروه بر پایه چارچوب GRI.'] }),
  D({ slug: 'committees-1404', group: 'committee-reports', year: 1404, date: '۰۲ آبان ۱۴۰۴', sortKey: 14040802, format: 'PDF', size: '۲٫۴ مگابایت',
    title: 'گزارش تجمیعی کمیته حسابرسی، کمیته ریسک و کمیته انتصابات',
    summary: ['گزارش عملکرد کمیته‌های تخصصی هیات‌مدیره در سال مالی ۱۴۰۴.'] }),
  D({ slug: 'committees-1403', group: 'committee-reports', year: 1403, date: '۰۵ آبان ۱۴۰۳', sortKey: 14030805, format: 'PDF', size: '۲٫۱ مگابایت',
    title: 'گزارش عملکرد کمیته‌های تخصصی هیات‌مدیره — ۱۴۰۳',
    summary: ['گزارش کمیته‌های حسابرسی، ریسک و انتصابات در سال مالی ۱۴۰۳.'] }),
  D({ slug: 'tender-mep-persian-gulf', group: 'tenders', year: 1403, date: '۱۰ اردیبهشت ۱۴۰۳', sortKey: 14030210, format: 'PDF', size: '۳٫۶ مگابایت',
    title: 'اسناد مناقصه اجرای تاسیسات مکانیکی پروژه تجاری اداری خلیج فارس',
    summary: ['اسناد و شرایط عمومی و خصوصی پیمان. آگهی این مناقصه در رسانه ثاخت منتشر شده است.'] }),
  D({ slug: 'auction-surplus-equipment', group: 'tenders', year: 1403, date: '۲۸ فروردین ۱۴۰۳', sortKey: 14030128, format: 'PDF', size: '۱٫۲ مگابایت',
    title: 'اسناد مزایده فروش ماشین‌آلات و تجهیزات مازاد کارگاهی',
    summary: ['فهرست اقلام، قیمت پایه و شرایط بازدید.'] }),
  D({ slug: 'material-disclosure-morvarid', group: 'tenders', year: 1404, date: '۰۳ مهر ۱۴۰۴', sortKey: 14040703, format: 'PDF', size: '۱٫۱ مگابایت', codal: '1235570',
    title: 'افشای اطلاعات بااهمیت — نتیجه مزایده فروش عرصه و اعیان پروژه مروارید',
    summary: ['نتیجه مزایده و اثر آن بر صورت‌های مالی، مطابق دستورالعمل افشای اطلاعات.'] }),
  D({ slug: 'registration-requirements', group: 'registration', year: 1404, date: '۰۱ مهر ۱۴۰۴', sortKey: 14040701, format: 'PDF', size: '۰٫۸ مگابایت',
    title: 'الزامات قانونی ثبت اسناد و فهرست مدارک لازم برای پیمانکاران و تامین‌کنندگان',
    summary: ['مراحل ثبت در سامانه تامین‌کنندگان، مدارک هویتی و رتبه‌بندی لازم، و نحوه دریافت اسناد مناقصه و مزایده.'] }),
]

export function getIrDocument(slug: string) {
  return irDocuments.find(d => d.slug === slug)
}

/** The single placeholder file every download points at until real files are uploaded. */
export const PLACEHOLDER_FILE = '/docs/sample-document.pdf'
