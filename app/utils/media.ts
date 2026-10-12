/**
 * Placeholder imagery (ADR-015).
 *
 * Every image slot on the site points at an illustrated placeholder in
 * public/img/ph/ until the owner supplies photography. They are flat drawings
 * in the brand palette — obviously not photographs, so nothing ships on them
 * by accident, but good enough that a page can be judged as a design.
 *
 * Each file is 1600×1000 with preserveAspectRatio="xMidYMid slice", so it
 * crops like a photo under `object-cover` in any aspect ratio.
 *
 * To swap in a real photo, replace the `image` value on the data record (or
 * the `src` in the view) — nothing else depends on these paths.
 */

export type PhKind =
  | 'skyline' | 'tower' | 'residential' | 'coastal' | 'commercial' | 'hotel'
  | 'campus' | 'construction' | 'aerial' | 'interior' | 'office' | 'portrait'
  | 'blueprint' | 'archive' | 'document' | 'industrial'

const VARIANTS: Record<PhKind, number> = {
  skyline: 2, tower: 2, residential: 2, coastal: 2, commercial: 2, hotel: 2,
  campus: 1, construction: 2, aerial: 2, interior: 2, office: 1, portrait: 2,
  blueprint: 2, archive: 1, document: 1, industrial: 1,
}

const RULES: [PhKind, RegExp][] = [
  ['portrait', /portrait|headshot|board-|member|author|avatar|پرتره|چهره/i],
  ['archive', /archiv|black and white|historic|vintage|1330|1350|history|آرشیو|تاریخ/i],
  ['construction', /construct|crane|excavat|foundation|rebar|site|geotech|کارگاه|گودبرداری|بتن‌ریزی/i],
  ['coastal', /coast|sea\b|gulf|kish|caspian|beach|island|waterfront|resort|ساحل|کیش|نوشهر|دریا/i],
  ['hotel', /hotel|hospitality|هتل|اقامت/i],
  ['interior', /interior|lobby|atrium|penthouse|living|bedroom|unit|داخلی|لابی|واحد/i],
  ['office', /office|meeting|conference|boardroom|exchange|assembly|agm|اداری|جلسه|مجمع|بورس/i],
  ['commercial', /mall|commercial|retail|shopping|megapars|تجاری|مگاپارس/i],
  ['campus', /campus|technology|sustainab|green|photovoltaic|leed|فناوری|پایدار|سبز/i],
  ['aerial', /aerial|drone|masterplan|map|density|نقشه|هوایی/i],
  ['blueprint', /blueprint|plan\b|drawing|bim|design|پلان|طراحی/i],
  ['document', /report|document|certificate|award|honor|gazette|گزارش|سند|گواهی|تندیس|افتخار/i],
  ['industrial', /steel|factory|industrial|supply|cement|فولاد|سیمان|کارخانه/i],
  ['tower', /tower|skyscraper|high-rise|برج/i],
  ['residential', /residential|apartment|housing|مسکونی|آپارتمان/i],
]

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

/**
 * Picks a fitting placeholder from free text — a slug, an alt text or the
 * design's image description — so legacy data and static markup get a
 * relevant drawing without hand-assigning each one.
 */
export function phFor(text: string): string {
  const kind = RULES.find(([, re]) => re.test(text))?.[0] ?? 'skyline'
  return ph(kind, (hash(text) % 2) + 1)
}

/**
 * Path to a placeholder. `variant` is 1-based and wraps, so passing a list
 * index gives neighbouring cards different moods (day / dusk).
 */
export function ph(kind: PhKind, variant = 1): string {
  const n = VARIANTS[kind]
  const v = ((Math.max(1, variant) - 1) % n) + 1
  return `/img/ph/${kind}-${v}.svg`
}
