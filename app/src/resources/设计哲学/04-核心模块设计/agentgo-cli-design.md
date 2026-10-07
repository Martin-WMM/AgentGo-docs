---
author: AgentGo Team
date: 2026-10-04
navOrder: 5
keywords: [AgentGo CLI, command line, automation, operations]
summary: Defines AgentGo CLI's scripted-management boundary, command experience, and security requirements.
---

# AgentGo CLI design

AgentGo CLI is the command-line entry point for developers, administrators, and automation. It manages and queries resources, Agents, tasks, and runtime state through the same published server contracts used by clients; it does not create a second set of business rules.

## Command organization

Commands are grouped by domain and use stable, discoverable verbs and resource names. The following shape is illustrative; released CLI reference documentation defines the actual commands and options.

```text
agentgo auth <subcommand>
agentgo resource <list|get|create|update|delete>
agentgo agent <list|get|create|update|delete>
agentgo task <submit|get|cancel|logs>
agentgo config <get|set>
```

Reads are side-effect free by default. Create, update, delete, submit, and cancel operations clearly identify their target and result. Potentially broad-impact actions support explicit confirmation, `--dry-run` where applicable, and non-interactive automation options.

## Input, output, and automation

| Area                   | Requirement                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Input                  | Accept arguments, standard input, and safe configuration references; secrets never appear in arguments, history, or normal output.          |
| Output                 | Offer concise human output and stable machine-readable output; diagnostics go to standard error.                                            |
| Exit status            | Let scripts distinguish success, user-input error, authentication or authorization denial, remote failure, and local configuration failure. |
| Pagination and filters | Follow server-defined pagination, ordering, and filter semantics rather than inventing local behavior.                                      |

## Authentication, observability, and compatibility

The CLI uses platform-supported secure credential storage or short-lived sessions and never writes tokens to project files, history, or debug logs. Configuration has explicit scope and precedence; users can inspect its source without revealing sensitive values. Commands can emit request or Execution correlation identifiers to link users to details in the Web or desktop client. Breaking changes follow versioning and deprecation policy, and convenience commands never change backend authorization, audit, or orchestration rules.
