/**
 * Mock content for /sales/available, /sales/pre-sale, and /sales/units/[id]
 * — placeholder pending the real WordPress data layer (ADR-002).
 */
import type { UnitDetailViewModel, UnitViewModel } from '~/types/content'

const IMG = (seed: string) => ({ src: `https://picsum.photos/seed/${seed}/960/640`, alt: '' })

export const units: UnitDetailViewModel[] = [
  {
    id: '4208',
    projectSlug: 'tehran-international-tower',
    projectTitle: 'برج بین‌المللی تهران',
    area: '۲۸۵ مترمربع',
    floor: 'طبقه ۴۲',
    orientation: 'جنوب‌شرقی',
    priceLabel: 'قیمت روی توافق',
    status: 'available',
    floorPlanImage: IMG('unit-4208-plan'),
    trackingCode: '#4208',
    parkingCount: 5,
    qualityGrade: 'بالاترین رده استاندارد کیفی: گرید +A مهندسی',
    description: 'واحد پنت‌هاوس اداری-مسکونی تیپ A2 در طبقه ۴۲ برج بین‌المللی تهران، با دید ۳۶۰ درجه به البرز و کلان‌شهر. مهندسی سازه بر اساس سیستم دیوار برشی مرکب و استانداردهای ضدزلزله با ایزولاسیون صوتی سه‌لایه اجرا شده است.',
    gallery: [
      { ...IMG('unit-4208-1'), caption: 'نمای پانورامای سالن اصلی و تراس روباز' },
      { ...IMG('unit-4208-2'), caption: 'اتاق جلسات / سوییت مستر' },
      { ...IMG('unit-4208-3'), caption: 'آشپزخانه ارگونومیک هوشمند' },
      { ...IMG('unit-4208-4'), caption: 'تراس اختصاصی و نمای شهر' },
    ],
    virtualTourUrl: '#',
    bimModelUrl: '#',
    specGroups: [
      {
        title: 'مشخصات پایه و ظرفیت‌های فضا',
        items: [
          { label: 'مساحت مفید سندی', value: '۲۸۵ مترمربع' },
          { label: 'سهم مشاعات اختصاصی', value: '۴۵ مترمربع' },
          { label: 'تعداد اتاق و فضا', value: '۴ خواب + اتاق کار' },
          { label: 'ارتفاع خالص سقف', value: '۳.۸۰ متر' },
        ],
      },
      {
        title: 'امکانات و پارکینگ',
        items: [
          { label: 'پارکینگ سندی', value: '۵ واحد' },
          { label: 'انباری اختصاصی', value: '۲ واحد' },
          { label: 'جهت واحد', value: 'جنوب‌شرقی' },
          { label: 'سال تحویل', value: '۱۴۰۳' },
        ],
      },
    ],
    amenities: [
      { icon: 'ac', title: 'تهویه مطبوع مرکزی چیلر جذبی', description: 'فن‌کویل‌های بی‌صدا با تفکیک دمایی مستقل هر زون.' },
      { icon: 'smart', title: 'سیستم هوشمند جامع ساختمان', description: 'کنترل روشنایی، سرمایش/گرمایش و پرده‌های برقی از پنل تاچ.' },
      { icon: 'window', title: 'پنجره‌های تمام‌قد ترمال‌بریک', description: 'شیشه دوجداره آنتی‌رفلکس، عایق حرارتی و صوتی.' },
      { icon: 'elevator', title: 'آسانسورهای پرسرعت اختصاصی', description: 'دسترسی مستقیم و بدون توقف از پارکینگ به طبقه واحد.' },
      { icon: 'security', title: 'لابی اختصاصی و حفاظت ۲۴ ساعته', description: 'خدمات لابی‌من و سیستم نظارت تصویری هوشمند.' },
      { icon: 'pool', title: 'مجموعه آبی و ورزشی اختصاصی', description: 'استخر با دید شهر، سونا و باشگاه بدنسازی مدرن.' },
      { icon: 'power', title: 'دیزل ژنراتور پشتیبان', description: 'پوشش کامل مصارف برق بدون وقفه در مدار مصرف.' },
      { icon: 'parking', title: 'پارکینگ مکانیزه چندطبقه', description: 'دسترسی کدگذاری‌شده و امن به جایگاه‌های اختصاصی.' },
    ],
    floorPlan: {
      tabs: ['پلان چیدمان مبلمان', 'پلان اندازه‌گذاری اجرایی', 'تاسیسات و هوشمندسازی'],
      rooms: ['سوییت مستر اصلی (۴۸ م.م)', 'اتاق مدیریت / جلسات (۳۶ م.م)', 'سالن اصلی پذیرایی (۱۱۰ م.م)', 'آشپزخانه و بار (۲۸ م.م)', 'تراس پانوراما (۲۵ م.م)'],
    },
    pricePerSqmLabel: '۲۶۵,۰۰۰,۰۰۰ تومان',
    financingNote: '۴۰٪ پیش‌پرداخت نقد، ۵۰٪ اقساط ۲۴ ماهه با نرخ ترجیحی صنعت ساختمان، ۱۰٪ همزمان با انتقال سند رسمی.',
    inspectionSlotLabel: 'پنجشنبه — ۱۸ آبان (ساعت ۱۱:۰۰ صبح)',
    consultant: { name: 'مهندس علیرضا کیانی', role: 'مدیر فروش اختصاصی پروژه‌های نمادین ثاخت', phone: '02188880000' },
  },
  {
    id: '1105',
    projectSlug: 'megapars-tehran',
    projectTitle: 'مگاپارس تهران',
    area: '۱۴۰ مترمربع',
    floor: 'طبقه ۱۱',
    orientation: 'شمالی',
    priceLabel: 'پیش‌فروش — شرایط اقساطی',
    status: 'reserved',
    floorPlanImage: IMG('unit-1105-plan'),
    trackingCode: '#1105',
    parkingCount: 2,
    qualityGrade: 'رده استاندارد کیفی: گرید A مهندسی',
    description: 'واحد اداری-تجاری در طبقه ۱۱ مگاپارس تهران، مناسب دفاتر شرکتی با دسترسی مستقیم به لابی تجاری مجتمع.',
    gallery: [
      { ...IMG('unit-1105-1'), caption: 'سالن اداری باز و فضای پذیرش' },
      { ...IMG('unit-1105-2'), caption: 'اتاق جلسات اختصاصی' },
      { ...IMG('unit-1105-3'), caption: 'نمای بیرونی مجتمع مگاپارس' },
    ],
    virtualTourUrl: '#',
    specGroups: [
      {
        title: 'مشخصات پایه و ظرفیت‌های فضا',
        items: [
          { label: 'مساحت مفید سندی', value: '۱۴۰ مترمربع' },
          { label: 'جهت واحد', value: 'شمالی' },
        ],
      },
      {
        title: 'امکانات و پارکینگ',
        items: [
          { label: 'پارکینگ سندی', value: '۲ واحد' },
          { label: 'سال تحویل', value: '۱۴۰۵ (تخمینی)' },
        ],
      },
    ],
    amenities: [
      { icon: 'ac', title: 'تهویه مطبوع مرکزی', description: 'فن‌کویل مستقل با کنترل دمای هر واحد.' },
      { icon: 'elevator', title: 'آسانسورهای پرسرعت', description: 'دسترسی سریع به لابی تجاری مجتمع.' },
      { icon: 'security', title: 'حفاظت و نگهبانی ۲۴ ساعته', description: 'کنترل تردد و نظارت تصویری در ورودی‌ها.' },
      { icon: 'parking', title: 'پارکینگ اختصاصی', description: 'جایگاه‌های اختصاصی با دسترسی مستقیم آسانسور.' },
    ],
    floorPlan: {
      tabs: ['پلان چیدمان مبلمان', 'پلان اندازه‌گذاری اجرایی'],
      rooms: ['سالن اداری باز (۷۰ م.م)', 'اتاق جلسات (۲۲ م.م)', 'پذیرش و انتظار (۱۸ م.م)', 'اتاق سرور و آرشیو (۱۲ م.م)'],
    },
    inspectionSlotLabel: 'سه‌شنبه — ۹ آبان (ساعت ۱۶:۰۰)',
    consultant: { name: 'خانم سارا رضایی', role: 'کارشناس فروش مگاپارس تهران', phone: '02188880000' },
  },
  {
    id: '3021',
    projectSlug: 'royaye-kish',
    projectTitle: 'رویای کیش',
    area: '۹۵ مترمربع',
    floor: 'طبقه ۳',
    orientation: 'دریا (جنوبی)',
    priceLabel: 'قیمت روی توافق',
    status: 'sold',
    floorPlanImage: IMG('unit-3021-plan'),
    trackingCode: '#3021',
    parkingCount: 1,
    description: 'واحد مسکونی رو به دریا در مجتمع گردشگری-اقامتی رویای کیش.',
    gallery: [
      { ...IMG('unit-3021-1'), caption: 'نمای دریا از بالکن' },
      { ...IMG('unit-3021-2'), caption: 'فضای نشیمن' },
    ],
    specGroups: [
      {
        title: 'مشخصات پایه و ظرفیت‌های فضا',
        items: [
          { label: 'مساحت مفید سندی', value: '۹۵ مترمربع' },
          { label: 'جهت واحد', value: 'جنوبی، دید دریا' },
        ],
      },
      {
        title: 'امکانات و پارکینگ',
        items: [
          { label: 'پارکینگ سندی', value: '۱ واحد' },
        ],
      },
    ],
    amenities: [
      { icon: 'pool', title: 'استخر و ساحل اختصاصی', description: 'دسترسی مستقیم به ساحل خصوصی مجتمع.' },
      { icon: 'security', title: 'نگهبانی و کنترل تردد', description: 'حفاظت شبانه‌روزی ورودی مجتمع.' },
    ],
    floorPlan: {
      tabs: ['پلان چیدمان مبلمان'],
      rooms: ['اتاق خواب اصلی (۲۲ م.م)', 'نشیمن و پذیرایی (۳۲ م.م)', 'بالکن رو به دریا (۱۲ م.م)'],
    },
  },
]

