/**
 * The site's single content catalog: companies, projects and sale units
 * (ADR-015).
 *
 * Until WordPress is connected (ADR-002) every listing and every detail page
 * reads from here, so a card and the page it opens can never disagree. When
 * the WPNuxt queries land, these arrays become the shape the queries map to.
 *
 * Sources — the client's own data, not samples (ADR-017).
 *  - Companies and projects are generated from the green tabs of
 *    `Asset Icd/اطلاعات جهت آپلود سایت.xlsx`: ten subsidiaries and the ten
 *    projects the client listed. Logos and photographs come from the same
 *    folder.
 *  - `holdingShare` is normalised: the workbook mixes fractions (0.9999),
 *    percentages (100, 3) and one string ('99/99%'). Values at or below 1 are
 *    read as fractions, anything above as a percentage already.
 *    ⛔ EVERY ONE OF THESE NEEDS CONFIRMING by shareholder affairs before
 *    launch — a listed holding publishing the wrong stake in a subsidiary is
 *    a disclosure error, not a typo.
 *  - `employees` is not in the workbook and is therefore absent, not invented.
 *    The company page hides the row when it is missing.
 *
 * Relationships (ADR-011): every project names exactly one owner company, and
 * every company page lists that company's projects. Every unit names its
 * project.
 */
import { ph, type PhKind } from '~/utils/media'

// ─────────────────────────────────────────────────────────────── companies

export interface Company {
  slug: string
  name: string
  /** Large monogram on the tile. */
  mark: string
  /** Small Latin line under the monogram. */
  markSub: string
  /** Short tag on the tile corner — a market symbol or a specialism. */
  tag: string
  isListed?: boolean
  specialty: string
  founded: number
  /** Holding's share of the company, percent. See the note at the top. */
  holdingShare: number
  ceo: string
  chair?: string
  /** Not supplied by the client; the company page hides the row when absent. */
  employees?: number
  city: string
  phone?: string
  address?: string
  /** Registered capital, billion rials. */
  capitalBnRial?: number
  /** Transparent PNG of the company's own mark. */
  logo?: string
  summary: string
  about: string[]
  image: string
}

