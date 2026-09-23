/**
 * Mock content for static editorial pages (/about/vision, /about/csr,
 * /legal/terms, /legal/privacy) — placeholder pending the real WordPress
 * data layer (docs/decisions.md ADR-002).
 */
export interface EditorialSectionViewModel {
  id: string
  heading: string
  bodyHtml: string
}

export interface EditorialPageViewModel {
  eyebrow?: string
  title: string
  intro: string
  sections: EditorialSectionViewModel[]
}

export const visionPage: EditorialPageViewModel = {
  eyebrow: 'چشم‌انداز و ماموریت',
  title: 'چشم‌انداز، ماموریت و ارزش‌های هلدینگ ثاخت',
  intro: 'شرکت بین‌المللی توسعه ساختمان (ثاخت) با تکیه بر چهار دهه فعالیت پیوسته، پیشرفته‌ترین بسترهای مهندسی ژئوتکنیک، طراحی سازه‌های فوق‌سنگین و توسعه پایدار املاک را در مقیاس ملی رهبری می‌کند.',
  sections: [
    {
      id: 'mission',
      heading: 'ماموریت',
      bodyHtml: '<p>خلق ارزش پایدار برای سهامداران، مشتریان و جامعه از طریق مهندسی دقیق، شفافیت مالی و تعهد به بالاترین استانداردهای کیفیت ساخت.</p>',
    },
    {
      id: 'vision',
      heading: 'چشم‌انداز',
      bodyHtml: '<p>تثبیت جایگاه ثاخت به‌عنوان مرجع مهندسی و سرمایه‌گذاری ساختمانی در سطح منطقه، با تمرکز بر مگاپروژه‌های چندمنظوره و فناوری‌های نوین ساخت.</p>',
    },
    {
      id: 'values',
      heading: 'ارزش‌های بنیادین',
      bodyHtml: '<ul><li>انضباط مهندسی و کنترل کیفیت در تمامی مراحل اجرا</li><li>شفافیت مالی و پایبندی به اصول حاکمیت شرکتی</li><li>ایمنی مطلق کارگاهی و مسئولیت اجتماعی</li><li>نوآوری مستمر در فناوری‌های ساخت</li></ul>',
    },
  ],
}

export const csrPage: EditorialPageViewModel = {
  eyebrow: 'مسئولیت اجتماعی و پایداری',
  title: 'مسئولیت اجتماعی و پایداری (ESG)',
  intro: 'هلدینگ ثاخت گزارش‌گری پایداری خود را بر مبنای استانداردهای زیست‌محیطی، اجتماعی و حاکمیت شرکتی (ESG) تنظیم می‌کند.',
  sections: [
    {
      id: 'environment',
      heading: 'محیط زیست',
      bodyHtml: '<p>کاهش مصرف انرژی و فولاد در پروژه‌های تجاری و اقامتی از طریق مدل‌سازی عددی پیشرفته و استانداردهای ساختمان سبز.</p>',
    },
    {
      id: 'social',
      heading: 'جامعه',
      bodyHtml: '<p>مشارکت در طرح‌های عمرانی و اشتغال‌زایی محلی در مناطق فعالیت پروژه‌های هلدینگ.</p>',
    },
    {
      id: 'governance-esg',
      heading: 'حاکمیت',
      bodyHtml: '<p>گزارش‌گری ادواری در چارچوب سامانه کدال و رویه‌های کنترل داخلی مصوب هیات‌مدیره.</p>',
    },
  ],
}

export const legalTermsPage: EditorialPageViewModel = {
  title: 'قوانین و شرایط استفاده',
  intro: 'استفاده از وب‌سایت هلدینگ ساختمانی ثاخت به منزله پذیرش شرایط زیر است.',
  sections: [
    {
      id: 'usage',
      heading: 'شرایط استفاده',
      bodyHtml: '<p>محتوای این وب‌سایت صرفاً جهت اطلاع‌رسانی عمومی ارائه شده و جایگزین مشاوره حقوقی یا مالی رسمی نیست.</p>',
    },
    {
      id: 'ip',
      heading: 'مالکیت معنوی',
      bodyHtml: '<p>تمامی حقوق مادی و معنوی محتوای این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) است.</p>',
    },
  ],
}

export const legalPrivacyPage: EditorialPageViewModel = {
  title: 'حریم خصوصی',
  intro: 'هلدینگ ثاخت به حریم خصوصی کاربران و سهامداران خود متعهد است.',
  sections: [
    {
      id: 'collection',
      heading: 'جمع‌آوری اطلاعات',
      bodyHtml: '<p>اطلاعات ارسالی از طریق فرم‌های تماس، مشاوره و شکایات صرفاً برای پاسخگویی به همان درخواست استفاده می‌شود.</p>',
    },
    {
      id: 'protection',
      heading: 'حفاظت از داده‌ها',
      bodyHtml: '<p>دسترسی به اطلاعات شخصی محدود به کارکنان مسئول رسیدگی به همان درخواست است و با اشخاص ثالث به اشتراک گذاشته نمی‌شود.</p>',
    },
  ],
}