export function getAllUnits(): UnitViewModel[] {
  return units
}

export function getUnitsByStatus(status: UnitViewModel['status']): UnitViewModel[] {
  return units.filter(u => u.status === status)
}

export function getUnit(id: string): UnitDetailViewModel | undefined {
  return units.find(u => u.id === id)
}

export function getSimilarUnits(id: string, count = 3): UnitViewModel[] {
  return units.filter(u => u.id !== id).slice(0, count)
}

export const unitStatusLabels: Record<UnitViewModel['status'], string> = {
  available: 'آماده فروش',
  reserved: 'رزرو شده / پیش‌فروش',
  sold: 'فروخته شده',
}

// ---------------------------------------------------------------------------
// Template `02a-index-card-grid` for /sales/available and /sales/pre-sale.
// Add-only: extra inventory (placeholder, pending WordPress) appended to
// `units` so each list has enough cards to show the full filter / grid /
// pagination layout, plus archive fields the unit filters and cards need.
// ---------------------------------------------------------------------------

export type UnitUsageKey = 'residential' | 'office' | 'commercial'

export const UNIT_USAGE_TYPES: Record<UnitUsageKey, string> = {
  residential: 'مسکونی',
  office: 'اداری',
  commercial: 'تجاری',
}

interface ExtraUnitInput {
  id: string
  projectSlug: string
  projectTitle: string
  areaSqm: number
  floorNum: number
  orientation: string
  status: UnitViewModel['status']
  usage: UnitUsageKey
  bedrooms?: number
  parking: number
  priceLabel: string
  delivery: string
}

