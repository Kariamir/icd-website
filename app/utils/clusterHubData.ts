// Recovered from the pre-migration React app (src/pages/clusterHubData.js) —
// real content for the 4 clusters that use the `01a-cluster-hub-simple`
// template. Routes/labels sourced from docs/01-sitemap.md §4, §6, §7, §8.

export interface ClusterHubCard {
  title: string
  description: string
  href: string
}

export interface ClusterHubContent {
  eyebrow: string
  title: string
  intro: string
  cards: ClusterHubCard[]
}

export const clusterHubs: Record<'about' | 'sales' | 'ir' | 'media', ClusterHubContent> = {
  about: {
    eyebrow: 'درباره ثاخت',
    title: 'درباره ثاخت',
    intro: 'معرفی هلدینگ ثاخت، تاریخچه و مسیر رشد از ۱۳۶۴ تاکنون، مدیران و اعضای هیات‌مدیره، چشم‌انداز و ارزش‌ها، و افتخارات و مسئولیت اجتماعی شرکت را در این بخش بخوانید.',
    cards: [
      { title: 'معرفی شرکت و تاریخچه', description: 'تاسیس ۱۳۶۴، پذیرش در بورس و جایگاه در هلدینگ غدیر.', href: '/about/history' },
      { title: 'ارتباط مستقیم با مدیرعامل', description: 'پیام مدیرعامل و فرم تماس مستقیم با پاسخ حداکثر ۷۲ ساعته.', href: '/about/ceo' },
      { title: 'مدیران و اعضای هیات‌مدیره', description: 'معرفی مدیران ارشد و اعضای هیات‌مدیره ثاخت.', href: '/about/board' },
      { title: 'چشم‌انداز، ماموریت و ارزش‌ها', description: 'استراتژی‌ها و ارزش‌های بنیادین شرکت.', href: '/about/vision' },
      { title: 'چارت سازمانی', description: 'نمای تعاملی ساختار سازمانی ثاخت.', href: '/about/org-chart' },
      { title: 'افتخارات، گواهینامه‌ها و عضویت‌ها', description: 'گواهینامه‌ها، جوایز و عضویت‌های رسمی.', href: '/about/honors' },
      { title: 'مسئولیت اجتماعی و پایداری', description: 'گزارش‌های ESG و پایداری شرکت.', href: '/about/csr' },
    ],
  },
  sales: {
    eyebrow: 'فروش و پیش‌فروش',
    title: 'فروش و پیش‌فروش',
    intro: 'واحدهای آماده فروش و پروژه‌های در حال پیش‌فروش ثاخت را مرور کنید، راهنمای گام‌به‌گام خرید را بخوانید و برای دریافت مشاوره رایگان با کارشناسان ما در ارتباط باشید.',
    cards: [
      { title: 'واحدهای آماده فروش', description: 'لیست فیلترشدنی واحدها بر اساس پروژه، متراژ و قیمت.', href: '/sales/available' },
      { title: 'پیش‌فروش پروژه‌های در حال ساخت', description: 'موجودی پیش‌فروش پروژه‌های در حال ساخت.', href: '/sales/pre-sale' },
      { title: 'راهنمای گام‌به‌گام خرید و قرارداد', description: 'پرسش‌های متداول خریداران و مراحل عقد قرارداد.', href: '/sales/guide' },
      { title: 'درخواست مشاوره رایگان', description: 'فرم درخواست مشاوره خرید با کارشناسان فروش.', href: '/sales/consultation' },
    ],
  },
  ir: {
    eyebrow: 'دیده‌بان ثاخت',
    title: 'دیده‌بان ثاخت',
    intro: 'دیده‌بان ثاخت مرجع سهامداران و سرمایه‌گذاران است — اطلاعات لحظه‌ای نماد بورس، صورت‌های مالی، تقویم مجامع و گزارش‌های حاکمیت شرکتی در یک‌جا.',
    cards: [
      { title: 'اطلاعات نماد ثاخت در بورس', description: 'قیمت و حجم معاملات لحظه‌ای نماد ثاخت.', href: '/ir/symbol' },
      { title: 'صورت‌های مالی و گزارش فعالیت هیات‌مدیره', description: 'آرشیو اسناد مالی قابل فیلتر بر اساس سال و نوع.', href: '/ir/financials' },
      { title: 'تقویم اطلاع‌رسانی و مجامع عمومی', description: 'تقویم جلالی رویدادهای افشا و مجامع.', href: '/ir/calendar' },
      { title: 'گزارش‌های شفافیت و حاکمیت شرکتی', description: 'گزارش‌های حاکمیت شرکتی ثاخت.', href: '/ir/governance' },
      { title: 'پرسش‌های متداول سهامداران', description: 'پاسخ به پرسش‌های رایج سهامداران.', href: '/ir/faq' },
    ],
  },
  media: {
    eyebrow: 'رسانه ثاخت',
    title: 'رسانه ثاخت',
    intro: 'نبض ثاخت، روایت ثاخت و کارنامه ثاخت — اخبار، گفتگوها و گزارش‌های تخصصی هلدینگ را در رسانه ثاخت دنبال کنید.',
    cards: [
      { title: 'نبض ثاخت', description: 'اخبار روزانه و گزارش‌های تحلیلی.', href: '/media/news' },
      { title: 'روایت ثاخت', description: 'مقاله، پادکست و گفتگو با چهره‌های ملی.', href: '/media/stories' },
      { title: 'کارنامه ثاخت', description: 'گزارش‌های تخصصی مدیریت بازار و پرسش‌وپاسخ.', href: '/media/reports' },
      { title: 'بسته رسانه‌ای', description: 'لوگو، تصاویر و اطلاعات رسمی برای رسانه‌ها.', href: '/media/press-kit' },
    ],
  },
}
