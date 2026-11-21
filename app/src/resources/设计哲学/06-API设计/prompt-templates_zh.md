---
author: AgentGo Team
date: 2026-10-11
navOrder: 6
keywords: [API, 提示词模板, Jinja2, 占位符]
summary: 用户级提示词模板契约，包括普通占位符替换和受控 Jinja2 渲染。
---

# 提示词模板

提示词模板属于当前登录用户。接口从会话解析所有者，请求体不接受用户 ID。同一用户下的名称必须唯一。

## 字段

- `engine`：`SIMPLE` 或 `JINJA2`
- `content`：模板正文，最长 100000 个字符
- `description`：可选，最长 2000 个字符

## 引擎

`SIMPLE` 替换 `{{ identifier }}`。标识符匹配 `[A-Za-z_][A-Za-z0-9_]*`，花括号内允许空白。缺少变量、未闭合花括号、表达式、过滤器、条件和循环都会失败。只能代入字符串、数字和布尔值。

`JINJA2` 渲染受控的 Jinja2 模板，可以使用条件和循环。`{% include %}`、`{% import %}`、`{% from %}` 和 `{% extends %}` 会被拒绝，渲染器也不能加载外部模板。变量必须是 JSON 标量、数组或对象。渲染失败返回 `PROMPT-004`，不包含引擎堆栈。

## 端点

所有路径都在 `/api/v1/promptTemplates` 下，并且需要已登录会话。

- `POST /api/v1/promptTemplates` 创建模板
- `GET /api/v1/promptTemplates` 分页列出当前用户的模板。查询参数为 `page`（默认 `1`）、`size`（默认 `20`，最大 `100`）、可重复的 `sort`（`name`、`engine`、`createdAt`、`updatedAt`）和 `order`（`ASC` 或 `DESC`）。省略 `sort` 时按 `updatedAt` 倒序。响应信封里的 `data` 是一页结果：`data`（当前页行）、`pageSize`、`totalElements`、`totalPages`、`empty`、`first`、`last`、`size`，以及从 1 开始的 `number`。不支持的排序字段或超过 100 的 `size` 返回 `PROMPT-002`
- `GET /api/v1/promptTemplates/{id}` 读取一个模板
- `PUT /api/v1/promptTemplates/{id}` 替换一个模板
- `DELETE /api/v1/promptTemplates/{id}` 删除一个模板，返回 HTTP 204
- `POST /api/v1/promptTemplates/preview` 用未保存的 `engine`、`content` 和 `variables` 预览
- `POST /api/v1/promptTemplates/{id}/render` 用 `variables` 渲染已保存模板

列出、创建、读取、更新、删除和渲染的成功业务码是 `9200` 到 `9205`。失败码是 `PROMPT-001` 到 `PROMPT-005`。未登录使用 `AUTH-002`。
