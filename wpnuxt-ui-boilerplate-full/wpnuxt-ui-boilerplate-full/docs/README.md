# Documentation Map

Read these files in this order when starting a project or giving an AI
coding agent a task.

1.  `architecture.md` --- system boundaries and dependency direction.
2.  `project-structure.md` --- where code belongs.
3.  `ui-system.md` --- reusable UI and design-system rules.
4.  `wordpress-wpnuxt.md` --- WordPress/WPNuxt integration.
5.  `content-contract.md` --- boundary between CMS data and frontend
    view models.
6.  `routing-seo.md` --- routes, metadata, redirects, previews.
7.  `performance.md` --- rendering, caching, images, payloads.
8.  `accessibility.md` --- minimum accessibility requirements.
9.  `testing.md` --- test strategy and required checks.
10. `workflow.md` --- repeatable implementation workflow.
11. `definition-of-done.md` --- final acceptance gate.
12. `decisions.md` --- architecture decisions that change the standard.

The purpose is not to document every line of code. Document stable
rules, contracts, and decisions so every website moves in the same
direction.

## Implementation procedures

Reusable developer procedures live in `.claude/skills/`. `CLAUDE.md`
defines when they must be used.
