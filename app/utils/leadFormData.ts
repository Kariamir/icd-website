/**
 * Mock configuration for the lead / consultation form family
 * (`LeadForm.vue`, template `06-form-lead` —
 * project_detail_page_template/06_form_lead). Used by /contact,
 * /complaints. The CEO direct-message channel was removed with the CEO
 * page (ADR-010). Placeholder copy pending the real WordPress data
 * layer and a real submission endpoint (docs/decisions.md ADR-002).
 */

export interface LeadFormField {
  key: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
  /** Extra client-side format check on top of `required`. */
  validate?: 'mobile' | 'nationalId' | 'url'
  /** Render the control left-to-right (phone numbers, e-mails, links). */
  ltr?: boolean
  /** Occupy the full row instead of one grid column (textareas always do). */
  wide?: boolean
  /** Initially selected option for `select` fields. */
  defaultValue?: string
  hint?: string
}

export interface LeadFormInquiryType {
  key: string
  label: string
  /** Field set shown while this inquiry type is active. */
  fields: LeadFormField[]
  /** Short line shown under the pills explaining where the request goes. */
  routingNote?: string
}

export type LeadFormBadgeTone = 'success' | 'info' | 'warning' | 'neutral'

export interface LeadFormDepartment {
  key: string
  title: string
  badge: string
  badgeTone: LeadFormBadgeTone
  description: string
  ctaLabel: string
  icon: 'leadership' | 'tender' | 'sales' | 'shareholder'
  /** Inquiry type that the card's CTA activates in the form below. */
  inquiryKey: string
}

export interface LeadFormHelpDesk {
  eyebrow: string
  title: string
  description: string
  hours: string
  address: string
  phones: { label: string; number: string; tel: string; extension: string }[]
}

export interface LeadFormBreadcrumb {
  label: string
  href?: string
}

// --- reusable field definitions -------------------------------------------

const nameField: LeadFormField = { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true, placeholder: 'مثال: علی رضایی' }
const nationalIdField: LeadFormField = { key: 'nationalId', label: 'کد ملی یا شناسه حقوقی', type: 'text', required: true, placeholder: '۱۰ رقم کد ملی یا ۱۱ رقم شناسه ملی', validate: 'nationalId', ltr: true }
const mobileField: LeadFormField = { key: 'phone', label: 'شماره تلفن همراه', type: 'tel', required: true, placeholder: '۰۹۱۲XXXXXXX (جهت ارسال کد رهگیری)', validate: 'mobile', ltr: true }
const emailOptionalField: LeadFormField = { key: 'email', label: 'آدرس پست الکترونیکی (اختیاری)', type: 'email', placeholder: 'name@example.com', ltr: true }

export const leadProjectOptions = [
  'مگاپروژه اداری تجاری مگاپارس (تهران)',
  'مجتمع تجاری اقامتی آ.اس.پ مشهد',
  'برج بین‌المللی تهران',
  'پروژه رویای کیش و هتل‌های ساحلی',
  'حوزه عمومی سرمایه‌گذاری و مشارکت کلان',
]

export const leadRoleOptions = [
  'متقاضی پیش‌خرید یا مشاوره ملکی',
  'سهامدار حقیقی یا حقوقی نماد ثاخت',
  'پیمانکار، مهندس مشاور یا تامین‌کننده',
  'سازمان دولتی، شهرداری یا شریک تجاری',
  'سایر امور عمومی و سوت‌زنی',
]

// --- inquiry types (segmented pills above the form) -----------------------

