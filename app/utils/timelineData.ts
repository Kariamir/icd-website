/**
 * Mock content for /about/history — placeholder pending the real WordPress
 * data layer (docs/decisions.md ADR-002). The reference mockup
 * (project_detail_page_template/05b_timeline_component) specifies this as
 * a 3D-flagged template; per ADR-003 (3D hero scene lost, not reconstructed
 * from memory) this ships as a 2D vertical timeline for now, with the
 * interactive 3D treatment tracked as a future enhancement, not a blocker.
 */
export interface TimelineItemViewModel {
  yearRange: string
  tag: string
  title: string
  bodyHtml: string
}

export interface TimelineEraViewModel {
  id: string
  label: string
  yearRange: string
  description: string
  items: TimelineItemViewModel[]
}

export const timelineEras: TimelineEraViewModel[] = [
  {
    id: 'era-1400',
    label: 'دوران نوین',
    yearRange: '۱۴۰۰ - ۱۴۰۳',
    description: 'هوشمندسازی، پایداری و سلامت سازه',
    items: [
      {
        yearRange: '۱۴۰۳ - ۱۴۰۲',
        tag: 'دستاوردهای مهندسی نوین',
        title: 'پیشگامی در ساختمان‌های پایدار سبز و سامانه پایش ژئوتکنیک بلادرنگ',
        bodyHtml: '<p>ورود رسمی به حوزه ساخت‌وساز همگام با استانداردهای ساختمان سبز و کاهش قابل توجه مصرف فولاد و انرژی در پروژه‌های تجاری و اقامتی. استقرار سامانه پایش آنلاین رفتار خاک در پروژه‌های کلان‌شهری.</p>',
      },
    ],
  },
  {
    id: 'era-1390',
    label: 'عصر مگاپروژه‌ها',
    yearRange: '۱۳۹۰ - ۱۳۹۹',
    description: 'توسعه مگاپارس، برج‌های تجاری و گردشگری',
    items: [
      {
        yearRange: '۱۳۹۸ - ۱۳۹۵',
        tag: 'اجرای مهندسی سنگین',
        title: 'پیشرفت فازهای تکمیلی مگاپروژه تجاری-اداری مگاپارس تهران',
        bodyHtml: '<p>پیشبرد یکی از بزرگ‌ترین پروژه‌های تجاری منطقه با فناوری سازه‌های فولادی-بتنی مرکب و سیستم‌های نوین مدیریت انرژی.</p>',
      },
      {
        yearRange: '۱۳۹۱ - ۱۳۸۹',
        tag: 'توسعه گردشگری و اقامتی',
        title: 'پهنه‌بندی مجتمع‌های گردشگری کیش و نوار ساحلی شمال',
        bodyHtml: '<p>ورود به احداث پروژه‌های تفریحی-اقامتی در مناطق آزاد تجاری نظیر پروژه «رویای کیش» و دهکده‌های گردشگری اقامتی شمال کشور.</p>',
      },
    ],
  },
  {
    id: 'era-1370',
    label: 'تثبیت و رشد',
    yearRange: '۱۳۷۰ - ۱۳۸۹',
    description: 'گسترش دامنه فعالیت و ورود به بازار سرمایه',
    items: [
      {
        yearRange: '۱۳۸۰ - ۱۳۷۵',
        tag: 'ورود به بازار سرمایه',
        title: 'پذیرش نماد ثاخت در بورس اوراق بهادار تهران',
        bodyHtml: '<p>نقطه عطف شفافیت مالی و حاکمیت شرکتی هلدینگ؛ آغاز چارچوب گزارش‌گری دوره‌ای و افشای اطلاعات طبق الزامات سازمان بورس.</p>',
      },
    ],
  },
  {
    id: 'era-1364',
    label: 'بنیان‌گذاری',
    yearRange: '۱۳۶۴',
    description: 'آغاز فعالیت شرکت بین‌المللی توسعه ساختمان',
    items: [
      {
        yearRange: '۱۳۶۴',
        tag: 'تاسیس',
        title: 'تاسیس شرکت بین‌المللی توسعه ساختمان',
        bodyHtml: '<p>آغاز فعالیت با تمرکز بر پروژه‌های مسکونی کوچک‌مقیاس، پایه‌گذار مسیری که به یکی از هلدینگ‌های ساختمانی شاخص کشور منجر شد.</p>',
      },
    ],
  },
]
