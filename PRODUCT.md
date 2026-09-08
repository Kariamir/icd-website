# Product

## Register

brand

## Users

**Primary:** International investors evaluating Iran as an emerging real-estate market. English-first, high-net-worth, evaluating ICD from abroad — likely arriving via referral or institutional research. They need to feel the credibility and scale of the firm before engaging further.

**Secondary:** Iranian high-net-worth buyers and domestic partners — fluent in Persian, already familiar with ICD's reputation; they need reaffirmation of prestige and a clear path to contact.

Both audiences use this site from professional environments (desktop-first, high-DPI screens), in a considered evaluation mindset — not browsing casually.

## Product Purpose

ICD (شرکت بین‌المللی توسعه ساختمان — International Construction Development) is a premier Iranian architectural and real-estate development firm. The website exists to convert high-calibre international and domestic leads by demonstrating ICD's scale, precision, and permanence through an immersive brand experience.

The site has two registers operating in sequence:
- **Brand layer** (scroll-driven hero, legacy sections, project showcase): design IS the product — the visual weight and craft IS the proof of credibility.
- **Product layer** (portfolio browser, investor contact form, document downloads, authenticated investor portal): design SERVES the lead-capture and relationship workflow.

Success looks like: a qualified international investor arrives, is arrested by the 3D hero, explores the portfolio, downloads an investment deck or requests a meeting.

## Brand Personality

**Monumental. Precise. Quietly authoritative.**

The brand does not sell — it presents. Like the buildings themselves, it communicates permanence through mass, not decoration. Gold is earned, not scattered. Whitespace is a luxury material. The interface should feel as though it was built from the same materials as the tower: basalt, limestone, steel, glass.

Voice: formal, minimal, bi-lingual without friction. English for international reach; Persian for cultural depth and domestic trust. Neither is secondary.

## Anti-references

- Purple or violet gradients — destroy the grounded material metaphor
- Rounded pill buttons — soft shapes read as cheap; max `2px` border-radius
- Card-in-card nesting — z-index clutter; use typography and whitespace for grouping instead
- Generic SaaS typefaces (Inter, Roboto) — wrong register, wrong weight
- Generic lifestyle / stock photography — no high-saturation smiling people; mandate high-contrast directional-lit architectural imagery
- Playful or elastic motion — zero bounce, zero elasticity; motion mirrors heavy physical machinery and cinematic crane sweeps
- Cream / warm-tinted body backgrounds as a "luxury" default — the warmth is carried by the gold accent and lighting, not by a beige body

## Design Principles

1. **Architecture speaks; the interface frames.** Every UI decision should recede so the buildings and their scale can come forward. No decoration competes with the subject matter.
2. **Material honesty.** Color, texture, and weight are derived from physical building materials — limestone (bg), basalt (dark), blueprint blue (structure), brass (premium finishing), steel-and-glass (highlights). No digital-native gradients.
3. **Earn the gold.** The brass accent (`#B08D57`) is deployed exactly like a finishing detail on a building — only where it marks something that matters (micro-interactions, active states, singular structural lines). Overuse destroys the signal.
4. **Bilingual without compromise.** RTL and LTR must feel equally native — not translated or adapted. Persian is not a fallback; it is the other primary voice.
5. **Weight before warmth.** The brand communicates through mass and precision, not softness or hospitality-warmth cues. Slow, deliberate motion (0.9–1.2s, ease-out-cubic). No bounce. No elastic.

## Accessibility & Inclusion

- **WCAG 2.1 AA** as the baseline for all UI.
- Reduced-motion alternatives are non-negotiable: the site is motion-heavy; every animation must have a `@media (prefers-reduced-motion: reduce)` alternative (typically crossfade or instant transition).
- Bilingual content requires correct `lang` attributes per text block and `dir="rtl"` on Persian elements.
- Keyboard navigation must reach all interactive elements (nav, CTAs, forms, portal).
- Color contrast: body text ≥ 4.5:1 against background; large text ≥ 3:1. `--text-muted` (`#6b6b6b`) on `--bg` (`#F6F5F1`) is borderline — verify before shipping.
