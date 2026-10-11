// Content for the 4 cluster hubs built on template `01a-cluster-hub-simple`
// (project_detail_page_template/01a_cluster_hub_simple/code.html): hero
// banner → about + 4 big metrics → affiliated-entities strip → child-page
// catalog carousel → 5-step process with image → quick-contact panel.
// The mockup was written for /sales; its copy is kept there nearly verbatim
// and adapted per cluster for /about, /ir and /media. Child cards link to
// real routes (docs/01-sitemap.md §4, §6, §7, §8). Figures are placeholders
// until the CMS/IR feeds exist. Images: picsum placeholders, like the other
// mock data files.

const IMG = (seed: string, w = 960, h = 640) => `/img/placeholder.svg`

export type ClusterHubKey = 'about' | 'sales' | 'ir' | 'media'

export type ClusterHubIcon =
  | 'chat' | 'search' | 'sliders' | 'document' | 'handshake'
  | 'building' | 'chart' | 'tower' | 'sun' | 'shield'
  | 'calendar' | 'coins' | 'mic' | 'newspaper' | 'mail'

export interface ClusterHubLink {
  label: string
  href: string
}

export interface ClusterHubCard {
  title: string
  description: string
  href: string
  image: string
  /** Hover overlay call-to-action on the card image. */
  cta: string
  /** Highlighted figure in the card's caption line, e.g. «بیش از 4,000+ مترمربع …». */
  stat?: { lead?: string, value: string, label: string }
}

export interface ClusterHubStat {
  value: string
  prefix?: string
  suffix?: string
  label: string
  note: string
}

export interface ClusterHubStep {
  title: string
  body: string
  icon: ClusterHubIcon
}

export interface ClusterHubContent {
  key: ClusterHubKey
  /** Section name — breadcrumb + SEO title. */
  title: string
  /** One-paragraph summary — SEO description. */
  intro: string
  hero: {
    badge: string
    title: [string, string]
    lead: string
    image: string
    imageAlt: string
    primary: ClusterHubLink
    secondary: ClusterHubLink
  }
  about: {
    eyebrow: string
    title: string
    body: string
    link: ClusterHubLink
  }
  stats: ClusterHubStat[]
  partners: { label: string, items: string[] }
  catalog: { title: string, intro: string, cards: ClusterHubCard[] }
  process: {
    title: string
    intro: string
    image: string
    imageAlt: string
    badge: [string, string]
    steps: ClusterHubStep[]
  }
  contact: {
    title: string
    body: string
    field: 'phone' | 'email'
    placeholder: string
    button: string
    success: string
  }
}

const holdingAffiliates = [
  'توسعه صنعت مسکن خاورمیانه',
  'پارس سازه',
  'مهندسی آ.اس.پ',
  'سرمایه‌گذاری ساختمانی کیش',
  'پایا عمران سازه',
]

