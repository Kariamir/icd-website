/**
 * Mock content for /about/history — placeholder pending the real WordPress
 * data layer (docs/decisions.md ADR-002).
 *
 * Structure follows `project_detail_page_template/05b_timeline_component`:
 * hero with KPI cards → sticky era filter → central-spine alternating
 * timeline (era badges, milestone cards with a per-item highlight widget,
 * and a supplementary note on the opposite side) → archival spotlight
 * gallery → dark booklet CTA strip. Accent colours are mapped onto the
 * token palette (`tone`) instead of the mockup's emerald/amber/indigo.
 */

/** Accent for an era badge / node — token-based only. */
export type TimelineTone = 'ink' | 'blue' | 'deep' | 'muted'

export type TimelineHighlight =
  | { kind: 'checks', items: string[] }
  | { kind: 'archive', label: string, value: string, year: string }
  | { kind: 'note', text: string }
  | { kind: 'meta', items: string[] }
  | { kind: 'stats', items: { value: string, label: string }[] }
  | { kind: 'registry', text: string }

export type TimelineAside =
  | { kind: 'note', title: string, text: string }
  | { kind: 'feature', badge: string, title: string, text: string }
  | { kind: 'card', title: string, text: string }
  | { kind: 'quote', text: string, cite: string }
  | { kind: 'caption', text: string }
  | { kind: 'pill', text: string }

export interface TimelineItemViewModel {
  id: string
  yearRange: string
  tag: string
  title: string
  body: string
  tone: TimelineTone
  highlight?: TimelineHighlight
  aside?: TimelineAside
  /** The founding milestone gets the anchored "base" node and emphasised card. */
  foundation?: boolean
}

export interface TimelineEraViewModel {
  id: string
  label: string
  yearRange: string
  description: string
  /** Label on the sticky era filter pill. */
  filterLabel: string
  tone: TimelineTone
  items: TimelineItemViewModel[]
}

export interface TimelineStatViewModel {
  value: string
  label: string
  accent?: boolean
}

export interface TimelineArchiveViewModel {
  year: string
  title: string
  text: string
  image: string
  tone: TimelineTone
}

export const timelineHero = {
  badge: 'روایت ۴۰ سال تعالی مهندسی و انضباط اجرایی',
  title: 'چهار دهه سازندگی، رهبری در صنعت ساختمان و توسعه نمادهای ملی',
  intro: 'از بنیان‌گذاری در سال ۱۳۶۴ با باور به دانش مهندسان ایرانی تا تکامل به یکی از بزرگ‌ترین هلدینگ‌های ساختمانی بورس اوراق بهادار تهران و بازوی توانمند سرمایه‌گذاری غدیر در تحول چهره شهری کشور.',
}

export const timelineStats: TimelineStatViewModel[] = [
  { value: '۴۰', label: 'سال پیشتازی مستمر سازمانی', accent: true },
  { value: '۵M+', label: 'مترمربع زیربنای اجراشده مگاپروژه‌ها' },
  { value: '۸', label: 'شرکت تخصصی و تابعه زنجیره ساخت', accent: true },
  { value: 'ICD1', label: 'نماد رسمی معتبر در بورس تهران' },
]

