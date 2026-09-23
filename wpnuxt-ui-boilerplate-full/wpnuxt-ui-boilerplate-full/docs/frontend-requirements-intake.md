# Frontend Requirements Intake

## Purpose

This document defines the information and assets that must be collected before frontend implementation starts.

It applies to Claude Code, AI coding agents, human developers, designers, and project leads.

**Rule:** Do not guess missing brand, design, content, functional, or technical requirements. Ask for them, record the answers, and identify unresolved items before implementation.

The developer must use this document during project discovery and convert applicable requirements into the project checklist in `CLAUDE.md`.

---

## 1. Start With Existing Material

Before asking questions:

1. Inspect the repository and existing documentation.
2. Inspect supplied Figma files, screenshots, references, assets, and WordPress content models.
3. Identify what is already known.
4. Ask only for missing or ambiguous requirements.
5. Group questions so the client or project owner can answer efficiently.

Do not repeatedly ask for information that already exists in the project.

---

## 2. Project Basics

Collect:

- Project/site name
- Business/organization name
- Website purpose
- Primary audience
- Primary conversion goal
- Secondary goals
- Required launch date or milestones
- Languages and locales
- Existing website URL, if any
- Reference/competitor websites
- Required pages and page types
- Required environments: local, staging, production

Clarify the expected user journey, for example:

`Landing page -> service/product -> CTA -> form/contact/checkout`

---

## 3. Brand Identity

Request the official brand identity package when available.

Required or recommended inputs:

- Brand guidelines / brand book
- Primary logo
- Secondary logo variants
- Horizontal/vertical logo variants
- Symbol/mark
- Light and dark logo versions
- SVG/vector logo files when possible
- Favicon/app icon
- Brand colors with HEX/RGB values
- Primary and secondary typography
- Font files or approved font sources/licenses
- Icon style or icon library
- Illustration style
- Photography/art direction
- Image treatment rules
- Shapes, patterns, textures, gradients, or graphic devices
- Tone/personality of the visual brand
- Examples of incorrect brand usage, if defined

### Brand assets checklist

- [ ] Brand guidelines received
- [ ] Logo files received
- [ ] Logo variants received
- [ ] Favicon received/defined
- [ ] Color palette confirmed
- [ ] Typography confirmed
- [ ] Font licensing/source confirmed
- [ ] Iconography direction confirmed
- [ ] Photography direction confirmed
- [ ] Illustration/graphic direction confirmed

If no formal identity exists, explicitly ask whether the developer should create a minimal UI identity system or wait for design direction.

---

## 4. UI/UX Design Requirements

Determine whether implementation follows an approved design or requires frontend design decisions.

Collect:

- Figma/design file and access
- Desktop layouts
- Tablet layouts, if supplied
- Mobile layouts
- Design system/component library
- Spacing/grid rules
- Container/max-width rules
- Breakpoints
- Header/navigation behavior
- Footer structure
- Button variants
- Form styles
- Card styles
- Modal/drawer behavior
- Hover/focus/active states
- Empty/loading/error states
- Animation/motion direction
- Reduced-motion expectations
- Dark mode requirement
- RTL requirement
- Accessibility target

Ask what is authoritative when references conflict: Figma, brand book, existing site, written specification, or another source.

Do not invent responsive behavior silently. If only desktop designs exist, document the responsive rules you propose before applying them broadly.

---

## 5. Content Requirements

Collect or identify ownership for:

- Final navigation labels
- Page copy
- Headings and CTA text
- Images
- Videos
- Product/service information
- Team/member data
- Testimonials/reviews
- Contact information
- Social links
- Legal pages
- Privacy/cookie text
- Downloadable files
- FAQs
- Blog/editorial content
- Placeholder-content policy

For every content area, determine whether it is:

1. hard-coded UI content,
2. global site configuration,
3. WordPress-managed content,
4. Gutenberg block content,
5. ACF/custom-field content, or
6. data from another service/API.

Prefer CMS-managed content for information the site owner is expected to edit.

---

## 6. WordPress + WPNuxt Requirements

Collect:

- WordPress base URL
- WPGraphQL endpoint/status
- WPNuxt version/project constraints
- WordPress content types
- Taxonomies
- Menus
- Media requirements
- Gutenberg usage
- Required Gutenberg blocks
- ACF/custom fields
- ACF GraphQL exposure
- Custom post types
- Custom GraphQL fields/queries
- Authentication requirements
- Preview/draft requirements
- Search requirements
- Pagination/infinite loading requirements
- Forms and form provider
- Multilingual plugin/strategy
- SEO plugin, if used
- Redirect requirements
- Existing URL/permalink structure

Create a content contract before coupling page components to CMS data.

Frontend components must consume normalized frontend models where practical, not raw WordPress structures throughout the UI tree.

---

## 7. Functional Requirements

Ask which features are required:

- Contact/lead forms
- Newsletter signup
- Site search
- Filtering/sorting
- User login/account
- Membership
- WooCommerce/e-commerce
- Cart/checkout
- Wishlist
- Booking/reservation
- Maps/location
- Chat/WhatsApp/contact actions
- File uploads/downloads
- Galleries/sliders
- Video
- Cookie consent
- Analytics
- Marketing pixels
- CRM integration
- Email provider integration
- Payment gateway
- External APIs
- Social feeds
- Localization/language switcher