const salesHub: ClusterHubContent = {
  key: 'sales',
  title: 'فروش و پیش‌فروش',
  intro: 'واحدهای آماده فروش و پروژه‌های در حال پیش‌فروش ثاخت را مرور کنید، راهنمای گام‌به‌گام خرید را بخوانید و برای دریافت مشاوره رایگان با کارشناسان ما در ارتباط باشید.',
  hero: {
    badge: 'پرتفوی جامع فروش و توسعه املاک تجاری، اداری و مسکونی',
    title: ['املاک راهبردی', 'برای کسب‌وکار و سرمایه‌گذاری'],
    lead: 'واگذاری قطعی، پیش‌فروش مطمئن، ساخت سفارشی و مدیریت جامع بهره‌برداری از پروژه‌های شاخص مقیاس‌بزرگ در سراسر پهنه ملی کشور.',
    image: IMG('icd-hub-sales-hero', 1600, 900),
    imageAlt: 'نمای برج‌های اداری و تجاری هلدینگ ثاخت',
    primary: { label: 'شروع فرآیند همکاری', href: '/sales/consultation' },
    secondary: { label: 'کارنامه ثاخت', href: '#hub-stats' },
  },
  about: {
    eyebrow: 'درباره هلدینگ ثاخت',
    title: 'پیشگام مهندسی ارزش و خلق فضاهای تراز اول سرمایه‌گذاری',
    body: 'شرکت بین‌المللی توسعه ساختمان (ثاخت) با تکیه بر شبکه گسترده شرکت‌های تابعه تخصصی، به عنوان یکی از ستون‌های راهبردی توسعه املاک تجاری، برج‌های اداری و مجتمع‌های مسکونی لوکس فعالیت می‌نماید. از مراحل تملیک، طراحی مهندسی، انبوه‌سازی تا انتقال مالکیت رسمی، منافع پایدار خریداران و شرکای تجاری را تضمین می‌کنیم.',
    link: { label: 'آشنایی با پروتکل اعتبارسنجی اسناد و قراردادها', href: '/sales/guide' },
  },
  stats: [
    { value: '25', suffix: '+', label: 'سال سابقه تخصصی', note: 'حضور پیشرو در انبوه‌سازی و بورس' },
    { value: '1,200', suffix: '+', label: 'قرارداد موفق و واگذاری', note: 'انتقال سند و رضایت شفاف طرفین' },
    { value: '4,500', suffix: '+', label: 'واحد در بانک داده پروژه‌ها', note: 'موجودی تجاری، اداری و سکونتی' },
    { value: '96', suffix: '%', label: 'رضایت سرمایه‌گذاران', note: 'بر اساس پایش عملکرد خدمات پس از فروش' },
  ],
  partners: { label: 'شرکت‌های وابسته هلدینگ', items: holdingAffiliates },
  catalog: {
    title: 'کاتالوگ فروش و پیش‌فروش',
    intro: 'طیف گسترده‌ای از املاک با توجیه اقتصادی ممتاز، آماده واگذاری، پیش‌فروش و سرمایه‌گذاری مشارکتی',
    cards: [
      {
        title: 'واحدهای آماده فروش',
        description: 'فضاهای اداری، تجاری و مسکونی آماده تحویل با سند تک‌برگ.',
        href: '/sales/available',
        image: IMG('icd-hub-sales-available', 720, 960),
        cta: 'مشاهده واحدهای آماده تحویل',
        stat: { lead: 'بیش از', value: '4,000+', label: 'مترمربع فضای مفید قابل واگذاری' },
      },
      {
        title: 'پیش‌فروش پروژه‌های در حال ساخت',
        description: 'مجموعه‌های چندمنظوره، تجاری و اقامتی در مرحله ساخت.',
        href: '/sales/pre-sale',
        image: IMG('icd-hub-sales-presale', 720, 960),
        cta: 'بررسی طرح‌های پیش‌فروش',
        stat: { lead: 'بیش از', value: '1,000+', label: 'فرصت سرمایه‌گذاری و غرفه تجاری' },
      },
      {
        title: 'راهنمای گام‌به‌گام خرید و قرارداد',
        description: 'مراحل عقد قرارداد، مدارک لازم و پرسش‌های متداول خریداران.',
        href: '/sales/guide',
        image: IMG('icd-hub-sales-guide', 720, 960),
        cta: 'مطالعه راهنمای خرید',
        stat: { value: '5', label: 'گام شفاف از مشاوره تا تحویل کلید' },
      },
      {
        title: 'درخواست مشاوره رایگان',
        description: 'گفتگو با کارشناسان فروش برای انتخاب واحد متناسب با بودجه.',
        href: '/sales/consultation',
        image: IMG('icd-hub-sales-consult', 720, 960),
        cta: 'ثبت درخواست مشاوره',
        stat: { lead: 'حداکثر', value: '72', label: 'ساعت تا تماس کارشناس' },
      },
    ],
  },
  process: {
    title: 'فرآیند شفاف و استاندارد معامله',
    intro: 'ما مسیر تصمیم‌گیری و سرمایه‌گذاری ملکی را در کمال سلامت اداری، شفافیت حقوقی و سرعت بالا برای شما تدوین کرده‌ایم.',
    image: IMG('icd-hub-sales-process', 720, 1080),
    imageAlt: 'آسمان‌خراش و شیشه‌بندی پروژه‌های مهندسی ثاخت',
    badge: ['مشاوره تخصصی', 'و رایگان سرمایه‌گذاری'],
    steps: [
      { icon: 'chat', title: 'مشاوره تخصصی و نیازسنجی سرمایه', body: 'بررسی اهداف کسب‌وکار یا بودجه سرمایه‌گذار و تحلیل نیازسنجی متراژ، پهنه شهری و افق بازدهی مالی.' },
      { icon: 'search', title: 'انتخاب هوشمند و فیلتر فایل‌های اختصاصی', body: 'ارائه مستندات و نقشه‌های مهندسی تنها برای واحدهایی که تطابق کامل با معیارهای متقاضی دارند.' },
      { icon: 'sliders', title: 'بازدید میدانی و کارشناسی فنی ملک', body: 'هماهنگی بازدید پروژه به همراه تیم کارشناسان ارشد سازه و تاسیسات جهت ارائه گزارش مکتوب کیفی.' },
      { icon: 'document', title: 'صحه‌گذاری اسناد و استعلام‌های حقوقی', body: 'بررسی سلامت سند مالکیت تک‌برگی، پایان‌کار، پروانه ساختمانی و عدم هرگونه بازداشت قانونی در کارگروه حقوقی ثاخت.' },
      { icon: 'handshake', title: 'انعقاد قرارداد رسمی و تحویل کلید', body: 'عقد مبایعه‌نامه رسمی در دفاتر شرکت و همراهی تا تحویل فیزیکی قطعی واحد و خدمات پس از فروش.' },
    ],
  },
  contact: {
    title: 'نیاز به دریافت کاتالوگ تفصیلی پروژه‌ها دارید؟',
    body: 'کارشناسان معاونت بازاریابی و فروش هلدینگ آماده پاسخگویی هستند.',
    field: 'phone',
    placeholder: 'شماره تلفن همراه (مثال: ۰۹۱۲۱۲۳۴۵۶۷)',
    button: 'ثبت درخواست',
    success: 'درخواست شما ثبت شد؛ کارشناسان فروش ظرف ۷۲ ساعت با شما تماس می‌گیرند.',
  },
}

