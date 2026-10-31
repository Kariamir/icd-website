/**
 * ICD's own governance — the board, the senior executives and the three
 * specialist committees (ADR-024).
 *
 * SOURCE: the client's CODAL disclosures, supplied 1405/08 as
 * `Asset Icd/هیئت‌مدیره/هیئت‌مدیره.png` and the three sheets in
 * `Asset Icd/کمیته ها/`. These are signed regulatory filings, so the names,
 * roles, legal shareholders, موظف/غیرموظف status and qualifications below are
 * transcribed from them verbatim rather than paraphrased.
 *
 * This closes ADR-018's ⛔ flag that `#board` showed the executive team and
 * not the board. Note what the filings actually say: علیرضا قربانی is both
 * نایب‌رئیس هیئت‌مدیره and مدیرعامل, which the site previously did not state,
 * and he is the board's only موظف member.
 *
 * ⛔ Two gaps remain for the client:
 *   1. No دبیر هیئت‌مدیره is named in any supplied document. The section
 *      below renders a smaller secretary card when `boardSecretary` is set
 *      (the owner asked for that treatment); until a name arrives it is null
 *      and the card is simply absent.
 *   2. The portrait `mohammadamin-fallah.jpg` is identified **by
 *      elimination** — the folder holds one labelled portrait for every board
 *      member except قربانی and فلاح, and قربانی's was confirmed against the
 *      portrait already on the site. Confirm before launch; a misattributed
 *      face on a board page is worse than no face.
 */

export interface BoardMember {
  slug: string
  name: string
  /** Position on the board, as the filing words it. */
  role: string
  /** The legal shareholder this person represents. */
  represents?: string
  /** موظف / غیرموظف — disclosure, not decoration. */
  executive: boolean
  education: string
  /** Portrait supplied by the client, 1254×1254. */
  image?: string
  /** True for the chair, who leads the grid. */
  lead?: boolean
}

export const icdBoard: BoardMember[] = [
  {
    slug: 'aliakbar-soleimani',
    name: 'علی‌اکبر سلیمانی',
    role: 'رئیس هیئت‌مدیره',
    represents: 'شرکت سرمایه‌گذاری غدیر',
    executive: false,
    education: 'کارشناسی مهندسی عمران',
    image: '/img/board/aliakbar-soleimani.jpg',
    lead: true,
  },
  {
    slug: 'alireza-ghorbani',
    name: 'علیرضا قربانی',
    role: 'نایب‌رئیس هیئت‌مدیره و مدیرعامل',
    represents: 'شرکت سرمایه‌گذاری زرین پرشیا',
    executive: true,
    education: 'کارشناسی ارشد مهندسی عمران',
    image: '/img/board/alireza-ghorbani.jpg',
    lead: true,
  },
  {
    slug: 'mohsen-jafarnia',
    name: 'محسن جعفرنیا',
    role: 'عضو هیئت‌مدیره',
    represents: 'شرکت صنعتی و بازرگانی غدیر',
    executive: false,
    education: 'کارشناسی ارشد مهندسی عمران',
    image: '/img/board/mohsen-jafarnia.jpg',
  },
  {
    slug: 'ali-sari',
    name: 'علی ساری',
    role: 'عضو هیئت‌مدیره',
    represents: 'شرکت سرمایه‌گذاری اعتضاد غدیر',
    executive: false,
    education: 'کارشناسی ارشد مدیریت',
    image: '/img/board/ali-sari.jpg',
  },
  {
    slug: 'mohammadamin-fallah',
    name: 'محمدامین فلاح',
    role: 'عضو هیئت‌مدیره',
    /* Represented shareholder and qualifications corrected by the owner
       1405/08 (ADR-028); the CODAL transcription had the earlier incumbent's
       details against this seat. The «سوابق» row added with them is gone
       again at the owner's instruction (ADR-029) — every board card carries
       the same three facts, and one card with an extra row reads as a
       ranking rather than a difference in what was supplied. */
    represents: 'شرکت پیشگامان اندیشه پویا کارمانیا',
    executive: false,
    education: 'دکترای مدیریت مالی، دانشگاه علامه طباطبایی',
    image: '/img/board/mohammadamin-fallah.jpg',
  },
]

/**
 * The board secretary, named by the client 1405/08 (ADR-026) — this closes
 * ADR-024's open flag. He is shown below the board at a deliberately smaller
 * size, which is the treatment the owner asked for, and he also appears among
 * the senior managers in his line role; the two are different jobs.
 */
export const boardSecretary: { slug: string, name: string, role: string, image?: string } = {
  slug: 'vahid-razafzoun',
  name: 'وحید رازافزون',
  role: 'دبیر هیئت‌مدیره',
}

/**
 * The deputies — a tier of their own between the board and the line managers
 * (ADR-026). Cards here are a step smaller than a board card and a step
 * larger than a senior manager's, which is the hierarchy the owner asked the
 * design to show.
 *
 * «فلاحی» was removed at the owner's instruction (ADR-027) — the record had
 * only a bare surname and an advisory title, so there is nothing left to
 * flag.
 */
export const icdDeputies: { slug: string, name: string, role: string, image?: string }[] = [
  { slug: 'mohammad-rahimi-moghadam', name: 'محمد رحیمی مقدم', role: 'معاون برنامه‌ریزی و سرمایه‌گذاری', image: '/img/board/mohammad-rahimi-moghadam.jpg' },
  { slug: 'abbas-jalalian', name: 'عباس جلالیان', role: 'معاون مالی و منابع انسانی', image: '/img/board/abbas-jalalian.jpg' },
]