const faN = (n: number) => n.toLocaleString('fa-IR')
const floorLabel = (n: number) => (n === 0 ? 'طبقه همکف' : `طبقه ${faN(n)}`)

function makeUnit(u: ExtraUnitInput): UnitDetailViewModel {
  const area = `${faN(u.areaSqm)} مترمربع`
  const usageLabel = UNIT_USAGE_TYPES[u.usage]
  return {
    id: u.id,
    projectSlug: u.projectSlug,
    projectTitle: u.projectTitle,
    area,
    floor: floorLabel(u.floorNum),
    orientation: u.orientation,
    priceLabel: u.priceLabel,
    status: u.status,
    floorPlanImage: IMG(`unit-${u.id}-plan`),
    trackingCode: `#${u.id}`,
    parkingCount: u.parking,
    description: `واحد ${usageLabel} ${area} در ${floorLabel(u.floorNum)} ${u.projectTitle}، رو به ${u.orientation}، با ${faN(u.parking)} پارکینگ سندی و تحویل ${u.delivery}.`,
    gallery: [
      { ...IMG(`unit-${u.id}-1`), caption: 'نمای داخلی فضای اصلی' },
      { ...IMG(`unit-${u.id}-2`), caption: u.usage === 'residential' ? 'اتاق خواب اصلی' : 'فضای کار و جلسات' },
      { ...IMG(`unit-${u.id}-3`), caption: `نمای بیرونی ${u.projectTitle}` },
    ],
    specGroups: [
      {
        title: 'مشخصات پایه و ظرفیت‌های فضا',
        items: [
          { label: 'مساحت مفید سندی', value: area },
          { label: 'کاربری', value: usageLabel },
          ...(u.bedrooms ? [{ label: 'تعداد اتاق خواب', value: `${faN(u.bedrooms)} خواب` }] : []),
          { label: 'جهت واحد', value: u.orientation },
        ],
      },
      {
        title: 'امکانات و پارکینگ',
        items: [
          { label: 'پارکینگ سندی', value: `${faN(u.parking)} واحد` },
          { label: 'زمان تحویل', value: u.delivery },
        ],
      },
    ],
    amenities: [
      { icon: 'ac', title: 'تهویه مطبوع مرکزی', description: 'فن‌کویل مستقل با کنترل دمای هر فضا.' },
      { icon: 'elevator', title: 'آسانسورهای پرسرعت', description: 'دسترسی مستقیم از پارکینگ به طبقات.' },
      { icon: 'security', title: 'حفاظت و نگهبانی ۲۴ ساعته', description: 'کنترل تردد و نظارت تصویری هوشمند.' },
      { icon: 'parking', title: 'پارکینگ اختصاصی', description: 'جایگاه‌های سندی با دسترسی امن.' },
    ],
    floorPlan: {
      tabs: ['پلان چیدمان مبلمان', 'پلان اندازه‌گذاری اجرایی'],
      rooms: u.usage === 'residential'
        ? ['نشیمن و پذیرایی', 'اتاق خواب اصلی', 'آشپزخانه', 'تراس']
        : ['فضای اصلی باز', 'اتاق جلسات / انبار', 'سرویس بهداشتی'],
    },
    consultant: { name: 'واحد فروش ثاخت', role: `کارشناس فروش ${u.projectTitle}`, phone: '02188880000' },
  }
}