const aboutHub: ClusterHubContent = {
  key: 'about',
  title: 'درباره ثاخت',
  intro: 'معرفی هلدینگ ثاخت، تاریخچه و مسیر رشد از ۱۳۶۴ تاکنون، مدیران و اعضای هیات‌مدیره، چشم‌انداز و ارزش‌ها، و افتخارات و مسئولیت اجتماعی شرکت را در این بخش بخوانید.',
  hero: {
    badge: 'هلدینگ بورسی ساخت‌وساز و املاک — فعال از ۱۳۶۴',
    title: ['چهار دهه ساختن', 'با تکیه بر اعتماد و مهندسی'],
    lead: 'شرکت بین‌المللی توسعه ساختمان (ثاخت)، عضو گروه سرمایه‌گذاری غدیر، از تملک و طراحی تا ساخت و بهره‌برداری مگاپروژه‌های مسکونی، تجاری و گردشگری را در سراسر کشور هدایت می‌کند.',
    image: IMG('icd-hub-about-hero', 1600, 900),
    imageAlt: 'نمای شاخص یکی از پروژه‌های هلدینگ ثاخت',
    primary: { label: 'آشنایی با تاریخچه ثاخت', href: '/about/history' },
    secondary: { label: 'ثاخت در یک نگاه', href: '#hub-stats' },
  },
  about: {
    eyebrow: 'درباره هلدینگ ثاخت',
    title: 'از یک شرکت پیمانکاری تا بزرگ‌ترین هلدینگ ساختمانی بازار سرمایه',
    body: 'ثاخت در سال ۱۳۶۴ با هدف توسعه پروژه‌های ساختمانی نهادی تاسیس شد و امروز با شبکه‌ای از شرکت‌های تابعه تخصصی، سبدی متنوع از برج‌های اداری، مجتمع‌های تجاری، واحدهای مسکونی و مراکز اقامتی را در شهرهای مختلف کشور اداره می‌کند. حاکمیت شرکتی شفاف، مهندسی ارزش و تعهد به ذی‌نفعان سه ستون اصلی مسیر ما هستند.',
    link: { label: 'پیام مدیرعامل و ارتباط مستقیم با ایشان', href: '/about/ceo' },
  },
  stats: [
    { value: '40', suffix: '+', label: 'سال فعالیت مستمر', note: 'از تاسیس در ۱۳۶۴ تاکنون' },
    { value: '35', suffix: '+', label: 'پروژه شاخص', note: 'مسکونی، تجاری، اداری و گردشگری' },
    { value: '12', suffix: '+', label: 'شرکت تابعه و وابسته', note: 'در زنجیره طراحی تا بهره‌برداری' },
    { value: '3.2', suffix: 'M', label: 'مترمربع زیربنای اجراشده', note: 'در پهنه جغرافیایی کشور' },
  ],
  partners: { label: 'شرکت‌های وابسته هلدینگ', items: holdingAffiliates },
  catalog: {
    title: 'آشنایی با ثاخت',
    intro: 'تاریخچه، مدیران، ساختار سازمانی، ارزش‌ها و کارنامه اجتماعی هلدینگ را در بخش‌های زیر مرور کنید',
    cards: [
      { title: 'معرفی شرکت و تاریخچه', description: 'تاسیس ۱۳۶۴، پذیرش در بورس و جایگاه در هلدینگ غدیر.', href: '/about/history', image: IMG('icd-hub-about-history', 720, 960), cta: 'مرور خط زمان ثاخت', stat: { lead: 'تاسیس در', value: '1364', label: 'هجری شمسی' } },
      { title: 'ارتباط مستقیم با مدیرعامل', description: 'پیام مدیرعامل و فرم تماس مستقیم با پاسخ حداکثر ۷۲ ساعته.', href: '/about/ceo', image: IMG('icd-hub-about-ceo', 720, 960), cta: 'ارسال پیام به مدیرعامل', stat: { lead: 'حداکثر', value: '72', label: 'ساعت تا پاسخ' } },
      { title: 'مدیران و اعضای هیات‌مدیره', description: 'معرفی مدیران ارشد و اعضای هیات‌مدیره ثاخت.', href: '/about/board', image: IMG('icd-hub-about-board', 720, 960), cta: 'آشنایی با اعضای هیات‌مدیره', stat: { value: '5', label: 'عضو هیات‌مدیره' } },
      { title: 'چشم‌انداز، ماموریت و ارزش‌ها', description: 'استراتژی‌ها و ارزش‌های بنیادین شرکت.', href: '/about/vision', image: IMG('icd-hub-about-vision', 720, 960), cta: 'مطالعه سند چشم‌انداز', stat: { value: '6', label: 'ارزش بنیادین سازمانی' } },
      { title: 'چارت سازمانی', description: 'نمای تعاملی ساختار سازمانی ثاخت.', href: '/about/org-chart', image: IMG('icd-hub-about-org', 720, 960), cta: 'مشاهده چارت سازمانی', stat: { value: '4', label: 'معاونت تخصصی' } },
      { title: 'افتخارات، گواهینامه‌ها و عضویت‌ها', description: 'گواهینامه‌ها، جوایز و عضویت‌های رسمی.', href: '/about/honors', image: IMG('icd-hub-about-honors', 720, 960), cta: 'مشاهده افتخارات', stat: { lead: 'بیش از', value: '20+', label: 'گواهینامه و جایزه' } },
      { title: 'مسئولیت اجتماعی و پایداری', description: 'گزارش‌های ESG و پایداری شرکت.', href: '/about/csr', image: IMG('icd-hub-about-csr', 720, 960), cta: 'گزارش‌های پایداری', stat: { value: 'ESG', label: 'گزارش سالانه پایداری' } },
    ],
  },
  process: {
    title: 'مسیر رشد ثاخت',
    intro: 'پنج مرحله کلیدی که ثاخت را از یک شرکت پیمانکاری به هلدینگی چندوجهی در بازار سرمایه رساند.',
    image: IMG('icd-hub-about-process', 720, 1080),
    imageAlt: 'کارگاه ساخت یکی از برج‌های هلدینگ ثاخت',
    badge: ['بیش از چهار دهه', 'تجربه ساختن'],
    steps: [
      { icon: 'building', title: 'تاسیس و آغاز فعالیت پیمانکاری (۱۳۶۴)', body: 'شکل‌گیری شرکت با تمرکز بر اجرای پروژه‌های ساختمانی نهادی و مسکونی در تهران.' },
      { icon: 'chart', title: 'پذیرش در بورس اوراق بهادار تهران', body: 'ورود به بازار سرمایه با نماد «ثاخت» و آغاز دوره شفافیت مالی و پاسخگویی عمومی.' },
      { icon: 'tower', title: 'ورود به مگاپروژه‌های تجاری و اداری', body: 'اجرای برج‌های اداری و مجتمع‌های تجاری بزرگ‌مقیاس در کلان‌شهرهای کشور.' },
      { icon: 'sun', title: 'توسعه گردشگری و اقامتی', body: 'سرمایه‌گذاری در مجتمع‌های اقامتی و تفریحی در کیش، سواحل شمال و شهرهای زیارتی.' },
      { icon: 'shield', title: 'حاکمیت شرکتی، پایداری و تحول دیجیتال', body: 'استقرار نظام حاکمیت شرکتی، گزارش‌دهی ESG و به‌کارگیری BIM در مدیریت پروژه‌ها.' },
    ],
  },
  contact: {
    title: 'مایل به دریافت پروفایل رسمی شرکت هستید؟',
    body: 'نسخه کامل معرفی هلدینگ، سوابق پروژه‌ها و گواهینامه‌ها را به پست الکترونیکی شما ارسال می‌کنیم.',
    field: 'email',
    placeholder: 'پست الکترونیکی شما',
    button: 'دریافت پروفایل شرکت',
    success: 'درخواست ثبت شد؛ پروفایل شرکت به‌زودی به ایمیل شما ارسال می‌شود.',
  },
}