/**
 * Senior managers. رحیمی مقدم and جلالیان moved up to `icdDeputies` at the
 * owner's instruction and are deliberately not repeated here — one person,
 * one place.
 *
 * «امیر شیرین‌بیگ‌پور — مدیر حقوقی» was removed at the owner's instruction
 * (ADR-028), which settles ADR-027's duplicate: امید بیگ‌پور holds the post.
 */
export const icdExecutives: { slug: string, name: string, role: string, image?: string }[] = [
  { slug: 'amirhossein-nouripour', name: 'امیرحسین نوری‌پور', role: 'مدیر املاک و مستغلات' },
  { slug: 'omid-beigpour', name: 'امید بیگ‌پور', role: 'مدیر حقوقی و قراردادها', image: '/img/board/omid-beigpour.jpg' },
  { slug: 'vahid-razafzoun', name: 'وحید رازافزون', role: 'مدیر حوزه مدیرعامل و روابط عمومی' },
]

export interface CommitteeMember {
  name: string
  role: 'رئیس کمیته' | 'عضو کمیته'
  education: string
  /** عضو مستقل per the filing. */
  independent: boolean
  /** Board member sitting on the committee — the legal shareholder they represent. */
  represents?: string
  /** کمیته حسابرسی only: عضو مالی. */
  financialExpert?: boolean
}

export interface Committee {
  id: string
  name: string
  /** Formation date, solar hijri, as filed. */
  formed: string
  mandate: string
  members: CommitteeMember[]
  secretary: { name: string, title: string, education: string }
}

export const icdCommittees: Committee[] = [
  {
    id: 'audit',
    name: 'کمیته حسابرسی',
    formed: '۱۳۹۲/۰۴/۲۰',
    mandate: 'نظارت بر فرایند گزارشگری مالی، اثربخشی کنترل‌های داخلی، عملکرد حسابرس مستقل و واحد حسابرسی داخلی.',
    members: [
      { name: 'علی ساری', role: 'رئیس کمیته', education: 'کارشناسی ارشد مدیریت', independent: false, represents: 'شرکت سرمایه‌گذاری اعتضاد غدیر' },
      { name: 'همایون اسدی', role: 'عضو کمیته', education: 'دکترا مدیریت مالی', independent: true, financialExpert: true },
      { name: 'ناصر رزاق', role: 'عضو کمیته', education: 'دکترا مدیریت کسب‌وکار', independent: true, financialExpert: true },
      { name: 'مهدی پناهی اصل', role: 'عضو کمیته', education: 'کارشناسی ارشد مدیریت منابع انسانی', independent: true, financialExpert: true },
      { name: 'شهاب علوی طلب', role: 'عضو کمیته', education: 'کارشناسی ارشد مدیریت مالی', independent: true, financialExpert: true },
    ],
    secretary: { name: 'امید احمدی راد', title: 'مدیر واحد حسابرسی داخلی', education: 'کارشناسی ارشد حسابداری' },
  },
  {
    id: 'appointments',
    name: 'کمیته انتصابات',
    formed: '۱۴۰۴/۰۷/۰۲',
    mandate: 'شناسایی و ارزیابی نامزدهای عضویت در هیئت‌مدیره و مدیریت ارشد، و پیشنهاد سازوکار جانشین‌پروری.',
    members: [
      { name: 'علی‌اکبر سلیمانی', role: 'رئیس کمیته', education: 'کارشناسی مهندسی عمران', independent: false, represents: 'شرکت سرمایه‌گذاری غدیر' },
      { name: 'بقراط رشوند هرانکی', role: 'عضو کمیته', education: 'دکترا مدیریت', independent: true },
      { name: 'مجتبی قنبری', role: 'عضو کمیته', education: 'کارشناسی ارشد مهندسی عمران', independent: true },
    ],
    secretary: { name: 'عباس جلالیان', title: 'معاون مالی و اداری', education: 'کارشناسی ارشد مدیریت بازرگانی' },
  },
  {
    id: 'risk',
    name: 'کمیته ریسک',
    formed: '۱۴۰۳/۰۵/۰۷',
    mandate: 'شناسایی، ارزیابی و پایش ریسک‌های راهبردی، مالی، اجرایی و انطباقی گروه و پیشنهاد سقف پذیرش ریسک.',
    members: [
      { name: 'محسن جعفرنیا', role: 'رئیس کمیته', education: 'کارشناسی ارشد مهندسی عمران', independent: false, represents: 'شرکت صنعتی و بازرگانی غدیر' },
      { name: 'رامین افشاری', role: 'عضو کمیته', education: 'کارشناسی ارشد مهندسی عمران', independent: true },
      { name: 'حسن عابدی', role: 'عضو کمیته', education: 'دکترا حسابداری', independent: true },
      { name: 'عباس منتظری', role: 'عضو کمیته', education: 'دکترا مدیریت', independent: true },
      { name: 'محمد رحیمی مقدم', role: 'عضو کمیته', education: 'دکترا مهندسی صنایع', independent: false },
    ],
    secretary: { name: 'سمانه کبیری راد', title: 'مدیر سرمایه‌گذاری شرکت', education: 'کارشناسی ارشد علوم اقتصادی' },
  },
]

/** Initials for a portrait-less card — honorifics stripped. */
export function initialsOf(name: string): string {
  return name
    .replace(/^(آقای|خانم|دکتر|مهندس|سرکار خانم|جناب آقای)\s+/u, '')
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0] ?? '')
    .join('')
}