const extraUnitInputs: ExtraUnitInput[] = [
  { id: '0712', projectSlug: 'megapars-tehran', projectTitle: 'مگاپارس تهران', areaSqm: 185, floorNum: 7, orientation: 'جنوبی', status: 'available', usage: 'office', parking: 2, priceLabel: '۴۸ میلیارد تومان', delivery: 'فوری' },
  { id: '0304', projectSlug: 'asp-tehran', projectTitle: 'آ.اس.پ تهران', areaSqm: 96, floorNum: 3, orientation: 'شمالی', status: 'available', usage: 'commercial', parking: 1, priceLabel: '۳۶ میلیارد تومان', delivery: 'فوری' },
  { id: '0908', projectSlug: 'asp-tehran', projectTitle: 'آ.اس.پ تهران', areaSqm: 160, floorNum: 9, orientation: 'شرقی', status: 'available', usage: 'office', parking: 2, priceLabel: '۴۱ میلیارد تومان', delivery: 'فوری' },
  { id: '0205', projectSlug: 'asp-mashhad', projectTitle: 'آ.اس.پ مشهد', areaSqm: 72, floorNum: 2, orientation: 'غربی', status: 'available', usage: 'commercial', parking: 1, priceLabel: '۱۸ میلیارد تومان', delivery: 'فوری' },
  { id: '0601', projectSlug: 'asp-mashhad', projectTitle: 'آ.اس.پ مشهد', areaSqm: 130, floorNum: 6, orientation: 'جنوبی', status: 'available', usage: 'office', parking: 2, priceLabel: '۲۲ میلیارد تومان', delivery: 'فوری' },
  { id: '0403', projectSlug: 'sahel-noshahr', projectTitle: 'مجتمع ساحل نوشهر', areaSqm: 115, floorNum: 4, orientation: 'شمالی (دید دریا)', status: 'available', usage: 'residential', bedrooms: 2, parking: 1, priceLabel: '۲۶ میلیارد تومان', delivery: 'فوری' },
  { id: '0502', projectSlug: 'sahel-noshahr', projectTitle: 'مجتمع ساحل نوشهر', areaSqm: 165, floorNum: 5, orientation: 'شمالی (دید دریا)', status: 'available', usage: 'residential', bedrooms: 3, parking: 2, priceLabel: '۳۴ میلیارد تومان', delivery: 'فوری' },
  { id: '3812', projectSlug: 'tehran-international-tower', projectTitle: 'برج بین‌المللی تهران', areaSqm: 210, floorNum: 38, orientation: 'جنوب‌غربی', status: 'reserved', usage: 'residential', bedrooms: 3, parking: 3, priceLabel: 'پیش‌فروش — ۳۰٪ نقد، مابقی اقساطی', delivery: '۱۴۰۶ (تخمینی)' },
  { id: '2406', projectSlug: 'tehran-international-tower', projectTitle: 'برج بین‌المللی تهران', areaSqm: 145, floorNum: 24, orientation: 'شرقی', status: 'reserved', usage: 'office', parking: 2, priceLabel: 'پیش‌فروش — اقساط ۲۴ ماهه', delivery: '۱۴۰۶ (تخمینی)' },
  { id: '0610', projectSlug: 'afafabad-shiraz', projectTitle: 'عفاف‌آباد شیراز', areaSqm: 120, floorNum: 6, orientation: 'جنوبی', status: 'reserved', usage: 'residential', bedrooms: 2, parking: 1, priceLabel: 'پیش‌فروش — اقساط ۱۸ ماهه', delivery: '۱۴۰۵ (تخمینی)' },
  { id: '0802', projectSlug: 'afafabad-shiraz', projectTitle: 'عفاف‌آباد شیراز', areaSqm: 180, floorNum: 8, orientation: 'جنوب‌شرقی', status: 'reserved', usage: 'residential', bedrooms: 3, parking: 2, priceLabel: 'پیش‌فروش — اقساط ۱۸ ماهه', delivery: '۱۴۰۵ (تخمینی)' },
  { id: '0301', projectSlug: 'narenjestan-izadshahr', projectTitle: 'نارنجستان ایزدشهر', areaSqm: 90, floorNum: 3, orientation: 'شمالی (دید دریا)', status: 'reserved', usage: 'residential', bedrooms: 2, parking: 1, priceLabel: 'پیش‌فروش — اقساط ۲۴ ماهه', delivery: '۱۴۰۶ (تخمینی)' },
  { id: '0104', projectSlug: 'narenjestan-izadshahr', projectTitle: 'نارنجستان ایزدشهر', areaSqm: 65, floorNum: 0, orientation: 'بر بلوار ساحلی', status: 'reserved', usage: 'commercial', parking: 1, priceLabel: 'پیش‌فروش — شرایط ویژه تجاری', delivery: '۱۴۰۶ (تخمینی)' },
  { id: '1007', projectSlug: 'royaye-kish', projectTitle: 'رویای کیش', areaSqm: 135, floorNum: 10, orientation: 'دریا (جنوبی)', status: 'reserved', usage: 'residential', bedrooms: 2, parking: 1, priceLabel: 'پیش‌فروش — اقساط ۳۶ ماهه', delivery: '۱۴۰۷ (تخمینی)' },
]

