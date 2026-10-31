/**
 * Boards and senior management of the subsidiaries — generated from the
 * client's «هیئت‌مدیره و مدیران ارشد» workbook (2026-10-18) and rendered on
 * `/companies/[slug]`, which is where this belongs: these are each
 * subsidiary's own board, not the holding's. ICD's own board is on
 * `/about#board` and comes from a different source (ADR-018).
 *
 * ⛔ WHAT THE WORKBOOK DOES NOT COVER, and the pages show honestly:
 *
 * 1. **«مهندسی و مدیریت ساخت ثاخت» (`icd-engineering`) has no rows at all**,
 *    so its page renders no board section. Nine of the ten subsidiaries are
 *    covered; that one is missing and needs supplying.
 * 2. **No photographs.** The `عکس پرسنلی` column is empty on every real row,
 *    so the cards carry a monogram, not a portrait placeholder.
 * 3. Most rows carry only a name, a role and a year. Education and years of
 *    experience appear on eleven rows; `summary`, `bio`, `quote` and
 *    `committees` are empty throughout, so no card invents any of them.
 * 4. The workbook's first row — «دکتر کاوه رضوانی» of شرکت سرمایه‌گذاری غدیر —
 *    is the template's own filled-in example (it is the only row with a slug,
 *    a photo filename and a biography, and that company is the parent, not a
 *    subsidiary). It is **not** imported. If he is a real board member, he
 *    needs re-entering against a real company.
 *
 * Two roles read «(روزنامه نشده)» — not yet gazetted. That is the client's
 * own wording and it is shown as written; it means the appointment is not yet
 * registered in the official gazette, which a reader of a listed group's site
 * is entitled to see.
 */

export interface CompanyBoardMember {
  /** Company slug in `catalog.ts`. */
  company: string
  name: string
  role: string
  /** «هیئت‌مدیره» or «مدیران اجرایی» — the card groups by this. */
  group: string
  /** «موظف» (executive) or «غیرموظف» (non-executive). */
  membership?: string
  /** Display order within the company, from the workbook. */
  rank: number
  /** Jalali year of appointment. */
  sinceYear?: string
  education?: string
  experienceYears?: number
}

