---
author: AgentGo Team
date: 2026-10-26
keywords: [事件, 审计, API, 分页, 保留策略]
summary: 全局系统事件日志，只保留最近三个月内最新的 1000 条。
---

# 系统事件

`/api/v1/systemEvents` 是全局事件日志。所有已登录用户读写同一批记录，事件不归属于单个用户。

| 字段         | 是否必填 | 含义                                                             |
| ------------ | -------- | ---------------------------------------------------------------- |
| `name`       | 是       | 事件名称，最多 255 个字符。                                      |
| `domain`     | 是       | 产生事件的业务域，最多 255 个字符。                              |
| `operator`   | 否       | 相关操作人。留空时保存当前登录用户。                             |
| `comment`    | 否       | 备注，最多 4000 个字符。留空会清空已有备注。                     |
| `occurredAt` | 否       | 事件发生时间。创建时省略则使用当前时间；更新时省略则保留原时间。 |

`GET /api/v1/systemEvents` 返回 `PageResponse`。`page` 从 1 开始。`size` 默认 20，最大 100。`sort` 可以是 `name`、`domain`、`operator`、`occurredAt`、`createdAt`。不传 `sort` 时按 `occurredAt` 降序。可选查询参数 `domain` 和 `operator` 按精确值过滤。

保留策略只留下最近三个月内最新的 1000 条。更早的记录，以及超出 1000 条的旧记录，都会被删除。创建或更新后落在这个窗口之外时，返回 `EVENT-002`。找不到记录时返回 `EVENT-001`。未登录时返回 `AUTH-002`。

| 操作 | 方法                               | 成功码                        |
| ---- | ---------------------------------- | ----------------------------- |
| 列表 | `GET /api/v1/systemEvents`         | `9800` `EVENT-LIST-RETRIEVED` |
| 创建 | `POST /api/v1/systemEvents`        | `9801` `EVENT-CREATED`        |
| 查询 | `GET /api/v1/systemEvents/{id}`    | `9802` `EVENT-RETRIEVED`      |
| 更新 | `PUT /api/v1/systemEvents/{id}`    | `9803` `EVENT-UPDATED`        |
| 删除 | `DELETE /api/v1/systemEvents/{id}` | HTTP 204，空响应体            |

成功响应使用 `CommonHttpResponse`。删除不返回已登记的 `9804` `EVENT-DELETED`。

## 后端埋点协议

系统事件由**后端业务服务**写入，前端只负责查询展示。

1. 在会改变持久化状态的应用服务方法上标注 `@RecordSystemEvent`；不要标注只读、探测、渲染方法，也不要标注 `SystemEventService` 自身。
2. `domain` 使用 `SystemEventDomains` 常量（如 `models`、`prompts`、`mcp-servers`、`workspaces`、`settings`）。新能力开始记录时先加常量。
3. `name` 用简短过去时描述（如 `Model created`）。`comment` 可用 `#{…}` SpEL 模板引用方法参数、`#result`，以及在 `recordOnFailure = true` 时的 `#error`。
4. `operator` 默认留空，落库为当前登录用户。
5. 注解在方法**成功返回后**写入；记录失败不得影响业务结果。注解表达不了时，注入 `SystemEventRecorder` 在业务成功后显式调用。

```kotlin
@RecordSystemEvent(
    domain = SystemEventDomains.MODELS,
    name = "Model created",
    comment = "Created model #{#result.name} (#{#result.id})",
)
fun create(request: ModelCreateRequest): ModelResponse { … }
```
