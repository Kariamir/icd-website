/**
 * Mock content for /about/honors — placeholder pending the real WordPress
 * data layer (ADR-002).
 */
import type { HonorViewModel } from '~/types/content'

const IMG = (seed: string) => ({ src: `https://picsum.photos/seed/${seed}/480/320`, alt: '' })

export const honors: HonorViewModel[] = [
  { title: 'گواهینامه سیستم مدیریت کیفیت ISO 9001', year: '۱۴۰۲', issuer: 'مرکز صدور گواهینامه بین‌المللی', image: IMG('honor-1') },
  { title: 'تندیس زرین کیفیت ساخت ملی', year: '۱۴۰۱', issuer: 'همایش ملی صنعت ساختمان', image: IMG('honor-2') },
  { title: 'عضویت رسمی انجمن سازندگان و انبوه‌سازان مسکن', year: '۱۳۹۸', issuer: 'انجمن انبوه‌سازان مسکن', image: IMG('honor-3') },
  { title: 'گواهی رعایت استانداردهای HSE کارگاهی', year: '۱۴۰۲', issuer: 'وزارت کار و رفاه اجتماعی', image: IMG('honor-4') },
  { title: 'لوح تقدیر شفافیت گزارش‌گری مالی بورس تهران', year: '۱۴۰۳', issuer: 'سازمان بورس و اوراق بهادار', image: IMG('honor-5') },
]
