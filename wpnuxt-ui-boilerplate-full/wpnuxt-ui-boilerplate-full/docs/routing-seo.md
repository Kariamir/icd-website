# Routing and SEO

## Routing
Maintain one predictable mapping between WordPress public URIs and Nuxt routes. Dynamic catch-all routes are acceptable when they resolve content through WPNuxt and correctly return 404 for unknown content.

Never return a successful empty page for a missing WordPress node.

## SEO checklist
Each indexable page should define:
- unique title;
- meta description when available;
- canonical URL;
- Open Graph title/description/image as appropriate;
- robots behavior;
- structured data where it provides real semantic value.

If an SEO plugin exposes metadata through WPGraphQL, adapt it at the page boundary instead of coupling generic UI components to the plugin schema.

## Redirects
When replacing an existing WordPress frontend, inventory old public URLs. Add redirects for changed paths. Avoid redirect chains.

## Preview
Preview/draft content requires a deliberate authenticated preview design. Preview URLs must not be indexable or leak private content.
