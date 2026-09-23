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
    description: 'واحد پنت‌هاوس اداری-مسکونی تیپ A2 در طبقه ۴۲ برج بین‌المللی تهران، با دید ۳۶۰ درجه به البرز و کلان‌شهر.',
    gallery: [IMG('unit-4208-1'), IMG('unit-4208-2'), IMG('unit-4208-3'), IMG('unit-4208-4')],
    specs: [
      { label: 'مساحت مفید سندی', value: '۲۸۵ مترمربع' },
      { label: 'تعداد اتاق', value: '۴ خواب + اتاق کار' },
      { label: 'پارکینگ سندی', value: '۵ واحد' },
      { label: 'انباری', value: '۲ واحد' },
      { label: 'جهت واحد', value: 'جنوب‌شرقی' },
      { label: 'سال تحویل', value: '۱۴۰۳' },
    ],
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
    description: 'واحد اداری-تجاری در طبقه ۱۱ مگاپارس تهران، مناسب دفاتر شرکتی با دسترسی مستقیم به لابی تجاری مجتمع.',
    gallery: [IMG('unit-1105-1'), IMG('unit-1105-2'), IMG('unit-1105-3')],
    specs: [
      { label: 'مساحت مفید سندی', value: '۱۴۰ مترمربع' },
      { label: 'پارکینگ سندی', value: '۲ واحد' },
      { label: 'جهت واحد', value: 'شمالی' },
      { label: 'سال تحویل', value: '۱۴۰۵ (تخمینی)' },
    ],
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
    gallery: [IMG('unit-3021-1'), IMG('unit-3021-2')],
    specs: [
      { label: 'مساحت مفید سندی', value: '۹۵ مترمربع' },
      { label: 'پارکینگ سندی', value: '۱ واحد' },
      { label: 'جهت واحد', value: 'جنوبی، دید دریا' },
    ],
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
