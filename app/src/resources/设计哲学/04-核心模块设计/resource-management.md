---
author: AgentGo Team
date: 2026-10-04
navOrder: 2
keywords: [resource management, User Environment, authorization, credentials]
summary: Defines lifecycle, authorization, and runtime-assembly principles for user-environment resources.
---

# Resource management design

Resource Management is the authoritative entry point for the AgentGo User Environment. It manages file workspaces, data sources, Web SaaS, credentials, user profiles, memory, MCP Servers, Skills, and Agent definitions so they can be safely discovered and assembled into task context when needed.

## Core responsibilities

| Responsibility       | Design requirement                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| Lifecycle            | Create, version, disable, and delete resources while retaining required ownership and audit data.         |
| Access control       | Evaluate access by User, Organization, Role, Permission, and visibility; recheck every runtime load.      |
| Credential isolation | Store credentials separately from business resources; consumers receive controlled use, never plaintext.  |
| Discovery            | Supply authorized runtimes with metadata and runnable configurations, not indiscriminate resource access. |
| Traceability         | Associate changes, grants, discovery, loading, and use with an Actor, Task, or Execution.                 |

## Runtime assembly

A resource is not automatically context. At task start, the module filters candidates by identity, task goal, Agent configuration, resource state, and authorization. The Context Manager then turns only necessary information into Runnable Configuration. This is minimum disclosure: assemble only the descriptions, capabilities, and controlled references needed for the task.

## Consistency and failures

Changes need an explicit version or update time so an Execution can be associated with the configuration it used. Revoked, disabled, or credential-invalid resources fail closed during later loads and calls, returning recoverable errors to the orchestration layer. Deletion follows published retention and audit policies and never copies sensitive configuration into context or logs.
