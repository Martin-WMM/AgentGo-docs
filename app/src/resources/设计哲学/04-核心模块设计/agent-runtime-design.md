---
author: AgentGo Team
date: 2026-10-04
navOrder: 4
keywords: [Agent Runtime, tool execution, MCP, Skill]
summary: Defines Agent Runtime's controlled execution boundary and tool-adaptation principles.
---

# Agent Runtime design

Agent Runtime performs approved external operations, such as invoking a Skill, MCP Server, or another authorized service. It is the final execution boundary between policy-validated action intent and real side effects, not a general-purpose command runner.

## Controlled execution model

Runtime accepts only Execution Node requests that carry Execution correlation. Each invocation resolves into a target capability, allowed parameter range, resource reference, credential reference, timeout, and result policy. Together these form a controlled invocation, never a freely composed command.

| Phase         | Runtime behavior                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| Admission     | Validate caller, Execution state, tool availability, resource grant, and confirmation requirements.     |
| Adaptation    | Map the normalized request to a Skill, MCP, or service-specific protocol and validate parameters.       |
| Execution     | Apply timeout, concurrency, retry, and cancellation controls; minimize credential scope and lifetime.   |
| Normalization | Convert output into a structured Tool Message with result, error, references, and safe display summary. |
| Recording     | Produce Execution-linked audit data and runtime metrics without plaintext secrets.                      |

## Security and reliability

The tool registry is allow-listed and declares its I/O contract, required permissions, and side-effect level. Runtime never accepts arbitrary endpoints, local commands, or credential values directly from a model. Writes, deletion, publishing, and external notification require SA-validated confirmation. Failures never increase privilege or silently fall back to higher-privilege resources. Retry is restricted to explicitly side-effect-free or idempotent operations, and cancellation is propagated downstream where possible with an accurate terminal state.