export const timelineEras: TimelineEraViewModel[] = [
  {
    id: 'era-1400',
    label: 'دوران نوین',
    yearRange: '۱۴۰۰ - ۱۴۰۳',
    description: 'هوشمندسازی، پایداری و سلامت سازه',
    filterLabel: 'دهه ۱۴۰۰ (عصر نوین و هوشمندسازی)',
    tone: 'ink',
    items: [
      {
        id: 'm-1403',
        yearRange: '۱۴۰۳ - ۱۴۰۲',
        tag: 'دستاوردهای مهندسی نوین',
        title: 'پیشگامی در ساختمان‌های پایدار سبز و سامانه پایش ژئوتکنیک بلادرنگ',
        body: 'ورود رسمی به حوزه ساخت‌وساز همگام با استانداردهای LEED و کاهش ۲۵ درصدی مصرف فولاد و انرژی در پروژه‌های تجاری و اقامتی. استقرار سیستم ابزاربندی ژئوتکنیک و مانیتورینگ آنلاین رفتار خاک در پروژه‌های کلان‌شهری.',
        tone: 'ink',
        highlight: { kind: 'checks', items: ['افتتاح درگاه دیده‌بان سهامدار', 'کدال شفاف و گزارشگری ESG'] },
        aside: { kind: 'note', title: 'شاخص محوری ۱۴۰۳:', text: 'تعهد به بازدهی متوازن سرمایه، شفافیت مالی بر بستر سامانه اختصاصی کدال و ارتقای حاکمیت شرکتی پایدار.' },
      },
    ],
  },
  {
    id: 'era-1390',
    label: 'عصر مگاپروژه‌ها',
    yearRange: '۱۳۹۰ - ۱۳۹۹',
    description: 'توسعه مگاپارس، برج‌های تجاری و گردشگری',
    filterLabel: 'دهه ۱۳۹۰ (توسعه مگاپروژه‌ها)',
    tone: 'blue',
    items: [
      {
        id: 'm-1398',
        yearRange: '۱۳۹۸ - ۱۳۹۵',
        tag: 'اجرای مهندسی سنگین',
        title: 'پیشرفت فازهای تکمیلی مگاپروژه تجاری-اداری مگاپارس تهران',
        body: 'پیشبرد یکی از بزرگ‌ترین پروژه‌های تجاری سبز منطقه با زیربنای ۲۱۵,۰۰۰ مترمربع، فناوری سازه‌های فولادی-بتنی مرکب و سازگار با سیستم‌های تصفیه بازچرخانی آب و اکسیژن‌رسانی پویا.',
        tone: 'blue',
        highlight: { kind: 'archive', label: 'پروژه آ.اس.پ مشهد', value: 'تحویل فاز مسکونی ۸۵,۰۰۰ متری', year: 'سال ۱۳۹۶' },
        aside: { kind: 'feature', badge: 'BMS', title: 'سیستم‌های هوشمند یکپارچه ساختمانی', text: 'پیاده‌سازی نخستین سیستم جامع مدیریت بهینه انرژی و پایش تأسیسات در هتل‌آپارتمان‌های تجاری.' },
      },
      {
        id: 'm-1391',
        yearRange: '۱۳۹۱ - ۱۳۸۹',
        tag: 'توسعه گردشگری و اقامتی',
        title: 'پهنه‌بندی مجتمع‌های گردشگری کیش و نوار ساحلی شمال',
        body: 'ورود به احداث پروژه‌های تفریحی-اقامتی در مناطق آزاد تجاری نظیر پروژه «رویای کیش» و دهکده‌های گردشگری اقامتی شمال کشور با سازه‌های مقاوم در برابر اقلیم مرطوب.',
        tone: 'deep',
        highlight: { kind: 'note', text: 'رعایت الزامات مقاومتی در رطوبت ساحلی ۹۵٪' },
        aside: { kind: 'card', title: 'پروژه رویای کیش', text: 'احداث مجتمع مسکونی و تفریحی با دید مستقیم خلیج فارس، مهندسی بتن ضدسولفات و تکنولوژی سقف‌های دال مجوف.' },
      },
    ],
  },
  {
    id: 'era-1380',
    label: 'ورود به بازار سرمایه',
    yearRange: '۱۳۸۰ - ۱۳۸۹',
    description: 'پذیرش در بورس تهران و شفافیت مالی سهامداری',
    filterLabel: 'دهه ۱۳۸۰ (ورود به بورس تهران)',
    tone: 'deep',
    items: [
      {
        id: 'm-1383',
        yearRange: '۱۳۸۳ - ۱۳۸۲',
        tag: 'نقطه عطف تاریخی',
        title: 'پذیرش رسمی در بورس اوراق بهادار تهران با نماد «ثاخت»',
        body: 'تبدیل ماهیت شرکت به سهامی عام و عرضه سهام در تالار بورس تهران به عنوان یکی از معتبرترین سهام ساختمانی کشور و ایجاد سرمایه در گردش پرقدرت برای مگاپروژه‌ها.',
        tone: 'deep',
        highlight: { kind: 'meta', items: ['نماد معاملاتی: ICD1', 'گروه: انبوه‌سازی، املاک و مستغلات'] },
        aside: { kind: 'note', title: 'شفافیت معاملاتی نماد ICD1:', text: 'پذیرش شرکت در بورس اوراق بهادار تهران آغازگر دورانی نوین در گزارشگری دوره‌ای، رعایت استانداردهای حسابرسی و ایجاد اعتماد میان سهامداران خرد و حقوقی بود.' },
      },
    ],
  },
  {
    id: 'era-1370',
    label: 'دوران پروژه‌های نمادین',
    yearRange: '۱۳۷۰ - ۱۳۷۹',
    description: 'برج بین‌المللی تهران و شرکت‌های تخصصی',
    filterLabel: 'دهه ۱۳۷۰ (پروژه‌های شاخص)',
    tone: 'ink',
    items: [
      {
        id: 'm-1375',
        yearRange: '۱۳۷۹ - ۱۳۷۵',
        tag: 'نماد معماری معاصر',
        title: 'آغاز عملیات احداث برج بین‌المللی تهران (TIT)',
        body: 'طراحی و آغاز یکی از بزرگ‌ترین برج‌های مسکونی ایران با ۵۶ طبقه در تقاطع بزرگراه حکیم و کردستان؛ به‌کارگیری دیوار برشی بتنی، میراگرهای لرزه‌ای و اجرای عمیق‌ترین گودبرداری مهندسی زمان خود.',
        tone: 'blue',
        highlight: { kind: 'stats', items: [{ value: '۵۶', label: 'طبقه سازه‌ای' }, { value: '۲۲۰,۰۰۰', label: 'مترمربع زیربنا' }] },
        aside: { kind: 'quote', text: '«برج تهران فراتر از یک مجتمع مسکونی، نماد خودباوری مهندسی ایران و نمایش توان فنی هلدینگ در پروژه‌های بلندمرتبه‌سازی بود.»', cite: '— اسناد آرشیو مهندسی هلدینگ ثاخت (۱۳۷۶)' },
      },
      {
        id: 'm-1372',
        yearRange: '۱۳۷۲ - ۱۳۶۹',
        tag: 'تکوین ساختار سازمانی',
        title: 'پایه‌گذاری شرکت‌های تخصصی زنجیره ارزش ساخت‌وساز',
        body: 'تاسیس شرکت‌های اقماری و تابعه تخصصی شامل شرکت‌های مهندسی ژئوتکنیک، طراحان مشاور، بازرگانی مصالح ساختمانی نوین و شرکت‌های مدیریت و بهره‌برداری املاک.',
        tone: 'muted',
        aside: { kind: 'caption', text: 'توسعه ساختار هلدینگی چندرشته‌ای' },
      },
    ],
  },
  {
    id: 'era-1364',
    label: 'نقطه آغازین',
    yearRange: '۱۳۶۴',
    description: 'تاسیس شرکت بین‌المللی توسعه ساختمان',
    filterLabel: '۱۳۶۴ (آغاز و تاسیس)',
    tone: 'ink',
    items: [
      {
        id: 'm-1364',
        yearRange: '۱۳۶۴/۰۲/۱۵',
        tag: 'سند بنیادین تاسیس',
        title: 'تاسیس شرکت با آرمان آبادانی میهن و تکیه بر انضباط مهندسی',
        body: 'ثبت رسمی شرکت با هدف تامین نیازهای زیرساختی، بلندمرتبه‌سازی مهندسی، انضباط محاسباتی و تضمین کیفیت پایدار در چرخه‌های بلندمدت عمر پروژه‌ها.',
        tone: 'ink',
        foundation: true,
        highlight: { kind: 'registry', text: 'ثبت در اداره کل ثبت شرکت‌ها و موسسات غیرتجاری تهران' },
        aside: { kind: 'pill', text: 'آغاز ۴۰ سال خدمات شایسته به جامعه عمرانی ایران' },
      },
    ],
  },
]

