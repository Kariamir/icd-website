---
name: Institutional Construction & Real Estate
colors:
  surface: '#F4F4F4'
  surface-dim: '#d6dbd8'
  surface-bright: '#f6faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5f2'
  surface-container: '#eaefec'
  surface-container-high: '#e4e9e6'
  surface-container-highest: '#dfe4e0'
  on-surface: '#171d1b'
  on-surface-variant: '#424752'
  inverse-surface: '#2c3230'
  inverse-on-surface: '#edf2ef'
  outline: '#727783'
  outline-variant: '#c2c6d4'
  surface-tint: '#005db6'
  primary: '#00478d'
  on-primary: '#ffffff'
  primary-container: '#005eb8'
  on-primary-container: '#c8daff'
  inverse-primary: '#a9c7ff'
  secondary: '#4b6173'
  on-secondary: '#ffffff'
  secondary-container: '#cce2f8'
  on-secondary-container: '#506578'
  tertiary: '#793100'
  on-tertiary: '#ffffff'
  tertiary-container: '#9f4300'
  on-tertiary-container: '#ffcfb9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468c'
  secondary-fixed: '#cfe5fb'
  secondary-fixed-dim: '#b3c9df'
  on-secondary-fixed: '#051d2d'
  on-secondary-fixed-variant: '#34495b'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#793100'
  background: '#f6faf7'
  on-background: '#171d1b'
  surface-variant: '#dfe4e0'
  brand-blue-deep: '#0056A7'
  brand-tint: '#CDE2FF'
  surface-alt: '#E8E8E8'
  border: '#D0D5D2'
  status-success: '#1F8A4C'
  status-error: '#C23B3B'
  ink: '#041C2C'
typography:
  headline-xl:
    fontFamily: Work Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
  headline-xl-mobile:
    fontFamily: Work Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Work Sans
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Work Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Work Sans
    fontSize: 19px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

# سیستم دیزاین ICD 3D (ثاخت)
برگرفته از تحلیل بصری wwww.clarkconstruction.com، بومی‌سازی‌شده برای فارسی/راست‌چین، و تطبیق‌یافته با نقشه‌راه واقعی سایت (`sitemap.md`) — هلدینگ ساخت‌وساز و املاک پذیرفته‌شده در بورس تهران با پروژه‌های پیش‌فروش، شرکت‌های زیرمجموعه، و بخش دیده‌بان سهامداران.

## ۱. فلسفه دیزاین
مرجع ساخت‌وساز نهادی، مقیاس‌بزرگ، و متکی به اعتماد. زبان بصری: عکاسی واقعی از پروژه‌ها، تیترهای درشت، پالت رنگی محدود، دکمه‌های تیز و مهندسی‌وار بدون گردی (`border-radius: 0px`).

## ۲. پالت رنگی
- `color-ink`: `#041C2C` (متن اصلی، تیترها، پس‌زمینه تیره)
- `color-brand-blue`: `#005EB8` (رنگ اصلی برند — دکمه‌ها، لینک‌ها، تاکیدها)
- `color-brand-blue-deep`: `#0056A7` (حالت hover/active)
- `color-tint`: `#CDE2FF` (پس‌زمینه‌های ملایم، بج‌ها، تگ‌ها)
- `color-surface`: `#F4F4F4` (پس‌زمینه بخش‌های متناوب)
- `color-surface-alt`: `#E8E8E8` (پس‌زمینه فوتر و کارت‌ها)
- `color-border`: `#D0D5D2` (خطوط جداکننده، بوردرها)
- `color-white`: `#FFFFFF`
- `color-status-success`: `#1F8A4C`
- `color-status-error`: `#C23B3B`

بج‌های وضعیت پروژه:
- آتی: خاکستری (`#E8E8E8` زمینه، `#041C2C` متن، outline)
- در حال ساخت: `#CDE2FF` زمینه، `#005EB8` متن (filled soft)
- در حال بهره‌برداری: `#005EB8` زمینه، سفید متن (filled solid)
- تکمیل‌شده: `#041C2C` زمینه، سفید متن (filled solid تیره)

## ۳. تایپوگرافی
- فونت اصلی فارسی: Vazirmatn (وزن ۴۰۰–۷۰۰)
- برچسب/دکمه/بج وضعیت: Vazirmatn Bold
- اعداد مالی/متراژ/ارقام: ارقام لاتین یا فارسی تمیز با Tabular figures (`unicode-bidi: isolate`)
- مقیاس دسکتاپ: H1: 64px–92px, H2: 38px, H3: 19px, Body: 18px, Secondary/Meta: 14px, Button/Badge: 14px

## ۴. دکمه‌ها و فرم‌ها
- دکمه اصلی: پس‌زمینه `#005EB8`، متن سفید، `border-radius: 0px`
- دکمه معکوس (روی عکس): سفید، متن `#005EB8`، `border-radius: 0px`
- دکمه ثانویه (Outline): شفاف، بوردر ۱px `#005EB8`، متن `#005EB8`، `border-radius: 0px`

## ۵. راست‌چین (RTL)
- `dir="rtl"` در تمام اجزا
- لوگو در سمت راست، منو، CTA در چپ
