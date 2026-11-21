---
author: AgentGo Team
date: 2026-10-11
navOrder: 6
keywords: [API, prompt template, Jinja2, placeholders]
summary: Contract for user-owned prompt templates, including placeholder and restricted Jinja2 rendering.
---

# Prompt templates

Prompt templates are user-owned resources. The API resolves the owner from the authenticated session and does not accept a user id in the request body. A name is unique for one user.

## Fields

- `engine`: `SIMPLE` or `JINJA2`
- `content`: template body, at most 100000 characters
- `description`: optional, at most 2000 characters

## Engines

`SIMPLE` replaces `{{ identifier }}` tokens. The identifier matches `[A-Za-z_][A-Za-z0-9_]*`, and whitespace inside the braces is allowed. Missing variables, unclosed braces, expressions, filters, conditions, and loops fail. Only string, number, and boolean values can be substituted.

`JINJA2` renders a restricted Jinja2 template. Conditions and loops are available. `{% include %}`, `{% import %}`, `{% from %}`, and `{% extends %}` are rejected, and the renderer cannot load external templates. Variables must be JSON scalars, arrays, or objects. Render failures return `PROMPT-004` without engine stack traces.

## Endpoints

All routes are under `/api/v1/promptTemplates` and require an authenticated session.

- `POST /api/v1/promptTemplates` creates a template
- `GET /api/v1/promptTemplates` lists one page of the current user's templates. Query parameters are `page` (default `1`), `size` (default `20`, maximum `100`), repeatable `sort` (`name`, `engine`, `createdAt`, `updatedAt`), and `order` (`ASC` or `DESC`). Omitting `sort` orders by `updatedAt` descending. The envelope `data` field is a page: `data` (the rows), `pageSize`, `totalElements`, `totalPages`, `empty`, `first`, `last`, `size`, and one-based `number`. An unknown sort field or a `size` above 100 returns `PROMPT-002`
- `GET /api/v1/promptTemplates/{id}` reads one template
- `PUT /api/v1/promptTemplates/{id}` replaces one template
- `DELETE /api/v1/promptTemplates/{id}` deletes one template and returns HTTP 204
- `POST /api/v1/promptTemplates/preview` renders an unsaved `engine`, `content`, and `variables` object
- `POST /api/v1/promptTemplates/{id}/render` renders a stored template with a `variables` object

Successful list, create, read, update, delete, and render codes are `9200` through `9205`. Failure codes are `PROMPT-001` through `PROMPT-005`. Missing authentication uses `AUTH-002`.
