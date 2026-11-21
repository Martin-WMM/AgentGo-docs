---
author: AgentGo Team
date: 2026-10-11
keywords: [设置, 偏好, API, 主题, 语言]
summary: 按用户保存、并由 AgentGo 客户端应用到整个界面的系统设置。
---

# 用户系统设置

每个已登录用户有一份系统设置。AgentGo 客户端在登录后读取它，并用它配置整个界面。不同用户的设置互不影响。

`GET /api/v1/settings` 返回当前用户的设置。如果还没有保存过，响应使用默认值且 `persisted` 为 `false`，这次读取不会写库。`PUT /api/v1/settings` 创建或覆盖这份设置。用户身份只来自当前登录会话。

| 字段 | 取值 | 客户端效果 |
| --- | --- | --- |
| `theme` | `LIGHT`、`DARK`、`SYSTEM` | 颜色主题。`SYSTEM` 跟随操作系统。 |
| `locale` | `EN`、`ZH_CN` | 界面语言（`en` 或 `zh-CN`）。 |
| `sidebarCollapsed` | 布尔值 | 工作区侧栏是否折叠。 |
| `density` | `COMFORTABLE`、`COMPACT` | 间距和根字号。 |
| `reduceMotion` | 布尔值 | 尽量减少动画和过渡。 |

读取成功的业务码是 `9400`（`SETTINGS-RETRIEVED`）。保存成功的业务码是 `9401`（`SETTINGS-UPDATED`）。响应都使用 `CommonHttpResponse`。
