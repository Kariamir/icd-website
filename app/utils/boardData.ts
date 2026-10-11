/**
 * Mock content for /about/board (index) and /about/board/[slug] (detail) —
 * placeholder pending the real WordPress data layer (ADR-002).
 *
 * The base fields (slug, name, role, image, bioHtml) are the
 * BoardMemberViewModel contract used by the /about/board index grid and
 * searchData.ts. The profile page (/about/board/[slug], laid out in the
 * `04_article_detail` editorial language) needs more, so the extra fields
 * live on BoardMemberExtended below — additive only, nothing renamed.
 */
import type { BoardMemberViewModel } from '~/types/content'

const IMG = (seed: string) => ({ src: `/img/placeholder.svg`, alt: '' })

export interface BoardCareerItem {
  period: string
  title: string
  organization: string
}

export interface BoardMemberExtended extends BoardMemberViewModel {
  /** «عضو موظف» / «عضو غیرموظف» / «مستقل». */
  memberType?: string
  /** Jalali year the member joined the board (display string). */
  sinceYear?: string
  education?: string
  experienceYears?: number
  /** Short standfirst shown under the name (the article «lead»). */
  summary?: string
  committees?: string[]
  expertise?: string[]
  quote?: string
  career?: BoardCareerItem[]
  /** Representative legal entity on the board, if any. */
  representing?: string
}