const irHub: ClusterHubContent = {
  key: 'ir',
  title: 'دیده‌بان ثاخت',
  intro: 'دیده‌بان ثاخت مرجع سهامداران و سرمایه‌گذاران است — اطلاعات نماد بورس، صورت‌های مالی، تقویم مجامع و گزارش‌های حاکمیت شرکتی در یک‌جا.',
  hero: {
    badge: 'دیده‌بان ثاخت — مرجع رسمی سهامداران و سرمایه‌گذاران',
    title: ['شفافیت و پاسخگویی', 'برای خلق ارزش پایدار سهامداران'],
    lead: 'اطلاعات نماد ثاخت، صورت‌های مالی حسابرسی‌شده، تقویم مجامع و گزارش‌های حاکمیت شرکتی را در یک مرجع واحد و به‌روز دنبال کنید.',
    image: IMG('icd-hub-ir-hero', 1600, 900),
    imageAlt: 'نمای ساختمان مرکزی هلدینگ ثاخت',
    primary: { label: 'اطلاعات نماد ثاخت', href: '/ir/symbol' },
    secondary: { label: 'صورت‌های مالی', href: '/ir/financials' },
  },
  about: {
    eyebrow: 'روابط با سرمایه‌گذاران',
    title: 'تعهد به افشای به‌موقع و برابر اطلاعات برای همه سهامداران',
    body: 'ثاخت به عنوان شرکتی پذیرفته‌شده در بورس اوراق بهادار تهران، اطلاعات با اهمیت، صورت‌های مالی میان‌دوره‌ای و سالانه و گزارش‌های فعالیت هیات‌مدیره را از طریق سامانه کدال و این درگاه به‌صورت هم‌زمان در اختیار همه سهامداران قرار می‌دهد. امور سهامداران پاسخگوی پرسش‌های شما درباره سود، مجامع و حقوق سهامداری است.',
    link: { label: 'گزارش‌های شفافیت و حاکمیت شرکتی', href: '/ir/governance' },
  },
  stats: [
    { value: '25', suffix: '+', label: 'سال حضور در بازار سرمایه', note: 'نماد «ثاخت» در بورس تهران' },
    { value: '180K', suffix: '+', label: 'سهامدار حقیقی و حقوقی', note: 'بر اساس آخرین فهرست سهامداران' },
    { value: '120', suffix: '+', label: 'اطلاعیه رسمی در سال', note: 'منتشرشده در سامانه کدال' },
    { value: '100', suffix: '%', label: 'افشای به‌موقع صورت‌های مالی', note: 'در مهلت‌های مقرر سازمان بورس' },
  ],
  partners: {
    label: 'نهادهای ناظر و مرجع',
    items: ['سازمان بورس و اوراق بهادار', 'بورس اوراق بهادار تهران', 'سامانه جامع اطلاع‌رسانی کدال', 'سپرده‌گذاری مرکزی (سمات)', 'گروه سرمایه‌گذاری غدیر'],
  },
  catalog: {
    title: 'خدمات دیده‌بان ثاخت',
    intro: 'تابلوی نماد، اسناد مالی، رویدادهای افشا و پاسخ به پرسش‌های سهامداران — همه در یک مسیر',
    cards: [
      { title: 'اطلاعات نماد ثاخت در بورس', description: 'قیمت، حجم معاملات و نمودار لحظه‌ای نماد ثاخت.', href: '/ir/symbol', image: IMG('icd-hub-ir-symbol', 720, 960), cta: 'مشاهده تابلوی نماد', stat: { lead: 'نماد', value: 'ثاخت', label: 'در بورس اوراق بهادار تهران' } },
      { title: 'صورت‌های مالی و گزارش فعالیت هیات‌مدیره', description: 'آرشیو اسناد مالی قابل فیلتر بر اساس سال و نوع.', href: '/ir/financials', image: IMG('icd-hub-ir-financials', 720, 960), cta: 'ورود به آرشیو اسناد مالی', stat: { lead: 'بیش از', value: '60+', label: 'سند مالی حسابرسی‌شده' } },
      { title: 'تقویم اطلاع‌رسانی و مجامع عمومی', description: 'تقویم جلالی رویدادهای افشا و مجامع.', href: '/ir/calendar', image: IMG('icd-hub-ir-calendar', 720, 960), cta: 'مشاهده تقویم رویدادها', stat: { value: '12', label: 'رویداد برنامه‌ریزی‌شده امسال' } },
      { title: 'گزارش‌های شفافیت و حاکمیت شرکتی', description: 'منشور حاکمیت شرکتی، کمیته‌ها و گزارش‌های کنترل داخلی.', href: '/ir/governance', image: IMG('icd-hub-ir-governance', 720, 960), cta: 'مطالعه گزارش‌های حاکمیتی', stat: { value: '4', label: 'کمیته تخصصی هیات‌مدیره' } },
      { title: 'پرسش‌های متداول سهامداران', description: 'پاسخ به پرسش‌های رایج درباره سود، سجام و مجامع.', href: '/ir/faq', image: IMG('icd-hub-ir-faq', 720, 960), cta: 'مشاهده پرسش‌ها و پاسخ‌ها', stat: { value: '30', label: 'پرسش پرتکرار با پاسخ رسمی' } },
    ],
  },
  process: {
    title: 'حقوق و مسیر سهامداری در ثاخت',
    intro: 'از پیگیری تابلوی نماد تا دریافت سود نقدی — آنچه هر سهامدار ثاخت باید بداند.',
    image: IMG('icd-hub-ir-process', 720, 1080),
    imageAlt: 'جلسه مجمع عمومی سهامداران ثاخت',
    badge: ['امور سهامداران', 'پاسخگوی شماست'],
    steps: [
      { icon: 'chart', title: 'پیگیری تابلوی نماد و اطلاعیه‌ها', body: 'قیمت و حجم معاملات نماد و اطلاعیه‌های کدال را به‌صورت لحظه‌ای در دیده‌بان ثاخت دنبال کنید.' },
      { icon: 'document', title: 'مطالعه صورت‌های مالی و گزارش هیات‌مدیره', body: 'صورت‌های مالی میان‌دوره‌ای و سالانه حسابرسی‌شده و گزارش تفسیری مدیریت در آرشیو اسناد در دسترس است.' },
      { icon: 'calendar', title: 'حضور در مجامع عمومی', body: 'زمان، دستور جلسه و نحوه حضور حضوری یا برخط در مجامع عادی و فوق‌العاده از تقویم رویدادها اعلام می‌شود.' },
      { icon: 'coins', title: 'دریافت سود نقدی از طریق سجام', body: 'سود مصوب مجمع طبق جدول زمان‌بندی اعلامی به حساب بانکی ثبت‌شده سهامداران در سامانه سجام واریز می‌شود.' },
      { icon: 'chat', title: 'ارتباط با امور سهامداران', body: 'پرسش‌ها و درخواست‌های خود درباره حقوق سهامداری را از طریق فرم تماس یا مرکز تماس امور سهامداران مطرح کنید.' },
    ],
  },
  contact: {
    title: 'عضویت در سامانه اطلاع‌رسانی سهامداران',
    body: 'اطلاعیه‌های کدال، زمان مجامع و جدول پرداخت سود را مستقیم در صندوق ایمیل خود دریافت کنید.',
    field: 'email',
    placeholder: 'پست الکترونیکی شما',
    button: 'ثبت عضویت',
    success: 'عضویت شما در فهرست اطلاع‌رسانی سهامداران ثبت شد.',
  },
}

