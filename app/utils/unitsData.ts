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