For each integration, record the provider, credentials owner, environments, expected behavior, failure behavior, and whether secrets must remain server-side.

---

## 8. SEO and Sharing Requirements

Collect:

- SEO title/description ownership
- SEO plugin/source of metadata
- Canonical URL rules
- Index/noindex requirements
- Sitemap expectations
- robots.txt requirements
- Open Graph defaults
- Social sharing image
- Structured data/schema requirements
- Breadcrumb requirements
- Redirect/migration map for existing sites

Never use frontend visuals as a substitute for semantic HTML and crawlable content.

---

## 9. Analytics, Privacy, and Compliance

Collect:

- Analytics provider and property/container IDs
- Tag manager requirements
- Conversion events
- Marketing pixels
- Cookie consent platform
- Consent categories
- Privacy requirements
- Terms/legal requirements
- Regional compliance requirements
- Data-retention constraints where relevant

Tracking that requires consent must not be initialized before the required consent state.

---

## 10. Performance Requirements

Clarify:

- Target devices and connection conditions
- Core Web Vitals expectations
- Image formats and optimization rules
- Video strategy
- Font-loading strategy
- SSR/SSG/SWR/cache expectations
- CDN requirements
- Third-party script constraints
- Expected traffic/load characteristics when relevant

Prefer measurable budgets over statements such as "make it fast."

---

## 11. Accessibility Requirements

Default target: **WCAG 2.2 AA** unless the project specifies another standard.

Confirm:

- Keyboard navigation
- Visible focus states
- Semantic structure
- Form labels/errors
- Contrast requirements
- Alt-text ownership
- Screen-reader behavior for interactive components
- Motion/reduced-motion behavior
- Captions/transcripts for media when applicable

Accessibility is part of implementation, not a final cosmetic pass.

---

## 12. Browser and Device Support

Confirm:

- Supported browsers
- Minimum browser versions if constrained
- iOS/Safari requirements
- Android/Chrome requirements
- Desktop viewport range
- Mobile viewport range
- Tablet support
- Touch behavior
- High-density/retina assets

Do not spend time supporting obsolete browsers unless the requirement explicitly calls for it.

---

## 13. Deployment and Operations

Collect:

- Hosting provider
- Deployment platform
- Repository/branch strategy
- CI/CD requirements
- Environment variables
- WordPress environments
- Frontend environments
- Domain/DNS ownership
- SSL handling
- Cache/CDN invalidation requirements
- Error monitoring
- Logging
- Analytics verification
- Backup/rollback expectations

Never commit production credentials or secrets.

---

## 14. Acceptance and Quality

Before implementation, define:

- Who approves UI
- Who approves content
- Who approves WordPress integration
- Required tests
- Required browsers/devices for QA
- Visual comparison expectations
- Performance acceptance criteria
- Accessibility acceptance criteria
- Definition of Done

Ambiguous approval criteria create avoidable rework. Resolve them early.

---

## 15. Required Discovery Output

After requirements are collected, the developer must produce a concise **Frontend Requirements Summary** containing:

- Project goals
- Page/page-type inventory
- Brand assets received and missing
- Design sources and authority
- Content sources
- WordPress/WPNuxt content architecture
- Functional requirements
- Integrations
- SEO requirements
- Accessibility target
- Performance target
- Browser/device support
- Deployment constraints
- Open questions
- Blockers
- Assumptions explicitly approved by the project owner

Then update the live checklist in `CLAUDE.md`.

Do not begin large-scale UI implementation while critical requirements remain unresolved.

---

## 16. Suggested Intake Message

Use this structure when asking a project owner for missing inputs. Adapt it to the project and omit anything already known.

> Before I implement the frontend, I need to confirm the project requirements so the UI and architecture are consistent. Please provide the available brand identity files (brand guide, logos, colors, fonts, icons, photography direction), approved UI designs/Figma, required pages, final or draft content, WordPress content structure, required functionality/integrations, SEO requirements, analytics/privacy requirements, supported languages, and deployment constraints. I will identify any remaining gaps after reviewing these materials and add the confirmed work to the project checklist before implementation.

---

## 17. Gate Before Coding

Frontend implementation can start when:

- [ ] Project goals are understood
- [ ] Page/page-type scope is known
- [ ] Brand direction is known
- [ ] Logo/assets are available or their absence is acknowledged
- [ ] Design source/authority is known
- [ ] Responsive approach is known
- [ ] Content ownership/source is known
- [ ] WordPress/WPNuxt content contract is understood
- [ ] Required functionality is known
- [ ] Required integrations are known
- [ ] SEO approach is known
- [ ] Accessibility target is known
- [ ] Browser/device support is known
- [ ] Deployment constraints are known
- [ ] Critical blockers are resolved or explicitly accepted
- [ ] Project implementation checklist in `CLAUDE.md` is updated

If a non-critical item is missing, record the assumption or placeholder clearly. If a critical item is missing, stop that affected workstream and request the missing requirement instead of guessing.
