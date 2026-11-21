---
author: AgentGo Team
date: 2026-10-04
navOrder: 3
keywords: [AgentGo SA, orchestration, task execution, state machine]
summary: Explains how AgentGo SA orchestrates one Agent task and its safe feedback loop.
---

# AgentGo SA design

AgentGo SA is the orchestration boundary for one Agent task. It turns input, authorized context, and Agent configuration into a traceable Execution, coordinating model reasoning, confirmation, tool use, and the final response. SA neither owns resources nor executes external tools directly; it calls Resource Management and Agent Runtime.

## Node responsibilities

| Node            | Input                                          | Output and constraint                                                                                                       |
| --------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Input Node      | User input, Context, Agent Config, identifiers | Creates isolated task state, normalizes content, and associates Session, Task, and Execution.                               |
| Compliance Node | Normalized request and runnable configuration  | Enforces policy, authorization, and content checks before model or tool use; it stops or requests clarification on failure. |
| LLM Node        | Compliant context and tool results             | Produces a response or constrained action intent; model output is never treated as execution approval.                      |
| Execution Node  | Action intent                                  | Validates tool, parameters, authorization, and confirmation state before dispatching a controlled Runtime request.          |
| Response Node   | Final model output or terminal state           | Produces a user-facing response while withholding sensitive internal detail.                                                |

## Execution loop

```text
Input → Compliance → LLM ──no action──→ Response
                       │
                       └─action→ Execution → Agent Runtime → Tool Message ─┘
```

Every loop is bounded by the Execution's time, budget, step, and cancellation limits. Tool results capture structured success, failure, a safe display summary, and related references before returning to the LLM Node. Raw sensitive values never enter model context or user-facing output.

## Idempotency, recovery, and audit

SA maintains stable correlation identifiers per submission and uses idempotency semantics or explicit confirmation for external side effects. Recovery uses persisted state and completed steps; it never blindly replays a potentially side-effecting call. Audit data must answer who initiated the work, which Agent acted with which resource grant, what happened, and when it ended.
