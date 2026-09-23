# Architecture Decision Log

Use this file for decisions that change the standard for future work.

## ADR template
### ADR-NNN: Title
- **Status:** proposed | accepted | superseded
- **Date:** YYYY-MM-DD
- **Context:** What problem requires a decision?
- **Decision:** What will we do?
- **Consequences:** What becomes easier/harder?
- **Alternatives:** What was considered and why was it not selected?

---

### ADR-001: WPNuxt is the WordPress integration boundary
- **Status:** accepted
- **Date:** 2026-09-23
- **Context:** Multiple frontend projects need one consistent WordPress integration pattern.
- **Decision:** Use WPNuxt generated composables and query extension as the default CMS access layer. Keep presentational components independent of WordPress.
- **Consequences:** Projects share one data-access convention and generated typing. Developers must normalize CMS shapes rather than passing them through the component tree.
- **Alternatives:** Direct REST, direct Apollo/GraphQL client, per-project custom fetching.
