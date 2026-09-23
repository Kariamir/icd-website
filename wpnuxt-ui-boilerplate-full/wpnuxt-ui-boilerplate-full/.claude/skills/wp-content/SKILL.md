---
name: wp-content
description: Implement WordPress content fetching and mapping through WPNuxt.
---
# WordPress Content Skill

1. Read `docs/wordpress-wpnuxt.md` and `docs/content-contract.md`.
2. Check whether a generated WPNuxt composable already supplies the data.
3. If not, add a focused `.gql` operation under `extend/queries/`.
4. Use generated WPNuxt types/composables; do not add an ad-hoc GraphQL client.
5. Normalize connections, nullable fields, ACF wrappers, media, and backend-domain links at the boundary.
6. Return a small typed view model to the page/section layer.
7. Handle missing content safely.
8. Keep credentials/private tokens out of public runtime config.
9. Run typecheck and relevant tests.
