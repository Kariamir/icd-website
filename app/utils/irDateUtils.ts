/**
 * Small date/number helpers shared by the investor-relations pages
 * (/ir/financials, /ir/governance, /ir/calendar, /ir/symbol). Pure functions,
 * no Intl calendar dependency, so SSR and client render identical strings.
 * Conversion algorithm: the well-known arithmetic Jalali <-> Gregorian
 * mapping (valid for the 1300–1500 AP range used here).
 */

export const jalaliMonthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
] as const

export interface JalaliDate { y: number; m: number; d: number }

const faDigitMap = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** Replace ASCII digits with Persian digits (keeps every other character). */
export function irFaDigits(value: string | number): string {
  return String(value).replace(/\d/g, d => faDigitMap[Number(d)]!)
}

/** Grouped number with Persian digits and Persian thousands separator style used in the mockups (۳,۲۸۵). */
export function irFormatNumber(value: number, fractionDigits = 0): string {
  const fixed = value.toFixed(fractionDigits)
  const [intPart, frac] = fixed.split('.')
  const grouped = intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return irFaDigits(frac ? `${grouped}.${frac}` : grouped)
}

function pad2(n: number) { return n < 10 ? `0${n}` : String(n) }

export function jalaliToGregorian({ y, m, d }: JalaliDate): { y: number; m: number; d: number } {
  const jy = y + 1595
  let days = -355668 + 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4) + d + (m < 7 ? (m - 1) * 31 : (m - 7) * 30 + 186)
  let gy = 400 * Math.floor(days / 146097)
  days %= 146097
  if (days > 36524) {
    days -= 1
    gy += 100 * Math.floor(days / 36524)
    days %= 36524
    if (days >= 365) days += 1
  }
  gy += 4 * Math.floor(days / 1461)
  days %= 1461
  if (days > 365) {
    gy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }
  let gd = days + 1
  const leap = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0
  const monthDays = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let gm = 0
  while (gm < 12 && gd > monthDays[gm]!) {
    gd -= monthDays[gm]!
    gm += 1
  }
  return { y: gy, m: gm + 1, d: gd }
}

export function gregorianToJalali(gy: number, gm: number, gd: number): JalaliDate {
  const cumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  const gy2 = gm > 2 ? gy + 1 : gy
  let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + cumulative[gm - 1]!
  let jy = -1595 + 33 * Math.floor(days / 12053)
  days %= 12053
  jy += 4 * Math.floor(days / 1461)
  days %= 1461
  if (days > 365) {
    jy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30)
  const jd = days < 186 ? 1 + (days % 31) : 1 + ((days - 186) % 30)
  return { y: jy, m: jm, d: jd }
}

/** ISO `YYYY-MM-DD` for a Jalali date. */
export function jalaliToIso(date: JalaliDate): string {
  const g = jalaliToGregorian(date)
  return `${g.y}-${pad2(g.m)}-${pad2(g.d)}`
}

/** Jalali date for an ISO `YYYY-MM-DD` string. */
export function isoToJalali(iso: string): JalaliDate {
  const [y, m, d] = iso.split('-').map(Number)
  return gregorianToJalali(y!, m!, d!)
}

/** `۱۴۰۴/۰۲/۲۵` */
export function formatJalaliNumeric({ y, m, d }: JalaliDate): string {
  return irFaDigits(`${y}/${pad2(m)}/${pad2(d)}`)
}

/** `۲۵ اردیبهشت ۱۴۰۴` */
export function formatJalaliLong({ y, m, d }: JalaliDate): string {
  return `${irFaDigits(d)} ${jalaliMonthNames[m - 1]} ${irFaDigits(y)}`
}

/** Today's date as ISO (local time of whoever renders). */
export function todayIso(): string {
  const now = new Date()
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`
}

/** Add days to an ISO date string. */
export function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(y!, m! - 1, d! + days))
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`
}