units.push(...extraUnitInputs.map(makeUnit))

interface UnitArchiveFields {
  usage: UnitUsageKey
  areaSqm: number
  floorNum: number
  bedrooms?: number
  city: string
  /** Rough numeric price (billion toman) for «کمترین قیمت» sort; undefined = on request. */
  priceBn?: number
}

const PROJECT_CITY: Record<string, string> = {
  'tehran-international-tower': 'تهران، منطقه ۱',
  'megapars-tehran': 'تهران، منطقه ۶',
  'asp-tehran': 'تهران، منطقه ۳',
  'asp-mashhad': 'مشهد',
  'sahel-noshahr': 'نوشهر',
  'afafabad-shiraz': 'شیراز',
  'narenjestan-izadshahr': 'ایزدشهر',
  'royaye-kish': 'کیش',
}

const baseArchive: Record<string, Omit<UnitArchiveFields, 'city'>> = {
  4208: { usage: 'residential', areaSqm: 285, floorNum: 42, bedrooms: 4 },
  1105: { usage: 'office', areaSqm: 140, floorNum: 11 },
  3021: { usage: 'residential', areaSqm: 95, floorNum: 3, bedrooms: 1 },
}

const faDigits = '۰۱۲۳۴۵۶۷۸۹'
function parseFaNumber(s: string): number | undefined {
  const ascii = s.replace(/[۰-۹]/g, d => String(faDigits.indexOf(d)))
  const m = ascii.match(/\d+/)
  return m ? Number(m[0]) : undefined
}

