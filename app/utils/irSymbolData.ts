/**
 * MOCK market data for /ir/symbol (template 08-ir-symbol,
 * `project_detail_page_template/08_ir_symbol`).
 *
 * TODO(backend): every number in this file is illustrative. Real prices,
 * order book, retail/institutional flow and shareholder structure must come
 * from TSETMC (tsetmc.com) / CODAL through a server-side proxy with caching
 * (docs/02-build-checklist.md — IR symbol data source). Until that exists
 * the page shows a visible «داده‌های نمایشی» note. Price series are
 * generated deterministically (seeded PRNG) so SSR and client render the
 * same chart.
 */
import { addDaysIso, gregorianToJalali, isoToJalali, jalaliMonthNames, irFaDigits } from '~/utils/irDateUtils'
import { codalSymbolUrl } from '~/utils/documentsData'

export const IR_SYMBOL_IS_MOCK = true

/** Snapshot the mock numbers are "as of" (a Wednesday — Tehran exchange trades Sat–Wed). */
export const symbolSnapshotIso = '2026-09-23'

export const symbolMeta = {
  companyName: 'شرکت بین‌المللی توسعه ساختمان',
  ticker: 'ثاخت',
  code: 'ICD1',
  isin: 'IRO1ICD10001',
  status: 'مجاز (معاملاتی)',
  badges: ['بازار اول (تابلوی اصلی) بورس تهران', 'گروه: انبوه‌سازی، املاک و مستغلات', 'عضو شاخص ۵۰ شرکت برتر'],
  snapshotTime: '۱۲:۳۰:۰۰',
  tsetmcUrl: 'https://tsetmc.com',
  codalUrl: codalSymbolUrl,
}

export const quote = {
  last: 3285,
  prevClose: 3175,
  close: 3260,
  /** allowed daily band = ±5% of previous close */
  bandPercent: 5,
  volume: 42_500_000,
  marketCapBn: 82_150,
  registeredCapitalBn: 25_000,
  navPerShare: 6450,
  eps: 310,
  groupPe: 13.8,
  avgMonthlyVolume: 38_000_000,
  liquidityPercent: 98.4,
  totalShares: 25_000_000_000,
}

export type Timeframe = '1d' | '1w' | '1m' | '3m' | '1y' | '5y' | 'max'

export const timeframeOptions: { key: Timeframe; label: string }[] = [
  { key: '1d', label: 'امروز' },
  { key: '1w', label: '۱ هفته' },
  { key: '1m', label: '۱ ماهه' },
  { key: '3m', label: '۳ ماهه' },
  { key: '1y', label: '۱ ساله' },
  { key: '5y', label: '۵ ساله' },
  { key: 'max', label: 'حداکثر' },
]

/**
 * The three ranges the page offers: امروز / ۱ ماهه / ۱ ساله (owner's request,
 * 2026-10-18). `timeframeOptions` keeps the full set — `getPriceSeries` still
 * serves every key, and widening the strip again is a one-line change.
 */
export const timeframeOptionsShown = timeframeOptions.filter(t => ['1d', '1m', '1y'].includes(t.key))

export type ChartMode = 'line' | 'candle' | 'depth'

export interface ChartRefLine { value: number; label: string; note?: string; tone?: 'ceiling' | 'floor' | 'neutral' | 'current' }