export const leadInquiryTypes: LeadFormInquiryType[] = [
  {
    key: 'sales',
    label: 'درخواست مشاوره خرید و پیش‌فروش',
    routingNote: 'ارجاع به دپارتمان فروش و پیش‌فروش — پاسخ در کمتر از ۲۴ ساعت کاری',
    fields: [
      nameField,
      nationalIdField,
      mobileField,
      emailOptionalField,
      { key: 'project', label: 'پروژه یا حوزه مورد نظر', type: 'select', placeholder: 'انتخاب پروژه یا دپارتمان...', options: leadProjectOptions },
      { key: 'role', label: 'نقش / موقعیت شما', type: 'select', required: true, placeholder: 'انتخاب نوع تقاضا...', options: leadRoleOptions, defaultValue: leadRoleOptions[0] },
      { key: 'message', label: 'شرح درخواست یا پیام', type: 'textarea', required: true, placeholder: 'جزئیات درخواست، متراژ مد نظر، شرایط پیشنهادی پرداخت یا سوال تخصصی خود را به صورت مشروح بنویسید...' },
    ],
  },
  {
    key: 'contractor',
    label: 'همکاری و مناقصات پیمانکاری',
    routingNote: 'ارجاع به سامانه ارزیابی کیفی پیمانکاران و تامین‌کنندگان',
    fields: [
      { key: 'company', label: 'نام شرکت / مجموعه', type: 'text', required: true, placeholder: 'مثال: شرکت مهندسی سازه‌گستر' },
      { key: 'nationalId', label: 'شناسه ملی شرکت', type: 'text', required: true, placeholder: '۱۱ رقم شناسه ملی', validate: 'nationalId', ltr: true },
      mobileField,
      { key: 'grade', label: 'رتبه و رشته صلاحیت', type: 'select', required: true, placeholder: 'انتخاب رتبه...', options: ['رتبه ۱ ابنیه', 'رتبه ۱ تاسیسات', 'رتبه ۲ ابنیه', 'تامین‌کننده متریال', 'مهندس مشاور'] },
      { key: 'contactName', label: 'نام نماینده رابط', type: 'text', required: true, placeholder: 'مثال: مهندس کاظمی' },
      { key: 'website', label: 'وب‌سایت یا رزومه آنلاین (اختیاری)', type: 'text', placeholder: 'https://', validate: 'url', ltr: true },
      { key: 'message', label: 'معرفی توانمندی‌ها و سوابق', type: 'textarea', required: true, placeholder: 'پروژه‌های شاخص، ظرفیت اجرایی و حوزه‌های تخصصی شرکت را شرح دهید...' },
    ],
  },
  {
    key: 'shareholder',
    label: 'امور سهامداران و سوالات کدال',
    routingNote: 'ارجاع به مدیریت امور سهام و ارتباط با سرمایه‌گذاران',
    fields: [
      nameField,
      nationalIdField,
      mobileField,
      { key: 'sejamCode', label: 'کد بورسی / سجام (اختیاری)', type: 'text', placeholder: 'مثال: ثاخ۱۲۳۴۵', ltr: true },
      { key: 'topic', label: 'موضوع استعلام', type: 'select', required: true, placeholder: 'انتخاب موضوع...', options: ['مطالبات سود سهام', 'اصلاح مشخصات بانکی سجام', 'اطلاعیه‌های مجمع', 'ارزش خالص دارایی‌ها (NAV)', 'سایر'] },
      emailOptionalField,
      { key: 'message', label: 'شرح درخواست', type: 'textarea', required: true, placeholder: 'درخواست یا پرسش خود درباره سهام ثاخت را بنویسید...' },
    ],
  },
  {
    key: 'complaint',
    label: 'شکایات و پیشنهادات (سامانه سوت‌زنی)',
    routingNote: 'ارجاع محرمانه به واحد بازرسی — ثبت بدون نام نیز امکان‌پذیر است',
    fields: [
      { key: 'name', label: 'نام و نام خانوادگی (اختیاری)', type: 'text', placeholder: 'می‌توانید ناشناس باقی بمانید' },
      { key: 'phone', label: 'شماره تلفن همراه (اختیاری)', type: 'tel', placeholder: '۰۹۱۲XXXXXXX', validate: 'mobile', ltr: true },
      emailOptionalField,
      { key: 'category', label: 'نوع گزارش', type: 'select', required: true, placeholder: 'انتخاب نوع گزارش...', options: ['شکایت', 'پیشنهاد', 'گزارش تخلف (سوت‌زنی)'] },
      { key: 'project', label: 'پروژه یا واحد مرتبط', type: 'select', placeholder: 'انتخاب پروژه...', options: leadProjectOptions },
      { key: 'incidentDate', label: 'تاریخ تقریبی رخداد (اختیاری)', type: 'text', placeholder: 'مثال: ۱۴۰۳/۰۷/۱۵', ltr: true },
      { key: 'message', label: 'شرح موضوع', type: 'textarea', required: true, placeholder: 'شرح کامل شکایت، پیشنهاد یا تخلف مشاهده‌شده را بنویسید...' },
    ],
  },
]

