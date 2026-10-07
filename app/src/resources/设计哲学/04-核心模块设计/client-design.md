---
author: AgentGo Team
date: 2026-10-04
navOrder: 1
keywords: [client, web, desktop, user experience]
summary: Defines the responsibilities, boundaries, and interaction principles of AgentGo clients.
---

# Client design

AgentGo provides a Web management experience and a desktop client. Both share the same mental model and backend contract: users manage resources, select or configure an Agent, submit work, and follow execution through to its result.

## Responsibilities and boundaries

Clients collect input, manage UI state, render task progress, expose resource-management flows, and access local capabilities only with explicit user permission. The backend and runtime remain authoritative for authorization, persistence, orchestration, and tool execution.

| Capability           | Client responsibility                                        | Collaboration boundary                                   |
| -------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| Identity and session | Initiate sign-in and retain short-lived UI state             | Never self-grant access or persist sensitive credentials |
| Multimodal input     | Validate size and type; upload text, images, files, or audio | The server confirms acceptance and availability          |
| Resource management  | Provide create, view, update, delete, and grant flows        | Management API results are authoritative                 |
| Task experience      | Submit work, stream progress, cancel, and retry              | Status comes from authoritative SA events or queries     |
| Local capabilities   | The desktop bridges files and notifications after consent    | Access is least-privilege, revocable, and auditable      |

## Interaction principles

1. Make execution boundaries visible: identify the Agent, resources, and required confirmation before work begins, then show phases, tool summaries, and actionable failures.
2. Request permission progressively, only when a local capability or external service is needed.
3. Keep Web and desktop terminology, resource state, and error meanings consistent.
4. Preserve safe drafts during network loss, then re-query authoritative state after reconnecting to avoid duplicate submission.

## State, accessibility, and security

Clients present understandable task states such as pending submission, accepted, running, awaiting confirmation, completed, failed, and cancelled; published contracts define actual state names and event fields. Critical actions remain keyboard accessible with visible focus and status feedback. Sensitive values are masked by default, and neither client logs credentials, secrets, or full private content. Desktop local bridges use explicit allow-lists rather than exposing general system execution to the renderer.