export const boardMembers: BoardMemberExtended[] = [
  {
    slug: 'seyed-alireza-hosseini',
    name: 'مهندس سید علیرضا حسینی',
    role: 'مدیرعامل و نایب رئیس هیات‌مدیره',
    image: IMG('board-1'),
    bioHtml: '<p>بیش از ۲۵ سال سابقه اجرایی در صنعت ساختمان و مدیریت پروژه‌های کلان ملی. مسئول راهبری استراتژیک هلدینگ از سال ۱۴۰۰.</p>',
    memberType: 'عضو موظف',
    sinceYear: '۱۴۰۰',
    education: 'کارشناسی ارشد مهندسی عمران — مدیریت ساخت، دانشگاه صنعتی شریف',
    experienceYears: 27,
    summary: 'راهبری تحول هلدینگ از پیمانکاری ساختمانی به توسعه‌دهنده مگاپروژه‌های چندمنظوره و تثبیت انضباط مالی و گزارش‌گری شفاف در بازار سرمایه.',
    committees: ['کمیته راهبردی (رئیس)', 'کمیته ریسک'],
    expertise: ['مدیریت پروژه‌های کلان', 'توسعه املاک', 'تامین مالی پروژه', 'حاکمیت شرکتی'],
    quote: '«ما هیچ‌وقت سریع‌ترین سازنده نبودیم؛ تلاش کردیم قابل اعتمادترین باشیم.»',
    representing: 'شرکت سرمایه‌گذاری توسعه ساختمان',
    career: [
      { period: '۱۴۰۰ — اکنون', title: 'مدیرعامل و نایب رئیس هیات‌مدیره', organization: 'هلدینگ ساختمانی ثاخت' },
      { period: '۱۳۹۴ — ۱۴۰۰', title: 'معاون اجرایی و مدیر پروژه مگاپارس', organization: 'هلدینگ ساختمانی ثاخت' },
      { period: '۱۳۸۶ — ۱۳۹۴', title: 'مدیر پروژه‌های بلندمرتبه', organization: 'گروه مهندسی مشاور پارس' },
      { period: '۱۳۷۷ — ۱۳۸۶', title: 'مهندس کارگاه و سرپرست اجرا', organization: 'شرکت‌های پیمانکاری ابنیه' },
    ],
  },
  {
    slug: 'mehrdad-saniei',
    name: 'دکتر مهرداد صنیعی',
    role: 'معاونت مهندسی و توسعه پایدار',
    image: IMG('board-2'),
    bioHtml: '<p>دکترای مهندسی عمران-ژئوتکنیک، مسئول سیاست‌گذاری فنی پروژه‌های مگاپروژه و استانداردهای ساختمان سبز هلدینگ.</p>',
    memberType: 'عضو موظف',
    sinceYear: '۱۳۹۹',
    education: 'دکترای مهندسی عمران — ژئوتکنیک، دانشگاه تهران',
    experienceYears: 22,
    summary: 'طراح نظام فنی و استانداردهای ساختمان سبز هلدینگ؛ پیشگام به‌کارگیری مدل‌سازی اطلاعات ساختمان و پایش سلامت سازه در پروژه‌های ثاخت.',
    committees: ['کمیته فنی و مهندسی', 'کمیته پایداری و ESG (رئیس)'],
    expertise: ['مهندسی ژئوتکنیک', 'ساختمان سبز و LEED', 'BIM', 'مهندسی ارزش'],
    quote: '«سرعت ساخت بدون شفافیت مالی، تنها ریسک را به آینده منتقل می‌کند.»',
    career: [
      { period: '۱۳۹۹ — اکنون', title: 'معاونت مهندسی و توسعه پایدار', organization: 'هلدینگ ساختمانی ثاخت' },
      { period: '۱۳۹۲ — ۱۳۹۹', title: 'مدیر دفتر فنی مرکزی', organization: 'هلدینگ ساختمانی ثاخت' },
      { period: '۱۳۸۵ — ۱۳۹۲', title: 'عضو هیات علمی و مشاور ژئوتکنیک', organization: 'دانشگاه تهران' },
    ],
  },
  {
    slug: 'kaveh-rezvani',
    name: 'دکتر کاوه رضوانی',
    role: 'رئیس هیات‌مدیره',
    image: IMG('board-3'),
    bioHtml: '<p>عضو هیات‌مدیره از سال ۱۳۹۸ و مسئول نظارت بر حاکمیت شرکتی و روابط سرمایه‌گذاران.</p>',
    memberType: 'عضو غیرموظف',
    sinceYear: '۱۳۹۸',
    education: 'دکترای اقتصاد، دانشگاه علامه طباطبایی',
    experienceYears: 30,
    summary: 'ناظر بر حاکمیت شرکتی، کنترل‌های داخلی و روابط سرمایه‌گذاران؛ هدایت‌کننده برنامه شفافیت و افشای اطلاعات هلدینگ در سامانه کدال.',
    committees: ['کمیته حاکمیت شرکتی (رئیس)', 'کمیته حسابرسی'],
    expertise: ['حاکمیت شرکتی', 'بازار سرمایه', 'مدیریت ریسک', 'روابط سرمایه‌گذاران'],
    quote: '«هیات‌مدیره پاسخگوی سهامدار است، نه صرفاً ناظر مدیریت.»',
    representing: 'صندوق بازنشستگی کارکنان صنعت ساختمان',
    career: [
      { period: '۱۴۰۱ — اکنون', title: 'رئیس هیات‌مدیره', organization: 'هلدینگ ساختمانی ثاخت' },
      { period: '۱۳۹۸ — ۱۴۰۱', title: 'عضو غیرموظف هیات‌مدیره', organization: 'هلدینگ ساختمانی ثاخت' },
      { period: '۱۳۸۸ — ۱۳۹۸', title: 'مدیر سرمایه‌گذاری', organization: 'شرکت تامین سرمایه نوین' },
    ],
  },
  {
    slug: 'kambiz-mohtashami',
    name: 'دکتر کامبیز محتشمی',
    role: 'عضو غیرموظف هیات‌مدیره',
    image: IMG('board-4'),
    bioHtml: '<p>استاد دانشگاه و مشاور عالی تکنولوژی بتن، مسئول کمیته فنی و کنترل کیفیت اجرای پروژه‌ها.</p>',
    memberType: 'عضو غیرموظف',
    sinceYear: '۱۴۰۱',
    education: 'دکترای مهندسی سازه — تکنولوژی بتن، دانشگاه امیرکبیر',
    experienceYears: 25,
    summary: 'مشاور عالی تکنولوژی بتن در پروژه‌های ساحلی و بلندمرتبه؛ مسئول نظارت مستقل بر کیفیت اجرای پروژه‌های هلدینگ.',
    committees: ['کمیته فنی و مهندسی (رئیس)', 'کمیته حسابرسی'],
    expertise: ['تکنولوژی بتن', 'دوام سازه‌های ساحلی', 'کنترل کیفیت', 'آموزش مهندسی'],
    quote: '«در محیط ساحلی، کیفیت پوشش بتن مهم‌تر از مقاومت فشاری آن است.»',
    career: [
      { period: '۱۴۰۱ — اکنون', title: 'عضو مستقل هیات‌مدیره', organization: 'هلدینگ ساختمانی ثاخت' },
      { period: '۱۳۹۰ — اکنون', title: 'استاد دانشکده مهندسی عمران', organization: 'دانشگاه امیرکبیر' },
      { period: '۱۳۹۵ — ۱۴۰۱', title: 'مشاور عالی تکنولوژی بتن', organization: 'پروژه‌های ساحلی کیش' },
    ],
  },
]

export function getBoardMember(slug: string): BoardMemberExtended | undefined {
  return boardMembers.find(m => m.slug === slug)
}

// ---------------------------------------------------------------------------
// Template `02a-index-card-grid` for /about/board — extra members (senior
// management, placeholder pending WordPress) and index fields for the group /
// membership / committee filters and sort. Add-only.
// ---------------------------------------------------------------------------

