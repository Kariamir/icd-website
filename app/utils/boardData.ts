/**
 * Mock content for /about/board (index) and /about/board/[slug] (detail) —
 * placeholder pending the real WordPress data layer (ADR-002).
 */
import type { BoardMemberViewModel } from '~/types/content'

const IMG = (seed: string) => ({ src: `https://picsum.photos/seed/${seed}/480/480`, alt: '' })

export const boardMembers: BoardMemberViewModel[] = [
  {
    slug: 'seyed-alireza-hosseini',
    name: 'مهندس سید علیرضا حسینی',
    role: 'مدیرعامل و نایب رئیس هیات‌مدیره',
    image: IMG('board-1'),
    bioHtml: '<p>بیش از ۲۵ سال سابقه اجرایی در صنعت ساختمان و مدیریت پروژه‌های کلان ملی. مسئول راهبری استراتژیک هلدینگ از سال ۱۴۰۰.</p>',
  },
  {
    slug: 'mehrdad-saniei',
    name: 'دکتر مهرداد صنیعی',
    role: 'معاونت مهندسی و توسعه پایدار',
    image: IMG('board-2'),
    bioHtml: '<p>دکترای مهندسی عمران-ژئوتکنیک، مسئول سیاست‌گذاری فنی پروژه‌های مگاپروژه و استانداردهای ساختمان سبز هلدینگ.</p>',
  },
  {
    slug: 'kaveh-rezvani',
    name: 'دکتر کاوه رضوانی',
    role: 'رئیس هیات‌مدیره',
    image: IMG('board-3'),
    bioHtml: '<p>عضو هیات‌مدیره از سال ۱۳۹۸ و مسئول نظارت بر حاکمیت شرکتی و روابط سرمایه‌گذاران.</p>',
  },
  {
    slug: 'kambiz-mohtashami',
    name: 'دکتر کامبیز محتشمی',
    role: 'عضو غیرموظف هیات‌مدیره',
    image: IMG('board-4'),
    bioHtml: '<p>استاد دانشگاه و مشاور عالی تکنولوژی بتن، مسئول کمیته فنی و کنترل کیفیت اجرای پروژه‌ها.</p>',
  },
]

export function getBoardMember(slug: string): BoardMemberViewModel | undefined {
  return boardMembers.find(m => m.slug === slug)
}
