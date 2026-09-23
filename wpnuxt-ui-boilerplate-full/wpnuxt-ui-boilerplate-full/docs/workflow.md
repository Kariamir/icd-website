# Repeatable Development Workflow

## 1. Define the content contract
List the fields WordPress owns. Decide whether standard WPNuxt queries are enough.

## 2. Define the view model
Create the smallest typed shape that the UI needs. This protects components from CMS schema churn.

## 3. Build from primitives upward
Implement/reuse tokens -> UI primitives -> sections -> page composition.

## 4. Connect WordPress
Use a generated WPNuxt composable. Add an `extend/queries/*.gql` operation only if needed. Map the response to the view model.

## 5. Handle route states
Implement loading behavior if needed, missing/empty content, errors, and 404 semantics.

## 6. Add SEO
Map CMS SEO/editorial data to Nuxt metadata and canonical URLs.

## 7. Verify quality
Run typecheck, lint, tests, build, responsive checks, accessibility checks, and inspect hydration/runtime errors.

## 8. Document reusable decisions
If you introduced a pattern future projects should follow, update the relevant doc. If you changed architecture, add an ADR entry in `decisions.md`.