/** Card view model for the sales unit lists — a superset of `UnitViewModel`. */
export interface UnitArchiveCard extends UnitViewModel, UnitArchiveFields {
  usageLabel: string
  parkingCount: number
  /** Position in the listing feed — higher = listed more recently. */
  listedRank: number
}

export function getUnitArchiveCards(): UnitArchiveCard[] {
  return units.map((u, i) => {
    const extra = extraUnitInputs.find(e => e.id === u.id)
    const base = baseArchive[u.id]
    const fields: Omit<UnitArchiveFields, 'city'> = extra
      ? { usage: extra.usage, areaSqm: extra.areaSqm, floorNum: extra.floorNum, bedrooms: extra.bedrooms, priceBn: parseFaNumber(extra.priceLabel.includes('میلیارد') ? extra.priceLabel : '') }
      : base ?? { usage: 'residential', areaSqm: parseFaNumber(u.area) ?? 0, floorNum: parseFaNumber(u.floor) ?? 0 }
    return {
      id: u.id,
      projectSlug: u.projectSlug,
      projectTitle: u.projectTitle,
      area: u.area,
      floor: u.floor,
      orientation: u.orientation,
      priceLabel: u.priceLabel,
      status: u.status,
      floorPlanImage: u.floorPlanImage,
      parkingCount: u.parkingCount,
      ...fields,
      city: PROJECT_CITY[u.projectSlug] ?? '',
      usageLabel: UNIT_USAGE_TYPES[fields.usage],
      listedRank: i,
    }
  })
}