const mediaHub: ClusterHubContent = {
  key: 'media',
  title: 'رسانه ثاخت',
  intro: 'نبض ثاخت، روایت ثاخت و کارنامه ثاخت — اخبار، گفتگوها و گزارش‌های تخصصی هلدینگ را در رسانه ثاخت دنبال کنید.',
  hero: {
    badge: 'رسانه ثاخت — نبض، روایت و کارنامه هلدینگ',
    title: ['روایت ساختن', 'از دل کارگاه تا بازار سرمایه'],
    lead: 'اخبار روزانه پروژه‌ها، گفتگو با چهره‌های صنعت ساختمان و گزارش‌های تحلیلی بازار مسکن و سرمایه را از منبع رسمی هلدینگ ثاخت دنبال کنید.',
    image: IMG('icd-hub-media-hero', 1600, 900),
    imageAlt: 'نمای شهری از پروژه‌های در حال ساخت ثاخت',
    primary: { label: 'آخرین اخبار ثاخت', href: '/media/news' },
    secondary: { label: 'روایت ثاخت', href: '/media/stories' },
  },
  about: {
    eyebrow: 'درباره رسانه ثاخت',
    title: 'مرجع رسمی اخبار، گفتگوها و گزارش‌های تخصصی هلدینگ',
    body: 'رسانه ثاخت در سه بخش سازمان یافته است: «نبض ثاخت» برای اخبار روزانه و اطلاعیه‌ها، «روایت ثاخت» برای مقاله، پادکست و گفتگو با چهره‌های ملی، و «کارنامه ثاخت» برای گزارش‌های تخصصی مدیریت بازار. همه محتوا با تایید روابط عمومی هلدینگ منتشر می‌شود و قابل استناد است.',
    link: { label: 'جستجو در آرشیو رسانه', href: '/search' },
  },
  stats: [
    { value: '850', suffix: '+', label: 'خبر و اطلاعیه منتشرشده', note: 'در آرشیو نبض ثاخت' },
    { value: '60', suffix: '+', label: 'گفتگو و پادکست', note: 'با مدیران و چهره‌های صنعت' },
    { value: '40', suffix: '+', label: 'گزارش تخصصی بازار', note: 'در مجموعه کارنامه ثاخت' },
    { value: '12', label: 'سال آرشیو دیجیتال', note: 'قابل جستجو و استناد' },
  ],
  partners: {
    label: 'پوشش رسانه‌ای ثاخت در',
    items: ['خبرگزاری‌های رسمی کشور', 'روزنامه‌های اقتصادی', 'نشریات تخصصی ساختمان', 'رادیو و تلویزیون', 'رسانه‌های بازار سرمایه'],
  },
  catalog: {
    title: 'بخش‌های رسانه ثاخت',
    intro: 'از اخبار روز پروژه‌ها تا گفتگوهای عمیق و گزارش‌های تحلیلی بازار',
    cards: [
      { title: 'نبض ثاخت', description: 'اخبار روزانه، اطلاعیه‌ها و گزارش‌های تحلیلی کوتاه.', href: '/media/news', image: IMG('icd-hub-media-news', 720, 960), cta: 'مشاهده آخرین اخبار', stat: { lead: 'بیش از', value: '850+', label: 'خبر و اطلاعیه' } },
      { title: 'روایت ثاخت', description: 'مقاله، پادکست و گفتگو با چهره‌های ملی.', href: '/media/stories', image: IMG('icd-hub-media-stories', 720, 960), cta: 'شنیدن و خواندن روایت‌ها', stat: { lead: 'بیش از', value: '60+', label: 'گفتگو و اپیزود پادکست' } },
      { title: 'کارنامه ثاخت', description: 'گزارش‌های تخصصی مدیریت بازار و پرسش‌وپاسخ.', href: '/media/reports', image: IMG('icd-hub-media-reports', 720, 960), cta: 'مطالعه گزارش‌های تخصصی', stat: { lead: 'بیش از', value: '40+', label: 'گزارش تحلیلی بازار' } },
    ],
  },
  process: {
    title: 'چگونه رسانه ثاخت را دنبال کنید',
    intro: 'پنج مسیر برای اینکه هیچ خبر، گفتگو یا گزارش تازه‌ای از هلدینگ را از دست ندهید.',
    image: IMG('icd-hub-media-process', 720, 1080),
    imageAlt: 'نشست خبری روابط عمومی هلدینگ ثاخت',
    badge: ['روابط عمومی ثاخت', 'در خدمت رسانه‌ها'],
    steps: [
      { icon: 'newspaper', title: 'نبض ثاخت: اخبار روزانه', body: 'تازه‌ترین رویدادهای پروژه‌ها، قراردادها و اطلاعیه‌های رسمی هلدینگ هر روز در نبض ثاخت منتشر می‌شود.' },
      { icon: 'mic', title: 'روایت ثاخت: گفتگو و پادکست', body: 'روایت‌های دست اول مدیران، مهندسان و سهامداران در قالب مقاله، گفتگوی ویدیویی و پادکست.' },
      { icon: 'chart', title: 'کارنامه ثاخت: گزارش‌های تخصصی', body: 'تحلیل بازار مسکن، سرمایه و ساخت‌وساز همراه با پرسش‌وپاسخ تخصصی مدیریت بازار.' },
      { icon: 'search', title: 'جستجو در آرشیو', body: 'همه اخبار و گزارش‌های منتشرشده بر اساس موضوع، پروژه و تاریخ قابل جستجو هستند.' },
      { icon: 'mail', title: 'ارتباط با روابط عمومی', body: 'برای درخواست مصاحبه، تصویر رسمی یا بیانیه مطبوعاتی با روابط عمومی هلدینگ در ارتباط باشید.' },
    ],
  },
  contact: {
    title: 'خبرنگار یا فعال رسانه‌ای هستید؟',
    body: 'برای دریافت بیانیه‌های مطبوعاتی و دعوت‌نامه نشست‌های خبری، ایمیل خود را ثبت کنید.',
    field: 'email',
    placeholder: 'پست الکترونیکی رسانه‌ای شما',
    button: 'عضویت در فهرست رسانه‌ها',
    success: 'ایمیل شما در فهرست رسانه‌های همکار ثبت شد.',
  },
}

export const clusterHubs: Record<ClusterHubKey, ClusterHubContent> = {
  about: aboutHub,
  sales: salesHub,
  ir: irHub,
  media: mediaHub,
}
