---
author: AgentGo Team
date: 2026-10-11
keywords: [settings, preferences, API, theme, locale]
summary: Per-user system settings that configure AgentGo clients.
---

# User system settings

Each authenticated user has one system-settings record. AgentGo clients read it after sign-in and apply it to the whole interface. The record is not shared between users.

`GET /api/v1/settings` returns the caller's settings. When no row exists yet, the response uses defaults and `persisted` is `false`; the call does not write. `PUT /api/v1/settings` creates or replaces the row. The owner always comes from the authenticated session.

| Field | Values | Client effect |
| --- | --- | --- |
| `theme` | `LIGHT`, `DARK`, `SYSTEM` | Color theme. `SYSTEM` follows the operating system. |
| `locale` | `EN`, `ZH_CN` | Interface language (`en` or `zh-CN`). |
| `sidebarCollapsed` | boolean | Whether the workspace sidebar is collapsed. |
| `density` | `COMFORTABLE`, `COMPACT` | Spacing and root type size. |
| `reduceMotion` | boolean | Minimizes animations and transitions. |

A successful read uses business code `9400` (`SETTINGS-RETRIEVED`). A successful save uses `9401` (`SETTINGS-UPDATED`). Both responses use `CommonHttpResponse`.