export const timelineArchive = {
  title: 'گنجینه تصویری و اسناد تاریخی ثاخت',
  intro: 'اسناد افتخار، لوح‌های سپاس و لحظات ماندگار مهندسی از چهار دهه فعالیت میدانی',
  items: [
    { year: 'سال ۱۳۷۶', title: 'بتن‌ریزی فونداسیون برج تهران', text: 'ثبت رکورد بتن‌ریزی مداوم فوق‌مقاوم و خودتراکم در پی عمیق پروژه نمادین پایتخت با حضور مهندسان برجسته کشور.', image: 'https://picsum.photos/seed/icd-archive-1376/960/540', tone: 'ink' },
    { year: 'سال ۱۳۸۳', title: 'زنگ آغاز معاملات تالار بورس', text: 'مراسم گشایش نماد معاملاتی ثاخت در تالار بورس تهران به عنوان پیشگام شرکت‌های انبوه‌سازی و املاک.', image: 'https://picsum.photos/seed/icd-archive-1383/960/540', tone: 'blue' },
    { year: 'سال ۱۴۰۲', title: 'تندیس ملی بتن برتر و سازه مقاوم', text: 'اهدای نشان زرین انجمن بتن ایران جهت دستیابی به بالاترین استاندارد پایایی بتن در مگاپروژه‌های تجاری.', image: 'https://picsum.photos/seed/icd-archive-1402/960/540', tone: 'deep' },
  ] satisfies TimelineArchiveViewModel[],
}

export const timelineCta = {
  badge: 'کتابچه رسمی مستندات تاریخی',
  title: 'علاقه‌مند به دریافت نسخه کامل کتابچه تاریخچه و کارنامه ۴۰ ساله ثاخت هستید؟',
  text: 'نسخه دیجیتال شامل مشخصات فنی تفصیلی مگاپروژه‌ها، نمودارهای رشد سرمایه، دستاوردهای حاکمیت شرکتی و گفت‌وگو با بنیان‌گذاران مهندسی هلدینگ.',
  primary: { label: 'دریافت کتابچه ۴۰ سالگی (PDF)', href: '/media/reports' },
  secondary: { label: 'مشاهده چارت سازمانی و مدیران', href: '/about/org-chart' },
}