export interface PricePoint {
  label: string
  tick: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Brownian bridge from `start` to `end` in `n` steps. */
function bridge(n: number, start: number, end: number, vol: number, rand: () => number) {
  const walk = [0]
  for (let i = 1; i < n; i++) walk.push(walk[i - 1]! + (rand() - 0.5) * 2)
  const last = walk[n - 1]!
  return walk.map((w, i) => {
    const t = n > 1 ? i / (n - 1) : 1
    return Math.max(start * 0.3, start + (end - start) * t + (w - last * t) * vol * start)
  })
}

function isTradingDay(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  const day = new Date(Date.UTC(y!, m! - 1, d!)).getUTCDay()
  return day !== 4 && day !== 5 // Thursday / Friday closed
}

function tradingDaysBack(fromIso: string, count: number) {
  const days: string[] = []
  let cursor = fromIso
  while (days.length < count) {
    if (isTradingDay(cursor)) days.unshift(cursor)
    cursor = addDaysIso(cursor, -1)
  }
  return days
}

function stepBack(fromIso: string, count: number, stepDays: number) {
  return Array.from({ length: count }, (_, i) => addDaysIso(fromIso, -(count - 1 - i) * stepDays))
}

const dayMonth = (iso: string) => {
  const j = isoToJalali(iso)
  return `${irFaDigits(j.d)} ${jalaliMonthNames[j.m - 1]}`
}
const monthYear = (iso: string) => {
  const j = isoToJalali(iso)
  return `${jalaliMonthNames[j.m - 1]} ${irFaDigits(j.y)}`
}
const clock = (minutesFrom9: number) => {
  const h = 9 + Math.floor(minutesFrom9 / 60)
  const m = minutesFrom9 % 60
  return irFaDigits(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
}

interface SeriesSpec { seed: number; start: number; vol: number; baseVolume: number }

const specs: Record<Timeframe, SeriesSpec> = {
  '1d': { seed: 11, start: quote.prevClose, vol: 0.006, baseVolume: 1_000_000 },
  '1w': { seed: 23, start: 3060, vol: 0.01, baseVolume: 5_000_000 },
  '1m': { seed: 37, start: 2890, vol: 0.02, baseVolume: 38_000_000 },
  '3m': { seed: 41, start: 2640, vol: 0.03, baseVolume: 36_000_000 },
  '1y': { seed: 53, start: 2250, vol: 0.06, baseVolume: 150_000_000 },
  '5y': { seed: 67, start: 820, vol: 0.09, baseVolume: 700_000_000 },
  max: { seed: 79, start: 310, vol: 0.12, baseVolume: 650_000_000 },
}

function buildLabels(tf: Timeframe): { label: string; tick: string }[] {
  if (tf === '1d') {
    return Array.from({ length: 43 }, (_, i) => ({ label: `امروز ${clock(i * 5)}`, tick: clock(i * 5) }))
  }
  if (tf === '1w') {
    const days = tradingDaysBack(symbolSnapshotIso, 5)
    return days.flatMap(iso => Array.from({ length: 8 }, (_, k) => ({ label: `${dayMonth(iso)} — ${clock(k * 30)}`, tick: dayMonth(iso) })))
  }
  if (tf === '1m' || tf === '3m') {
    return tradingDaysBack(symbolSnapshotIso, tf === '1m' ? 22 : 64).map(iso => ({ label: dayMonth(iso), tick: dayMonth(iso) }))
  }
  if (tf === '1y') {
    return stepBack(symbolSnapshotIso, 52, 7).map(iso => ({ label: `هفته منتهی به ${dayMonth(iso)}`, tick: monthYear(iso) }))
  }
  return stepBack(symbolSnapshotIso, tf === '5y' ? 60 : 120, 30).map(iso => ({ label: monthYear(iso), tick: monthYear(iso) }))
}

const seriesCache = new Map<Timeframe, PricePoint[]>()

export function getPriceSeries(tf: Timeframe): PricePoint[] {
  const cached = seriesCache.get(tf)
  if (cached) return cached
  const spec = specs[tf]
  const rand = mulberry32(spec.seed)
  const labels = buildLabels(tf)
  const closes = bridge(labels.length, spec.start, quote.last, spec.vol, rand)
  const points = labels.map((l, i) => {
    const close = Math.round(closes[i]!)
    const open = Math.round(i === 0 ? spec.start : closes[i - 1]!)
    const spread = Math.max(open, close) * (0.002 + rand() * 0.008)
    return {
      ...l,
      open,
      close,
      high: Math.round(Math.max(open, close) + spread * rand()),
      low: Math.round(Math.min(open, close) - spread * rand()),
      volume: Math.round(spec.baseVolume * (0.45 + rand() * 1.1)),
    }
  })
  seriesCache.set(tf, points)
  return points
}

export interface OrderBookRow { bidCount: number; bidVolume: number; bidPrice: number; askPrice: number; askVolume: number; askCount: number }

export const orderBook: OrderBookRow[] = [
  { bidCount: 142, bidVolume: 5_420_000, bidPrice: 3285, askPrice: 3286, askVolume: 850_000, askCount: 18 },
  { bidCount: 95, bidVolume: 3_150_000, bidPrice: 3280, askPrice: 3290, askVolume: 1_200_000, askCount: 34 },
  { bidCount: 74, bidVolume: 2_800_000, bidPrice: 3275, askPrice: 3295, askVolume: 1_850_000, askCount: 42 },
  { bidCount: 53, bidVolume: 1_950_000, bidPrice: 3270, askPrice: 3300, askVolume: 2_450_000, askCount: 61 },
  { bidCount: 38, bidVolume: 1_220_000, bidPrice: 3265, askPrice: 3310, askVolume: 3_100_000, askCount: 85 },
]

/** Share of today's traded volume by investor type (buy side / sell side). */
export const investorFlow = {
  buyers: { retailPercent: 72, institutionalPercent: 28 },
  sellers: { retailPercent: 45, institutionalPercent: 55 },
}

export interface Shareholder { name: string; percent: number; note?: string; isFloat?: boolean }

export const shareholders: Shareholder[] = [
  { name: 'گروه توسعه مالی و اقتصادی غدیر (سهامی عام)', percent: 54.2, note: 'سهامدار مدیریتی اصلی' },
  { name: 'گروه سرمایه‌گذاری پارسیان', percent: 12.8 },
  { name: 'صندوق سرمایه‌گذاری توسعه بازار سرمایه', percent: 6.4, note: 'بازارگردان رسمی' },
  { name: 'بیمه مرکزی و سایر نهادهای مالی', percent: 5.2 },
  { name: 'سهامداران خرد و شناور آزاد بورس', percent: 21.4, isFloat: true },
]

export const dividendHighlight = {
  tag: 'تقسیم سود نقدی (DPS)',
  meeting: 'مجمع سالیانه ۱۴۰۲',
  title: 'واریز ۱۰۰٪ سود نقدی مصوب از طریق سامانه سجام',
  description: 'هلدینگ ثاخت در ۳ سال اخیر تمامی مطالبات سود سهامداران محترم را در کمتر از ۴ ماه از تاریخ برگزاری مجمع به حساب بانکی سجامی واریز نموده است.',
  dpsLabel: 'سود تقسیمی سال ۱۴۰۲:',
  dpsValue: '۲۴۰ ریال به ازای هر سهم',
}

export interface AssetBacking { title: string; location: string; description: string; metricLabel: string; metricValue: string; href: string }

export const assetBacking: AssetBacking[] = [
  { title: 'پروژه تجاری اداری مگاپارس', location: 'تهران — خیابان شریعتی', description: 'بزرگ‌ترین مجموعه تجاری سبز خاورمیانه با بیش از ۲۰۰ هزار مترمربع زیربنا؛ ارزش‌افزوده کلیدی بر NAV ثاخت.', metricLabel: 'سهم مالکیت ثاخت:', metricValue: '۱۰۰٪ سهام پروژه', href: '/projects/mega-pars-tehran' },
  { title: 'برج بین‌المللی تهران', location: 'تهران — تقاطع بزرگراه‌های حکیم و کردستان', description: 'بلندترین برج مسکونی پایتخت؛ واحدهای تجاری و پنت‌هاوس‌های آماده واگذاری با جریان نقدی بالا.', metricLabel: 'وضعیت بهره‌برداری:', metricValue: 'بهره‌برداری و فروش فعال', href: '/projects/tehran-international-tower' },
  { title: 'مجتمع‌های آ.اس.پ مشهد و تهران', location: 'مشهد مقدس و پایتخت', description: 'پروژه‌های برند مسکونی و اقامتی متصل به بازوی اجرایی شرکت آ.اس.پ از شرکت‌های تابعه کلیدی ثاخت.', metricLabel: 'سهم کنترلی هلدینگ:', metricValue: '۷۳٪ سهام شرکتی', href: '/projects/ofogh-sina-mashhad' },
  { title: 'پهنه‌های ساحلی کیش و نوشهر', location: 'جزیره کیش و نوار ساحلی شمال', description: 'زمین‌ها و طرح‌های گردشگری ساحلی با کاربری‌های چندمنظوره مسکونی-تفریحی و ارزش ذخیره ملکی ممتاز.', metricLabel: 'پتانسیل تجدید ارزیابی:', metricValue: 'بسیار بالا', href: '/projects/roya-elite' },
]

export interface DpsRow { fiscalYear: string; eps: number; dps: number; meetingDate: string; method: string }

export const dpsHistory: DpsRow[] = [
  { fiscalYear: '۱۴۰۲ (دوره ۱۲ ماهه)', eps: 285, dps: 240, meetingDate: '۱۴۰۳/۰۴/۲۵', method: 'واریز مستقیم سجام' },
  { fiscalYear: '۱۴۰۱ (دوره ۱۲ ماهه)', eps: 220, dps: 190, meetingDate: '۱۴۰۲/۰۴/۲۸', method: 'واریز مستقیم سجام' },
  { fiscalYear: '۱۴۰۰ (دوره ۱۲ ماهه)', eps: 160, dps: 140, meetingDate: '۱۴۰۱/۰۴/۲۹', method: 'واریز مستقیم سجام' },
  { fiscalYear: '۱۳۹۹ (دوره ۱۲ ماهه)', eps: 118, dps: 100, meetingDate: '۱۴۰۰/۰۴/۳۰', method: 'بانک عامل / سجام' },
]

export interface CodalAnnouncement { tag: string; title: string; date: string; href: string }

export const codalAnnouncements: CodalAnnouncement[] = [
  { tag: 'افشای بااهمیت (گروه ب)', title: 'افشای اطلاعات بااهمیت — نتایج حاصل از برگزاری مزایده فروش واحدهای تجاری پروژه مگاپارس', date: '۱۴۰۳/۰۸/۱۲', href: '/ir/financials' },
  { tag: 'گزارش فعالیت ماهانه', title: 'گزارش فعالیت ماهانه دوره ۱ ماهه منتهی به ۱۴۰۳/۰۷/۳۰', date: '۱۴۰۳/۰۸/۰۵', href: '/ir/financials' },
  { tag: 'تصمیمات مجمع', title: 'تصمیمات مجمع عمومی عادی سالیانه صاحبان سهام برای سال مالی منتهی به ۱۴۰۲/۱۲/۲۹', date: '۱۴۰۳/۰۴/۲۵', href: '/ir/governance' },
  { tag: 'صورت‌های مالی', title: 'اطلاعات و صورت‌های مالی میان‌دوره‌ای ۶ ماهه حسابرسی‌شده منتهی به ۱۴۰۳/۰۳/۳۱', date: '۱۴۰۳/۰۴/۱۵', href: '/ir/financials' },
]

/** Jalali label for the snapshot, e.g. «۱ مهر ۱۴۰۵». */
export function snapshotDateLabel() {
  const [y, m, d] = symbolSnapshotIso.split('-').map(Number)
  const j = gregorianToJalali(y!, m!, d!)
  return `${irFaDigits(j.d)} ${jalaliMonthNames[j.m - 1]} ${irFaDigits(j.y)}`
}
