---
author: AgentGo Team
date: 2026-10-26
keywords: [events, audit, API, pagination, retention]
summary: Global system event log kept for three months and at most 1,000 rows.
---

# System events

`/api/v1/systemEvents` is the global event log. Every authenticated user reads and writes the same rows. An event is not owned by one user.

| Field        | Required | Meaning                                                                                                        |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| `name`       | yes      | Event name, at most 255 characters.                                                                            |
| `domain`     | yes      | Business domain that produced the event, at most 255 characters.                                               |
| `operator`   | no       | Person related to the event. Blank stores the authenticated user.                                              |
| `comment`    | no       | Free-form comment, at most 4,000 characters. Blank clears it.                                                  |
| `occurredAt` | no       | When the event happened. Create uses the current time when omitted. Update keeps the stored time when omitted. |

`GET /api/v1/systemEvents` returns `PageResponse`. `page` starts at 1. `size` defaults to 20 and must be at most 100. `sort` accepts `name`, `domain`, `operator`, `occurredAt`, and `createdAt`. When `sort` is omitted, events are ordered by `occurredAt` descending. Optional `domain` and `operator` query parameters filter by exact match.

Retention keeps the newest 1,000 events from the last three months. Older rows, and rows beyond that count, are deleted. A create or update outside that window is rejected with `EVENT-002`. A missing id is `EVENT-001`. Missing authentication is `AUTH-002`.

| Action | Method                             | Success code                  |
| ------ | ---------------------------------- | ----------------------------- |
| List   | `GET /api/v1/systemEvents`         | `9800` `EVENT-LIST-RETRIEVED` |
| Create | `POST /api/v1/systemEvents`        | `9801` `EVENT-CREATED`        |
| Get    | `GET /api/v1/systemEvents/{id}`    | `9802` `EVENT-RETRIEVED`      |
| Update | `PUT /api/v1/systemEvents/{id}`    | `9803` `EVENT-UPDATED`        |
| Delete | `DELETE /api/v1/systemEvents/{id}` | HTTP 204, empty body          |

Successful responses use `CommonHttpResponse`. Delete does not send the registered `9804` `EVENT-DELETED` code.

## Backend recording protocol

System events are written by **backend application services**. The UI only lists them.

1. Annotate mutating application-service methods with `@RecordSystemEvent`. Do not annotate pure reads, probes, renders, or `SystemEventService` itself.
2. Set `domain` to a `SystemEventDomains` constant (`models`, `prompts`, `mcp-servers`, `workspaces`, `settings`, …). Add a constant before a capability starts recording.
3. Use a short past-tense `name` (for example `Model created`). Put durable identifiers in `comment` with `#{…}` SpEL templates (`#result`, named parameters, and `#error` when `recordOnFailure = true`).
4. Leave `operator` blank so the authenticated principal is stored.
5. Recording runs after a successful return and is fail-open. When an annotation cannot express the flow, inject `SystemEventRecorder` and call `record(...)` after the successful unit of work.

```kotlin
@RecordSystemEvent(
    domain = SystemEventDomains.MODELS,
    name = "Model created",
    comment = "Created model #{#result.name} (#{#result.id})",
)
fun create(request: ModelCreateRequest): ModelResponse { … }
```