export const companies: Company[] = [
  {
    slug: 'icd-engineering', name: 'مهندسی و مدیریت ساخت ثاخت', mark: 'ثاخت', markSub: 'ICD ENGINEERING',
    tag: 'سهامی خاص',
    specialty: 'مهندسی و مدیریت طرح', founded: 1385, holdingShare: 100.0,
    ceo: 'مهندس کوروش افشار',
    city: 'تهران',
    
    capitalBnRial: 250,
    summary: 'ارائه خدمات مدیریت طرح (MC)، بازرسی فنی مصالح، ژئوتکنیک و بهینه‌سازی سیستم‌های تاسیساتی هلدینگ.',
    about: [
      'ارائه خدمات مدیریت طرح (MC)، بازرسی فنی مصالح، ژئوتکنیک و بهینه‌سازی سیستم‌های تاسیساتی هلدینگ.',
    ],
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'asp', name: 'آ.س.پ', mark: 'A.S.P', markSub: 'A.S.P CONSTRUCTION',
    tag: 'فرابورس ایران', isListed: true,
    specialty: 'انبوه‌سازی و ساخت', founded: 1348, holdingShare: 39.35,
    ceo: 'امید خالقی', chair: 'رحمت اله احمدی',
    city: 'تهران', phone: '88881363-4',
    address: 'تهران، خیابان ولیعصر، پایین تر از میدان ونک، خیابان شهید عباسپور (توانیر سابق)، پلاک 16',
    capitalBnRial: 1000,
    summary: 'شرکت آ س پ، در تاریخ 1348/05/11 در اداره ثبت شرکت ها و مؤسسات غیرتجاری تهران با شماره 13681 به ثبت رسید. براساس مصوبه مجمع عمومی فوق العاده مورخ 1390/02/05 به سهامی عام تبدیل شد و در تاریخ…',
    about: [
      'شرکت آ س پ، در تاریخ 1348/05/11 در اداره ثبت شرکت ها و مؤسسات غیرتجاری تهران با شماره 13681 به ثبت رسید.',
      'براساس مصوبه مجمع عمومی فوق العاده مورخ 1390/02/05 به سهامی عام تبدیل شد و در تاریخ 1390/04/22 نزد سازمان بورس و اوراق بهادار ثبت و 10 درصد سهام شرکت از طریق فرابورس عرضه گردید.',
    ],
    logo: '/img/companies/asp.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'tisa-kish', name: 'تیساکیش', mark: 'تیسا', markSub: 'TISA KISH',
    tag: 'سهامی خاص',
    specialty: 'انبوه‌سازی و ساخت', founded: 1383, holdingShare: 99.99,
    ceo: 'عبدالرضا امینائی چترودی', chair: 'مجتبی قنبری',
    city: 'تهران', phone: '88538608-10',
    address: 'تهران، میدان آرژانتین، خیابان احمد قصیر (بخارست)، خیابان هشتم، پلاک 11، طبقه 1',
    capitalBnRial: 700,
    summary: 'موضوع فعالیت طبق ماده 2 اساسنامه به شرح زیر است: 1) سرمایه گذاری در جزیره کیش در قالب ساخت و ساز اماکن مسکونی، تجاری، خدماتی، اداری، سیاحتی،ورزشی…',
    about: [
      'شرکت تیساکیش در تاریخ 1383/03/12 به صورت سهامی خاص تأسیس گردید و طی شماره 2216 در اداره ثبت شرکت ها و مالکیت صنعتی جزیره کیش به ثبت رسیده است. مرکز اصلی شرکت در جزیره کیش بوده و در زمره شرکت های تابعه شرکت بين المللي توسعه ساختمان (سهامي عام) می باشد.',
      'این شرکت هم اکنون به ساخت و ساز مجتمع های تجاری و مسکونی در جزیره کیش به صورت سرمایه گذاری و پیمانکاری مشغول می باشد.',
    ],
    logo: '/img/companies/tisa-kish.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'pars-sazeh', name: 'پارس سازه', mark: 'پارس سازه', markSub: 'PARS SAZEH',
    tag: 'سهامی خاص',
    specialty: 'مهندسی و مدیریت طرح', founded: 1330, holdingShare: 99.99,
    ceo: 'علیرضا افشردی', chair: 'قاسم عابدی',
    city: 'تهران', phone: '88524717',
    address: 'تهران، میدان آرژانتین، خیابان احمد قصیر (بخارست)، خیابان هشتم، پلاک 11، طبقه 5',
    capitalBnRial: 914,
    summary: 'موضوع فعالیت طبق ماده 2 اساسنامه به شرح زیر است: 1) فعالیت های راهسازی، ساختمان سازی 2) تولید و فروش آسفالت و انجام امور مربوط به صنایع نفت و گاز و پتروشیمی و تجهیزات آن',
    about: [
      '',
      'شرکت مهندسی و ساخت پارس سازه در تاریخ 1330/11/01 تحت نام "شرکت مقاطعه کاری مجم" و به شماره ثبت 3673 در زمینه فعالیت های راهسازی و سد سازی در اداره ثبت شرکت ها و مالکیت صنعتی در تهران به ثبت رسید و طی سال های متمادی در احداث راه های اصلی کشور از جمله تأمین آسفالت جاده کرج - چالوس، کرمان - بندر عباس، قزوین- زنجان و...',
    ],
    logo: '/img/companies/pars-sazeh.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'peyman-ghadir', name: 'پیمان غدیر', mark: 'پیمان غدیر', markSub: 'PEYMAN GHADIR',
    tag: 'سهامی خاص',
    specialty: 'مهندسی و مدیریت طرح', founded: 1367, holdingShare: 99.99,
    ceo: 'حمیدرضا خوشدل مفیدی', chair: 'احسان مشتاق',
    city: 'تهران', phone: '88538591-5',
    address: 'تهران، میدان آرژانتین، خیابان احمد قصیر (بخارست)، خیابان هشتم، پلاک 11، طبقه 4',
    capitalBnRial: 10,
    summary: 'فعالیت اصلی بر طبق اصلاحیه ماده 2 اساسنامه ، عبارت است از خرید و تهیه ملک و زمین به منظور احداث ساختمان های شهرک…',
    about: [
      'شرکت پیمان غدیر در سال 1367 به عنوان شرکت ساختمانی و تأسیساتی در اداره ثبت شرکت ها و مالکیت صنعتی تهران به شماره 70919 به ثبت رسید.',
      'هم اکنون شرکت به عنوان یکی از شرکت های تابعه شرکت بین المللی توسعه ساختمان(سهامی عام) در زمینه طراحی و معماری و همچنین نظارت بر پروژه های ساختمانی شرکت های همگروه و خارج از مجموعه در حال فعالیت می باشد.',
    ],
    logo: '/img/companies/peyman-ghadir.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'ofogh-saze-paya', name: 'افق سازه پایا', mark: 'افق سازه', markSub: 'OFOGH SAZE PAYA',
    tag: 'سهامی خاص',
    specialty: 'بهره‌برداری و نگهداری', founded: 1387, holdingShare: 98.0,
    ceo: 'سعید شکاری', chair: 'اسماعیل اسدی',
    city: 'خراسان رضوی', phone: '051-38482556',
    address: 'خراسان رضوی، شهرستان مشهد، بخش مرکزی مشهد، بهشت، خیابان پاستونو، پلاک 170-برج مریم طبقه 1-واحد 1',
    capitalBnRial: 100,
    summary: 'طبق ماده 2 اساسنامه موضوع فعالیت عبارت است از: 1) تهیه و خرید زمین و ملک به منظور احداث هر نوع ساختمان با کاربری های مختلف و امکانات وابسته به صورت شهرک…',
    about: [
      'شرکت افق سازه پایا در تاریخ 1387/10/24 در اداره کل ثبت اسناد و املاک استان گیلان به ثبت رسید و در تاریخ 1389/09/27 مرکز اصلی شرکت به تهران منتقل شد و با شماره 391639 ثبت و اقامتگاه قانونی شرکت به آدرس مشهد، بزرگراه شهید کلانتری، مجتمع آباد گران انتقال یافت.',
      'این شرکت دارای رتبه ارشد انبوه سازی می باشد و با هدف سرمایه گذاری در پروژه های پربازده ساختمانی در مشهد مقدس آغاز به کار نموده است.',
    ],
    logo: '/img/companies/ofogh-saze-paya.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'sarpanah-fars', name: 'سرپناه فارس', mark: 'سرپناه', markSub: 'SARPANAH FARS',
    tag: 'سهامی خاص',
    specialty: 'بهره‌برداری و نگهداری', founded: 1363, holdingShare: 97.95,
    ceo: 'میثم باقری', chair: 'علیرضا افشردی',
    city: 'تهران', phone: '021-87123 داخلی:1609',
    address: 'تهران، میدان آرژانتین، خیابان احمد قصیر (بخارست)، خیابان هشتم، پلاک 11، طبقه 3',
    capitalBnRial: 30,
    summary: 'موضوع فعالیت طبق ماده 2 اساسنامه عبارت است از: 1) تهیه زمین و مشاوره در عملیات و امور ساختمانی و صنعتی، اجرای طرح های ساختمانی اعم از شهرک سازی، مجتمع سازی…',
    about: [
      'شرکت سرپناه فارس در تاریخ 1363/04/06 تحت شماره 2555 در اداره ثبت شرکت های شیراز به ثبت رسید. سهامدار اولیه آن بانک های صادرات فارس، بوشهر و کهکیلویه و بویر احمد بوده اند و در حال حاضر سهامدار عمده آن شرکت بین المللی توسعه ساختمان است.',
      'این شرکت با 33 سال سابقه در صنعت ساختمان نامی آشنا در استان فارس و استان های همجوار است و پروژه های ساختمانی متعددی را در این استان اجرا نموده است.',
    ],
    logo: '/img/companies/sarpanah-fars.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'ghadir-khuzestan', name: 'غدیر خوزستان', mark: 'غدیر', markSub: 'GHADIR KHUZESTAN',
    tag: 'سهامی خاص',
    specialty: 'بهره‌برداری و نگهداری', founded: 1367, holdingShare: 99.99,
    ceo: 'علی بهاری',
    city: 'اهواز', phone: '061-33920198-9',
    address: 'اهواز، کیلومتر 7 جاده اهواز-اندیمشک، کیلومتر 2 جاده تصفیه نیشکر',
    capitalBnRial: 50,
    summary: 'طبق ماده 2 اساسنامه موضوع فعالیت عبارت است از: 1) تهیه و خرید زمین و ملک به منطور احداث هر نوع ساختمان و شهرک با کاربری های مختلف 2) انجام امور بازاریابی و مدیریت بازار به منظور فروش و…',
    about: [
      'شرکت توسعه صنعت فاضلاب ایران در تاریخ 1367/8/24 در اداره ثبت شرکت ها و مالکیت اهواز به شماره 2532/2459 به ثبت رسیده است. نام شرکت در تاریخ 1388/06/28 به توسعه صنعت ساختمان غدیر خوزستان تغییر یافت.',
      'شخصیت حقوقی شرکت در 1389/10/23 به سهامی عام تغییر یافت و مجدداً طبق مصوبه 1394/01/29 به سهامی خاص تبدیل گردید. این شرکت هم اکنون در زمینه تولید بلوک های سیمانی و لوله های بتنی در شهر اهواز فعال می باشد.',
    ],
    logo: '/img/companies/ghadir-khuzestan.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'aria-omran-pars', name: 'طرح و توسعه آریا عمران پارس', mark: 'آریا عمران', markSub: 'ARIA OMRAN PARS',
    tag: 'بورس تهران', isListed: true,
    specialty: 'انبوه‌سازی و ساخت', founded: 1387, holdingShare: 3.0,
    ceo: 'دکتر سعید نظری', chair: 'مرتضی رحمان زاده',
    city: 'تهران', phone: '77504189',
    address: 'تهران، خیابان خواجه نصیرالدین طوسی، کوچه شهید محمد مستقیمی، خیابان خواجه نصیرالدین غربی، پلاک 206',
    capitalBnRial: 6492071,
    summary: 'شرکت طرح و توسعه آریا عمران پارس در تاریخ 1387/12/13 تحت شماره 346742 به عنوان شرکت پروژه مجری مجتمع چندمنظوره تجاری- تفریحی مگاپارس در اداره ثبت شرکت های صنعتی تهران به ثبت رسید…',
    about: [
      '',
      'طبق ماده 3 اساسنامه، موضوع فعالیت شرکت طرح و توسعه آریا عمران پارس عبارت است از: ساخت و تکمیل و خرید و فروش و عملیات پیمانکاری و بهره برداری و اجاره و نگهداری و مدیریت پیمان پروژه ها و مجتمع های اداری تجاری مسکونی و چند منظوره مشتمل بر بندهای 1 الی 10 تصریح شده اساسنامه شرکت 1) سرمایه گذاری در امور اقتصادی اعم از تولیدی، صنعتی، تجاری، کشاورزی، خدماتی، پیمانکاری، انبوه سازی، ساخت و ساز و نظایر آن و مبادرت به عملیات مربوطه 2) خرید و واردات و تامین هرگونه مصالح مواد اولیه و ماشین آلات مرتبط با عملیات فوق 3) فروش و صادرات محصولات مصنوعات و خدمات حاصل از موارد فوق 4) خرید و فروش هرگونه کالای مجاز بازرگانی و همچنین تاسیس، تکمیل، توسعه ، نظارت فنی و اداره در ساخت انواع ابنیه و تاسیسات 5) سرمایه گذاری، مشارکت، همکاری و تبادل اطلاعات علمی، فنی، مهندسی و بازرگانی مجاز با سایر شرکت ها و سایر اشخاص حقیقی و حقوقی داخل و خارجی و واجد صلاحیت فنی و اقتصادی .',
    ],
    logo: '/img/companies/aria-omran-pars.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
  {
    slug: 'baghmisheh', name: 'شهرسازی و خانه سازی باغمیشه', mark: 'باغمیشه', markSub: 'BAGHMISHEH',
    tag: 'بورس تهران', isListed: true,
    specialty: 'انبوه‌سازی و ساخت', founded: 1364, holdingShare: 0.39,
    ceo: 'یوسف عطاری خسروشاهی', chair: 'مظفر سلیمانی',
    city: 'تبریز', phone: '041-33293400',
    address: 'تبریز، کوی ولیعصر، فلکه تختی(تختي شرقي)، نبش خ بوعلی سینا، پ 58',
    capitalBnRial: 2640000,
    summary: 'آغاز حركت به سمت توسعه صنعت ساختمان در كلان شهر تبريز و نياز به ايجاد شهرك هاي مدرن و كمك به ايجاد اشتغال پيوسته در منطقه…',
    about: [
      '',
      'موضوع فعالیت طبق ماده 2 اساسنامه عبارت است از: الف)موضوعات اصلی: 1) خرید و فروش تهیه ملک و زمین به منظور احداث ساختمان و شهرک و مجتمع های مسکونی، تجاری و خدماتی 2) تاسیس کارخانجات و احداث هر نوع ساختمان در داخل و خارج از کشور 3) خرید و احداث و اجاره هر نوع کارخانه و مشارکت و سرمایه گذاری در کارخانجات تولید مصالح ساختمانی 4) و خرید، فروش و اجاره ابزار و ماشین آلات ساختمانی و راهسازی و مصالح در داخل و خارج از کشور.',
    ],
    logo: '/img/companies/baghmisheh.png',
    image: '/img/projects/tehran-international-tower-1.jpg',
  },
]

export function getCompany(slug: string) {
  return companies.find(c => c.slug === slug)
}

// ──────────────────────────────────────────────────────────────── projects

export type ProjectStatusKey = 'upcoming' | 'under-construction' | 'operating' | 'completed'

export const projectStatus: Record<ProjectStatusKey, { label: string, href: string, short: string }> = {
  'upcoming': { label: 'پروژه‌های آتی', short: 'آتی', href: '/projects/upcoming' },
  'under-construction': { label: 'پروژه‌های در حال ساخت', short: 'در حال ساخت', href: '/projects/under-construction' },
  'operating': { label: 'پروژه‌های در حال بهره‌برداری', short: 'در حال بهره‌برداری', href: '/projects/operating' },
  'completed': { label: 'پروژه‌های تکمیل‌شده', short: 'تکمیل‌شده', href: '/projects/completed' },
}

export interface Project {
  slug: string
  name: string
  nameEn?: string
  status: ProjectStatusKey
  company: string
  city: string
  district: string
  usage: string
  areaSqm: number
  floors: number
  /** Number of residential/commercial units, when the project sells units. */
  units?: number
  /** Solar-hijri year: start for upcoming/under-construction, delivery otherwise. */
  year: number
  progress?: number
  excerpt: string
  image: string
  /** Every photograph the client supplied for this project. */
  gallery?: string[]
  /** Position on the stylised national map, percent of width/height. */
  map: { x: number, y: number }
  featured?: boolean
  origin: 'site' | 'design'
}

export const projects: Project[] = [
  {
    slug: 'tehran-international-tower', name: 'برج بین‌المللی تهران', nameEn: 'Tehran International Tower',
    status: 'under-construction', company: 'icd-engineering',
    city: 'منطقه ۱', district: 'تهران، بزرگراه شهید همت، تقاطع کردستان',
    usage: 'تجاری، اداری و مسکونی',
    areaSqm: 42000, floors: 56, units: 572,
    year: 1402, progress: 68,
    excerpt: 'بلندترین برج چندمنظوره پایتخت با ترکیب فضاهای تجاری، اداری و مسکونی.',
    image: '/img/projects/tehran-international-tower-1.jpg',
    gallery: ['/img/projects/tehran-international-tower-1.jpg', '/img/projects/tehran-international-tower-2.jpg', '/img/projects/tehran-international-tower-3.jpg', '/img/projects/tehran-international-tower-4.jpg', '/img/projects/tehran-international-tower-5.jpg', '/img/projects/tehran-international-tower-6.jpg', '/img/projects/tehran-international-tower-7.jpg'],
    map: { x: 50, y: 34 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'narenjestan-izadshahr', name: 'مجتمع تجاری-فرهنگی نارنجستان', nameEn: 'Narenjestan Cultural Commercial Complex',
    status: 'under-construction', company: 'icd-engineering',
    city: 'شهر ایزدشهر', district: 'استان مازندران، شهر ایزدشهربلوار نفت',
    usage: 'چندمنظوره تجاری و اداری',
    areaSqm: 106490, floors: 0,
    year: 1387,
    excerpt: 'چندمنظوره تجاری و اداری',
    image: '/img/projects/narenjestan-izadshahr-1.jpg',
    gallery: ['/img/projects/narenjestan-izadshahr-1.jpg', '/img/projects/narenjestan-izadshahr-2.jpg'],
    map: { x: 56, y: 22 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'roya-elite', name: 'رویا الیت', nameEn: 'Roya Elite',
    status: 'under-construction', company: 'icd-engineering',
    city: 'جزیره کیش', district: 'استان هرمزگان، جزیره کیش ساخل مرجان',
    usage: 'برج‌ها و مجموعه‌های مسکونی',
    areaSqm: 19600, floors: 14,
    year: 1405,
    excerpt: 'برج‌ها و مجموعه‌های مسکونی',
    image: '/img/projects/roya-elite-1.jpg',
    gallery: ['/img/projects/roya-elite-1.jpg', '/img/projects/roya-elite-2.jpg', '/img/projects/roya-elite-3.jpg', '/img/projects/roya-elite-4.jpg', '/img/projects/roya-elite-5.jpg', '/img/projects/roya-elite-6.jpg', '/img/projects/roya-elite-7.jpg', '/img/projects/roya-elite-8.jpg'],
    map: { x: 58, y: 88 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'ara-tower', name: 'برج آرا', nameEn: 'Ara Tower',
    status: 'under-construction', company: 'icd-engineering',
    city: 'جزیره کیش', district: 'استان هرمزگان، جزیره کیش ساخل مرجان',
    usage: 'برج‌ها و مجموعه‌های مسکونی',
    areaSqm: 15200, floors: 16,
    year: 1390, progress: 43,
    excerpt: 'برج‌ها و مجموعه‌های مسکونی',
    image: '/img/projects/ara-tower-1.jpg',
    gallery: ['/img/projects/ara-tower-1.jpg', '/img/projects/ara-tower-2.jpg', '/img/projects/ara-tower-3.jpg', '/img/projects/ara-tower-4.jpg', '/img/projects/ara-tower-5.jpg'],
    map: { x: 58, y: 88 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'kia-tower', name: 'برج کیا', nameEn: 'Kia Tower',
    status: 'under-construction', company: 'icd-engineering',
    city: 'جزیره کیش', district: 'استان هرمزگان، جزیره کیش ساخل مرجان',
    usage: 'برج‌ها و مجموعه‌های مسکونی',
    areaSqm: 15200, floors: 16,
    year: 1390, progress: 34,
    excerpt: 'برج‌ها و مجموعه‌های مسکونی',
    image: '/img/projects/kia-tower-1.jpg',
    gallery: ['/img/projects/kia-tower-1.jpg', '/img/projects/kia-tower-2.jpg', '/img/projects/kia-tower-3.jpg'],
    map: { x: 58, y: 88 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'nbo12', name: 'NBO12', nameEn: 'NBO12',
    status: 'under-construction', company: 'icd-engineering',
    city: 'جزیره کیش', district: 'استان هرمزگان، جزیره کیش ساخل مرجان',
    usage: 'چندمنظوره تجاری و اداری',
    areaSqm: 1698, floors: 6,
    year: 1403, progress: 80,
    excerpt: 'چندمنظوره تجاری و اداری',
    image: '/img/projects/nbo12-1.jpg',
    gallery: ['/img/projects/nbo12-1.jpg', '/img/projects/nbo12-2.jpg', '/img/projects/nbo12-3.jpg', '/img/projects/nbo12-4.jpg'],
    map: { x: 58, y: 88 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'sparrow-rasht', name: 'مجتمع تجاری و اداری اسپارو', nameEn: 'Sparrow Business and Office Complex',
    status: 'under-construction', company: 'icd-engineering',
    city: 'شهر رشت', district: 'استان گیلان، شهر رشت تقاطع خیابان سعدی و معلم',
    usage: 'چندمنظوره تجاری و اداری',
    areaSqm: 40543, floors: 16,
    year: 1391, progress: 24,
    excerpt: 'چندمنظوره تجاری و اداری',
    image: '/img/projects/sparrow-rasht-1.jpg',
    gallery: ['/img/projects/sparrow-rasht-1.jpg', '/img/projects/sparrow-rasht-2.jpg', '/img/projects/sparrow-rasht-3.jpg', '/img/projects/sparrow-rasht-4.jpg'],
    map: { x: 44, y: 20 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'ghadir-office-tehran', name: 'ساختمان تجاری و اداری غدیر', nameEn: 'Ghadir Commercial And office Building',
    status: 'under-construction', company: 'icd-engineering',
    city: 'تهران', district: 'استان تهران، تهران',
    usage: 'چندمنظوره تجاری و اداری',
    areaSqm: 23375, floors: 21,
    year: 1399, progress: 95,
    excerpt: 'چندمنظوره تجاری و اداری',
    image: '/img/projects/ghadir-office-tehran-1.jpg',
    gallery: ['/img/projects/ghadir-office-tehran-1.jpg', '/img/projects/ghadir-office-tehran-2.jpg', '/img/projects/ghadir-office-tehran-3.jpg', '/img/projects/ghadir-office-tehran-4.jpg', '/img/projects/ghadir-office-tehran-5.jpg', '/img/projects/ghadir-office-tehran-6.jpg', '/img/projects/ghadir-office-tehran-7.jpg', '/img/projects/ghadir-office-tehran-8.jpg'],
    map: { x: 50, y: 34 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'ofogh-sina-mashhad', name: 'ساختمان پزشکان افق سینا', nameEn: 'Ofogh Sina Doctors Building',
    status: 'under-construction', company: 'icd-engineering',
    city: 'مشهد', district: 'استان مشهد، مشهد',
    usage: 'چندمنظوره تجاری و اداری',
    areaSqm: 18664, floors: 19,
    year: 1392, progress: 66,
    excerpt: 'چندمنظوره تجاری و اداری',
    image: '/img/projects/ofogh-sina-mashhad-1.jpg',
    gallery: ['/img/projects/ofogh-sina-mashhad-1.jpg', '/img/projects/ofogh-sina-mashhad-2.jpg', '/img/projects/ofogh-sina-mashhad-3.jpg', '/img/projects/ofogh-sina-mashhad-4.jpg', '/img/projects/ofogh-sina-mashhad-5.jpg', '/img/projects/ofogh-sina-mashhad-6.jpg', '/img/projects/ofogh-sina-mashhad-7.jpg', '/img/projects/ofogh-sina-mashhad-8.jpg'],
    map: { x: 82, y: 30 },
    featured: true,
    origin: 'site',
  },
  {
    slug: 'mega-pars-tehran', name: 'مجتمع تجاری فرهنگی مگا پارس', nameEn: 'Mega Pars Cultural Commercial complex',
    status: 'under-construction', company: 'icd-engineering',
    city: 'تهران', district: 'استان تهران، تهران تقاطع خیابان معلم',
    usage: 'چندمنظوره تجاری و اداری',
    areaSqm: 215204, floors: 18,
    year: 1384, progress: 88,
    excerpt: 'چندمنظوره تجاری و اداری',
    image: '/img/projects/mega-pars-tehran-1.jpg',
    gallery: ['/img/projects/mega-pars-tehran-1.jpg', '/img/projects/mega-pars-tehran-2.jpg'],
    map: { x: 50, y: 34 },
    featured: true,
    origin: 'site',
  },
]

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug)
}

export function projectsByStatus(status: ProjectStatusKey) {
  return projects.filter(p => p.status === status)
}

export function projectsByCompany(company: string) {
  return projects.filter(p => p.company === company)
}

export function relatedProjects(slug: string, count = 3) {
  const self = getProject(slug)
  if (!self) return []
  const same = projects.filter(p => p.slug !== slug && p.company === self.company)
  const rest = projects.filter(p => p.slug !== slug && p.company !== self.company && p.status === self.status)
  return [...same, ...rest].slice(0, count)
}

// ─────────────────────────────────────────────────────────────────── units

export type UnitStatus = 'ready' | 'pre-sale' | 'reserved'

export const unitStatus: Record<UnitStatus, string> = {
  'ready': 'آماده تحویل',
  'pre-sale': 'پیش‌فروش',
  'reserved': 'رزروشده',
}

export interface Unit {
  id: string
  ref: string
  title: string
  project: string
  usage: 'مسکونی' | 'اداری' | 'تجاری'
  areaSqm: number
  floor: number
  bedrooms?: number
  facing: string
  /** Total price in rials. Absent on most of the client's rows — the UI
   *  must say so rather than show a zero. */
  price?: number
  status: UnitStatus
  image: string
  plan: string
}

const U = (u: Omit<Unit, 'image' | 'plan'> & { kind: PhKind, v?: number }): Unit => {
  const { kind, v, ...rest } = u
  return { ...rest, image: ph(kind, v ?? 1), plan: ph('blueprint', 1) }
}

export const units: Unit[] = [
  U({ id: '4208', ref: '4208', title: 'پنت‌هاوس اداری-مسکونی تیپ A2', project: 'tehran-international-tower', usage: 'مسکونی', areaSqm: 285, floor: 42, bedrooms: 4, facing: 'جنوب‌شرقی', price: 755250000000, status: 'ready', kind: 'residential' }),
  U({ id: 'u1', ref: 'u1', title: 'پارکینگ - تجاری', project: 'tehran-international-tower', usage: 'تجاری', areaSqm: 0, floor: 0, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'u2', ref: 'u2', title: 'پارکینگ', project: 'tehran-international-tower', usage: 'مسکونی', areaSqm: 0, floor: 0, facing: '—', status: 'ready', kind: 'residential' }),
  U({ id: 'bb33', ref: 'bb33', title: 'BB33', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 81, floor: -1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'cb12', ref: 'cb12', title: 'CB12', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 89, floor: -1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'cb13', ref: 'cb13', title: 'CB13', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 54, floor: -1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'gb08', ref: 'gb08', title: 'GB08', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 65, floor: -1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'g129', ref: 'g129', title: 'G129', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 42, floor: 1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'f130', ref: 'f130', title: 'F130', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 42, floor: 1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'h123', ref: 'h123', title: 'H123', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 36, floor: 1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'h124', ref: 'h124', title: 'H124', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 46, floor: 1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'g125', ref: 'g125', title: 'G125', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 32, floor: 1, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'd215', ref: 'd215', title: 'D215', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 66, floor: 2, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'b204', ref: 'b204', title: 'B204', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 57, floor: 2, facing: '—', status: 'ready', kind: 'commercial' }),
  U({ id: 'b205', ref: 'b205', title: 'B205', project: 'mega-pars-tehran', usage: 'تجاری', areaSqm: 52, floor: 2, facing: '—', status: 'ready', kind: 'commercial' }),
]

export function getUnit(id: string) {
  return units.find(u => u.id === id)
}

export function unitsByProject(project: string) {
  return units.filter(u => u.project === project)
}

/** «۵۳٫۶ میلیارد تومان» from a rial amount. */
export function priceLabel(rials?: number): string {
  if (!rials) return 'قیمت پس از استعلام'
  const toman = rials / 10
  const billions = toman / 1_000_000_000
  const s = billions.toLocaleString('en-US', { maximumFractionDigits: 1 })
  return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!).replace('.', '٫') + ' میلیارد تومان'
}