boardMembers.push(
  {
    slug: 'nasrin-farahani',
    name: 'دکتر نسرین فراهانی',
    role: 'عضو مستقل هیات‌مدیره',
    image: IMG('board-5'),
    bioHtml: '<p>دکترای مدیریت مالی و عضو کمیته حسابرسی؛ بیش از ۱۸ سال سابقه در بازار سرمایه و نهادهای مالی.</p>',
  },
  {
    slug: 'hamid-tavakoli',
    name: 'مهندس حمید توکلی',
    role: 'معاون اجرایی و مدیر پروژه‌های کلان',
    image: IMG('board-6'),
    bioHtml: '<p>مدیریت اجرای برج بین‌المللی تهران و پروژه‌های ساحلی هلدینگ؛ متخصص مدیریت ساخت و برنامه‌ریزی پروژه.</p>',
  },
  {
    slug: 'maryam-jafari',
    name: 'دکتر مریم جعفری',
    role: 'مدیر مالی (CFO)',
    image: IMG('board-7'),
    bioHtml: '<p>مسئول تامین مالی پروژه‌ها، گزارشگری مالی و انتشار اطلاعات در سامانه کدال.</p>',
  },
  {
    slug: 'reza-ahmadi',
    name: 'مهندس رضا احمدی',
    role: 'مدیر فروش و بازاریابی',
    image: IMG('board-8'),
    bioHtml: '<p>راهبری فروش و پیش‌فروش واحدهای هلدینگ و توسعه شبکه مشاوران فروش در تهران و شهرستان‌ها.</p>',
  },
  {
    slug: 'ali-karimi',
    name: 'دکتر علی کریمی',
    role: 'مدیر حقوقی و دبیر هیات‌مدیره',
    image: IMG('board-9'),
    bioHtml: '<p>مسئول امور حقوقی، قراردادها و دبیرخانه هیات‌مدیره و مجامع عمومی هلدینگ.</p>',
  },
)

export type BoardGroupKey = 'board' | 'executive'
export const BOARD_GROUPS: Record<BoardGroupKey, string> = {
  board: 'اعضای هیات‌مدیره',
  executive: 'مدیران ارشد اجرایی',
}

interface BoardIndexFields {
  group: BoardGroupKey
  /** موظف / غیرموظف / مستقل / اجرایی */
  membership: string
  committee: string
  sinceYear: number
  education: string
  /** Organisational order for the default sort (lower = higher rank). */
  rank: number
}

export const boardIndexFields: Record<string, BoardIndexFields> = {
  'kaveh-rezvani': { group: 'board', membership: 'غیرموظف', committee: 'کمیته حاکمیت شرکتی', sinceYear: 1398, education: 'دکترای اقتصاد', rank: 1 },
  'seyed-alireza-hosseini': { group: 'board', membership: 'موظف', committee: 'کمیته راهبردی', sinceYear: 1400, education: 'کارشناسی ارشد عمران', rank: 2 },
  'mehrdad-saniei': { group: 'board', membership: 'موظف', committee: 'کمیته فنی و مهندسی', sinceYear: 1399, education: 'دکترای ژئوتکنیک', rank: 3 },
  'kambiz-mohtashami': { group: 'board', membership: 'غیرموظف', committee: 'کمیته فنی و مهندسی', sinceYear: 1401, education: 'دکترای تکنولوژی بتن', rank: 4 },
  'nasrin-farahani': { group: 'board', membership: 'مستقل', committee: 'کمیته حسابرسی', sinceYear: 1402, education: 'دکترای مدیریت مالی', rank: 5 },
  'hamid-tavakoli': { group: 'executive', membership: 'اجرایی', committee: 'کمیته راهبردی', sinceYear: 1401, education: 'کارشناسی ارشد مدیریت ساخت', rank: 6 },
  'maryam-jafari': { group: 'executive', membership: 'اجرایی', committee: 'کمیته حسابرسی', sinceYear: 1400, education: 'دکترای حسابداری', rank: 7 },
  'reza-ahmadi': { group: 'executive', membership: 'اجرایی', committee: 'کمیته فروش و بازاریابی', sinceYear: 1402, education: 'کارشناسی ارشد MBA', rank: 8 },
  'ali-karimi': { group: 'executive', membership: 'اجرایی', committee: 'کمیته حاکمیت شرکتی', sinceYear: 1399, education: 'دکترای حقوق تجارت', rank: 9 },
}

// ---------------------------------------------------------------------------
// Profile view (/about/board/[slug], `04_article_detail` language) — fills
// the optional BoardMemberExtended fields from boardIndexFields for members
// that don't carry a full profile yet. Read-only merge; add-only.
// ---------------------------------------------------------------------------

const faDigits = (n: number) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)] ?? d)

export function getBoardProfile(slug: string): BoardMemberExtended | undefined {
  const member = getBoardMember(slug)
  if (!member) return undefined
  const idx = boardIndexFields[slug]
  if (!idx) return member
  return {
    ...member,
    memberType: member.memberType ?? (idx.membership === 'اجرایی' ? 'مدیر ارشد اجرایی' : `عضو ${idx.membership}`),
    sinceYear: member.sinceYear ?? faDigits(idx.sinceYear),
    education: member.education ?? idx.education,
    committees: member.committees ?? [idx.committee],
  }
}
