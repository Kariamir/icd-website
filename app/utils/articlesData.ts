/**
 * Mock content for the media cluster (news / stories / reports) — placeholder
 * pending the real WordPress data layer (docs/decisions.md ADR-002). Shape
 * matches app/types/content.ts ArticleCardViewModel / ArticleDetailViewModel
 * so swapping in real WPNuxt queries later only touches this file's exports.
 */
import type { ArticleCardViewModel, ArticleDetailViewModel } from '~/types/content'

const IMG = (seed: string) => ({
  src: `https://picsum.photos/seed/${seed}/960/540`,
  alt: '',
})

export const articles: ArticleDetailViewModel[] = [
  {
    slug: 'geotechnical-engineering-megaprojects',
    contentType: 'news',
    title: 'رویکرد نوین مهندسی ژئوتکنیک و پایداری سازه‌ای در مگاپروژه‌های ثاخت',
    excerpt: 'بررسی تمهیدات مهندسی گودبرداری‌های عمیق، دیوارهای آب‌بند و پایش لحظه‌ای رفتار سازه در پروژه‌های مقیاس‌بزرگ هلدینگ.',
    date: '۱۴۰۳/۰۲/۲۴',
    category: 'گزارش تخصصی و مهندسی',
    image: IMG('geotech'),
    bodyHtml: `
      <p>در دهه‌های اخیر، توسعه زیرساخت‌های کلان‌شهری و احداث مجتمع‌های چندمنظوره با حجم سرمایه‌گذاری سنگین، چالش‌های ژئوتکنیکی پیچیده‌ای را پیش روی طراحان و مجریان پروژه‌های عمرانی قرار داده است. هلدینگ ثاخت با سبدی از پروژه‌های شاخص، رویکردی متکی بر مهندسی دقیق ارزش و سیستم‌های تاب‌آور سازه‌ای را دنبال می‌کند.</p>
      <h2>مدیریت ریسک در گودبرداری‌های عمیق شهری</h2>
      <p>احداث سازه‌هایی با طبقات زیرسطحی متعدد در بافت متراکم شهری، مستلزم ارزیابی دقیق لایه‌نگاری خاک و مدل‌سازی اندرکنش خاک و سازه است. ترکیب نیلینگ پیش‌تنیده و دیوارهای دیافراگمی بتنی، ریسک تغییرشکل مجاورتی را به حداقل می‌رساند.</p>
      <blockquote>«استاندارد مهندسی امروز صرفاً ساخت یک بنای پایدار نیست؛ کنترل رفتار پویای ساختگاه در چرخه عمر سازه است.»</blockquote>
      <h3>پایش سلامت سازه در زمان واقعی</h3>
      <p>نصب حسگرهای دقیق برای مانیتورینگ آنلاین نشست‌ها و ارتعاشات ناشی از ساخت، حاشیه ایمنی سازه‌های هم‌جوار را در تمامی مراحل اجرا تضمین می‌کند.</p>
      <ul>
        <li>کاهش قابل توجه مصرف فولاد در دیوارهای نگهبان با مدل‌سازی عددی پیشرفته</li>
        <li>عایق‌کاری چندلایه ضد نفوذ آب با استانداردهای بین‌المللی</li>
        <li>پایداری در برابر زلزله با طراحی میراگرهای نوین</li>
      </ul>
    `,
    audioUrl: undefined,
    related: [],
  },
  {
    slug: 'icd-founding-to-bourse-listing',
    contentType: 'story',
    title: 'روایت تاسیس ثاخت از ۱۳۶۴ تا ورود به بازار سرمایه',
    excerpt: 'مروری بر مسیر چهار دهه‌ای هلدینگ، از نخستین پروژه‌های ساختمانی تا پذیرش نماد ثاخت در بورس اوراق بهادار تهران.',
    date: '۱۴۰۳/۰۱/۲۸',
    category: 'روایت ثاخت',
    image: IMG('history'),
    bodyHtml: `
      <p>شرکت بین‌المللی توسعه ساختمان کار خود را در سال ۱۳۶۴ با تمرکز بر پروژه‌های مسکونی کوچک‌مقیاس آغاز کرد. طی دهه‌های بعد، دامنه فعالیت به مجتمع‌های تجاری-اداری، اقامتی-گردشگری و مگاپروژه‌های چندمنظوره گسترش یافت.</p>
      <h2>ورود به بازار سرمایه</h2>
      <p>پذیرش نماد ثاخت در بورس اوراق بهادار تهران نقطه عطفی در شفافیت مالی و حاکمیت شرکتی هلدینگ بود؛ رویدادی که چارچوب گزارش‌گری دوره‌ای و افشای اطلاعات را برای گروه الزامی کرد.</p>
    `,
    audioUrl: 'https://example.com/podcasts/rooye-sakht-18.mp3',
    related: [],
  },
  {
    slug: 'quarterly-market-outlook-1403',
    contentType: 'report',
    title: 'گزارش فصلی بازار مسکن و افق پیش‌فروش در سال ۱۴۰۳',
    excerpt: 'تحلیل روند قیمت مسکن، حجم معاملات و پیش‌بینی تقاضای پیش‌فروش در کلان‌شهرهای هدف پروژه‌های هلدینگ.',
    date: '۱۴۰۳/۰۳/۰۵',
    category: 'کارنامه ثاخت',
    image: IMG('market-report'),
    bodyHtml: `
      <p>گزارش فصلی دیده‌بان ثاخت، روند شاخص‌های بنیادین بازار مسکن شامل نرخ رشد قیمت، حجم معاملات و نسبت اجاره به قیمت را در مناطق فعالیت پروژه‌های هلدینگ بررسی می‌کند.</p>
      <h2>جمع‌بندی و چشم‌انداز</h2>
      <p>با توجه به روند تورم نهاده‌های ساختمانی، تقاضای پیش‌فروش واحدهای در حال ساخت در فصل جاری نسبت به دوره مشابه سال گذشته افزایش نشان می‌دهد.</p>
    `,
    audioUrl: undefined,
    related: [],
  },
]

function toCard(a: ArticleDetailViewModel): ArticleCardViewModel {
  const { slug, title, excerpt, date, category, image, contentType } = a
  return { slug, title, excerpt, date, category, image, contentType }
}

export function getArticlesByType(type: ArticleCardViewModel['contentType']): ArticleCardViewModel[] {
  return articles.filter(a => a.contentType === type).map(toCard)
}

export function getArticle(type: ArticleCardViewModel['contentType'], slug: string): ArticleDetailViewModel | undefined {
  const found = articles.find(a => a.contentType === type && a.slug === slug)
  if (!found) return undefined
  return { ...found, related: getRelatedArticles(type, slug, 3) }
}

export function getRelatedArticles(type: ArticleCardViewModel['contentType'], slug: string, count = 3): ArticleCardViewModel[] {
  return articles
    .filter(a => a.contentType === type && a.slug !== slug)
    .slice(0, count)
    .map(toCard)
}

export const mediaTypeLabels: Record<ArticleCardViewModel['contentType'], { hub: string; single: string }> = {
  news: { hub: 'نبض ثاخت', single: 'خبر' },
  story: { hub: 'روایت ثاخت', single: 'مطلب' },
  report: { hub: 'کارنامه ثاخت', single: 'گزارش' },
}
