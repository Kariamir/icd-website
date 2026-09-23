# Performance

## Priorities
1. Send useful HTML from the server.
2. Keep WordPress queries small.
3. Optimize images.
4. Minimize client JavaScript.
5. Cache public CMS data according to freshness needs.

## Images
- Use Nuxt Image/WPNuxt image integration.
- Supply width/height or aspect ratio.
- Use responsive sizes.
- Do not lazy-load the main LCP image by default.
- Lazy-load below-the-fold images.

## Data
- Fetch page-level data once when possible.
- Avoid duplicate queries in sibling components.
- Do not fetch all posts when the UI displays six.
- Use cursor pagination/load-more for large collections.

## Caching
WPNuxt supports server-side cache with SWR. Choose TTL based on publishing frequency. A five-minute default is a starting point, not a universal requirement.

## Client behavior
Hydrate only interactive UI. Avoid making a whole content page client-only because one widget needs browser APIs.
