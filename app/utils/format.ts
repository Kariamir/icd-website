/** Display formatting shared by every view. */

const FA = '۰۱۲۳۴۵۶۷۸۹'

/** Latin digits → Persian digits. Leaves everything else untouched. */
export function faDigits(value: string | number): string {
  return String(value).replace(/\d/g, d => FA[Number(d)]!)
}

/** 12500 → «۱۲٬۵۰۰» */
export function faNumber(value: number, fractionDigits = 0): string {
  const s = value.toLocaleString('en-US', { maximumFractionDigits: fractionDigits, minimumFractionDigits: 0 })
  return faDigits(s.replace(/,/g, '٬'))
}

/** 42000 → «۴۲٬۰۰۰ مترمربع» */
export function faArea(sqm: number): string {
  return `${faNumber(sqm)} مترمربع`
}

/** Two-digit ordinal used on numbered tiles: 1 → «۰۱» */
export function faIndex(i: number): string {
  return faDigits(String(i).padStart(2, '0'))
}