// --- department cards (the four blocks under the hero) --------------------

export const leadDepartments: LeadFormDepartment[] = [
  {
    key: 'contractor',
    title: 'جذب پیمانکاران، تامین‌کنندگان و مناقصات',
    badge: 'سامانه ارزیابی کیفی',
    badgeTone: 'info',
    description: 'ثبت اعلام آمادگی و اعلام توانمندی شرکت‌های پیمانکاری جهت مشارکت در ساخت و زنجیره تامین متریال ساختمانی پروژه‌های ملی.',
    ctaLabel: 'ارسال رزومه و معرفی شرکت',
    icon: 'tender',
    inquiryKey: 'contractor',
  },
  {
    key: 'sales',
    title: 'مشاوره خرید و پیش‌فروش واحدها',
    badge: 'تضمین قطعی تحویل',
    badgeTone: 'warning',
    description: 'دریافت مشاوره رایگان سرمایه‌گذاری ملکی در پروژه‌های مگاپارس، آ.اس.پ مشهد، برج بین‌المللی تهران و تسهیلات اقساطی.',
    ctaLabel: 'درخواست وقت مشاوره تخصصی',
    icon: 'sales',
    inquiryKey: 'sales',
  },
  {
    key: 'shareholder',
    title: 'امور سهامداری، سود و کدال',
    badge: 'نماد بورس: ثاخت',
    badgeTone: 'neutral',
    description: 'استعلام مطالبات سود سهام، اصلاح مشخصات بانکی سجام، دسترسی به اطلاعیه‌های مجمع و ارزش خالص دارایی‌ها (NAV).',
    ctaLabel: 'پیگیری وضعیت سهامداری',
    icon: 'shareholder',
    inquiryKey: 'shareholder',
  },
]

// --- dark help-desk banner -------------------------------------------------

export const leadHelpDesk: LeadFormHelpDesk = {
  eyebrow: 'میز خدمت مستقیم ذی‌نفعان',
  title: 'نیاز به گفتگوی فوری با مشاوران ارشد فروش دارید؟',
  description: 'کارشناسان دپارتمان سرمایه‌گذاری و امور سهامداری هلدینگ بین‌المللی توسعه ساختمان در ساعات اداری پاسخگوی سوالات شما هستند. همچنین امکان تعیین وقت مشاوره حضوری در دفتر مرکزی فراهم است.',
  hours: 'ساعات کاری: شنبه تا چهارشنبه ۸:۰۰ الی ۱۶:۳۰',
  address: 'دفتر مرکزی: تهران - میدان آرژانتین - خیابان احمد قصیر - خیابان هشتم - پلاک ۱۱',
  phones: [
    { label: 'مرکز تماس فروش و پیش‌فروش', number: '۰۲۱-۸۸۵۵۴۲۲۱', tel: '02188554221', extension: 'داخلی ۱۰۴' },
    { label: 'پاسخگویی امور سهامداری و کدال', number: '۰۲۱-۸۸۲۰۰۰۲۱', tel: '02188200021', extension: 'داخلی ۱۰۸' },
  ],
}

// --- defaults for callers that pass only `fields` (e.g. /careers) ----------

export const defaultLeadFields: LeadFormField[] = [
  nameField,
  { key: 'phone', label: 'شماره تماس', type: 'tel', required: true, placeholder: '۰۹xxxxxxxxx', validate: 'mobile', ltr: true },
  { key: 'email', label: 'پست الکترونیکی', type: 'email', placeholder: 'example@domain.com', ltr: true },
  { key: 'message', label: 'متن پیام', type: 'textarea', required: true, placeholder: 'درخواست یا پرسش خود را بنویسید...' },
]