export const companyBoardMembers: CompanyBoardMember[] = [
  { company: 'aria-omran-pars', name: 'دکتر سعید نظری', role: 'مدیرعامل و عضو هیئت‌مدیره', group: 'مدیران اجرایی', membership: 'غیرموظف', rank: 1 },
  { company: 'aria-omran-pars', name: 'اسماعیل اسدی', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 2, sinceYear: '1405' },
  { company: 'aria-omran-pars', name: 'امید خالقی', role: 'نایب رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 3, sinceYear: '1403' },
  { company: 'aria-omran-pars', name: 'مرتضی رحمان زاده', role: 'رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 4 },
  { company: 'aria-omran-pars', name: 'محسن پیرانی', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'موظف', rank: 5 },
  { company: 'aria-omran-pars', name: 'فرهاد جدیدی', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 6 },
  { company: 'asp', name: 'رحمت اله احمدی', role: 'رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 1, sinceYear: '1405' },
  { company: 'asp', name: 'محسن امینی', role: 'نایب رئیس (روزنامه نشده)', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 2, sinceYear: '1403' },
  { company: 'asp', name: 'پرویز توکلی', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 3, sinceYear: '1404' },
  { company: 'asp', name: 'اميد خالقي', role: 'مدیرعامل و عضو (روزنامه نشده)', group: 'مدیران اجرایی', membership: 'موظف', rank: 4, sinceYear: '1404' },
  { company: 'baghmisheh', name: 'حمیدرضا ارشادمنش', role: 'نایب رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 1, sinceYear: '1403' },
  { company: 'baghmisheh', name: 'سیروس فتحعلی زاده', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 2, sinceYear: '1403' },
  { company: 'baghmisheh', name: 'مظفر سلیمانی', role: 'رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 3, sinceYear: '1401' },
  { company: 'baghmisheh', name: 'بهزاد رضایی سامانی', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 4, sinceYear: '1401' },
  { company: 'baghmisheh', name: 'یوسف عطاری خسروشاهی', role: 'مدیرعامل و عضو هیئت‌مدیره', group: 'مدیران اجرایی', membership: 'موظف', rank: 5, sinceYear: '1401' },
  { company: 'ghadir-khuzestan', name: 'آقای علی بهاری', role: 'مدیر اجرایی هیئت تصفیه', group: 'مدیران اجرایی', membership: 'موظف', rank: 1, sinceYear: '1404', education: 'کارشناسی ارشد حقوقی' },
  { company: 'ghadir-khuzestan', name: 'آقای اسماعیل اسدی', role: 'عضو هیئت تصفیه', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 2, sinceYear: '1404', education: 'کارشناسی ارشد حسابداری', experienceYears: 17 },
  { company: 'ghadir-khuzestan', name: 'آقای حسین اسماعیلی کتکی', role: 'عضو هیئت تصفیه', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 3, sinceYear: '1404', education: 'کارشناسی حسابداری', experienceYears: 31 },
  { company: 'ofogh-saze-paya', name: 'سعید شکاری', role: 'مدیر عامل و عضو هیأت مدیره', group: 'مدیران اجرایی', membership: 'موظف', rank: 1, sinceYear: '1405' },
  { company: 'ofogh-saze-paya', name: 'اسماعیل اسدی', role: 'رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 2, sinceYear: '1405', education: 'کارشناسی ارشد حسابداری', experienceYears: 17 },
  { company: 'ofogh-saze-paya', name: 'حسن دلخوش', role: 'نایب رئیس هیأت مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 3, sinceYear: '1405' },
  { company: 'pars-sazeh', name: 'قاسم عابدی', role: 'رئیس هیأت مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 1, sinceYear: '1403' },
  { company: 'pars-sazeh', name: 'علیرضا افشردی', role: 'مدیرعامل و عضو هیئت‌مدیره', group: 'مدیران اجرایی', membership: 'موظف', rank: 2, sinceYear: '1402', education: 'مهندسی عمران', experienceYears: 24 },
  { company: 'pars-sazeh', name: 'ایرج نمکچیان', role: 'عضو هیأت مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 3, sinceYear: '1404' },
  { company: 'peyman-ghadir', name: 'احسان مشتاق', role: 'رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 1, sinceYear: '1403' },
  { company: 'peyman-ghadir', name: 'حمیدرضا خوشدل مفیدی', role: 'مدیر عامل و عضو هیئت‌مدیره', group: 'مدیران اجرایی', membership: 'موظف', rank: 2, sinceYear: '1405', education: 'لیسانس عمران - عمران — ارشد زمین شناسی', experienceYears: 13 },
  { company: 'peyman-ghadir', name: 'محمد معین عباسی', role: 'نایب رئیس هیأت مدیره', group: 'هیئت‌مدیره', membership: 'موظف', rank: 3, sinceYear: '1403' },
  { company: 'sarpanah-fars', name: 'علیرضا افشردی', role: 'رئیس هیأت مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 1, sinceYear: '1403', education: 'مهندسی عمران', experienceYears: 24 },
  { company: 'sarpanah-fars', name: 'میثم باقری', role: 'مدیرعامل و نایب هیأت مدیره', group: 'مدیران اجرایی', membership: 'موظف', rank: 2, sinceYear: '1401', education: 'کارشناسی ارشد مدیریت مالی — کارشناسی مهندسی نرم افزار', experienceYears: 15 },
  { company: 'sarpanah-fars', name: 'ابراهیم قشقایی', role: 'عضو هیأت مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 3, sinceYear: '1403', education: 'کارشناسی حسابداری', experienceYears: 10 },
  { company: 'tisa-kish', name: 'مجتبی قنبری', role: 'رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 1, sinceYear: '1403' },
  { company: 'tisa-kish', name: 'رضا مدرس', role: 'نایب رئیس هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 2, sinceYear: '1404' },
  { company: 'tisa-kish', name: 'عبدالرضا امینائی چترودی', role: 'مدیرعامل و عضو هیئت‌مدیره', group: 'مدیران اجرایی', membership: 'موظف', rank: 3, sinceYear: '1402' },
  { company: 'tisa-kish', name: 'مهدی حقیقی', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 4, sinceYear: '1404' },
  { company: 'tisa-kish', name: 'هادی شعبانی', role: 'عضو هیئت‌مدیره', group: 'هیئت‌مدیره', membership: 'غیرموظف', rank: 5, sinceYear: '1405' },
]

/** That company's board, in the workbook's own order. */
export function boardOf(companySlug: string): CompanyBoardMember[] {
  return companyBoardMembers
    .filter(m => m.company === companySlug)
    .sort((a, b) => a.rank - b.rank)
}

/**
 * Two initials for the monogram the cards show in place of a portrait.
 * Honorifics in the workbook («آقای», «دکتر») are dropped first so the
 * monogram reads as the person's own initials.
 */
const HONORIFICS = ['آقای', 'خانم', 'دکتر', 'مهندس', 'سرکار']

export function memberInitials(name: string): string {
  const parts = name.split(/\s+/).filter(p => p && !HONORIFICS.includes(p))
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1]![0] : ''
  return `${first}\u200c${last}`.trim()
}
