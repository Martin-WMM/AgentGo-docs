---
author: AgentGo Team
date: 2026-10-04
keywords: [项目背景, 设计哲学, AgentGo]
summary: 阐明 AgentGo 作为可配置、可落地智能体平台的定位，以及它如何聚合能力、支持部署和扩展。
---

# 项目背景

![AgentGo Logo](./_resources/agentgo-logo.png)

## AgentGo 是什么

AgentGo 是一个面向个人、团队与组织的智能体平台。它的目标不是提供一次性的模型对话入口，而是将用户、资源、工具、模型与运行流程组织为可配置、可管理、可持续演进的智能体工作环境。

在基础使用场景中，AgentGo 强调两项体验：**可配置**与**开箱即用**。用户可以从可理解的配置开始，选择或创建智能体、连接所需资源，并在统一的交互入口中完成任务；平台同时为需要更高控制力的团队保留部署、接入和开发扩展空间。

## 平台定位

AgentGo 是一个一体化、可落地的完整平台项目。它以统一的平台能力承接智能体从创建到运行、从治理到扩展的完整链路，主要包括：

- **用户认证与管理**：为用户、组织、角色与权限提供一致的身份和访问边界。
- **资源管理**：集中管理工作区、数据源、外部服务、凭据、MCP Server、Skills 等可授权资源。
- **智能体配置**：支持定义智能体的角色、模型配置、提示词、工具组合与运行策略。
- **任务运行与协作**：让用户输入、上下文、智能体配置与执行结果在受控流程中协同工作。

这使 AgentGo 不只是“能调用模型”的应用，而是可以进入实际工作流、被运维和持续扩展的智能体基础设施。

## 相关项目

AgentGo 的完整平台能力由以下仓库协同交付：

| 项目                                                                                                                                                                                           | 职责                                            | GitHub                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <strong>AgentGo Backend</strong><br /><span class="project-badge project-badge--backend">Backend</span><span class="project-badge">Kotlin</span><span class="project-badge">Spring Boot</span> | 服务端智能体运行时、业务逻辑、数据与集成 API。  | <a class="repository-link" href="https://github.com/Martin-WMM/AgentGo-backend" target="_blank" rel="noreferrer"><img class="repository-link__icon" src="https://github.githubassets.com/favicons/favicon.svg" width="18" height="18" alt="GitHub" /><span>AgentGo-backend</span></a> |
| <strong>AgentGo Desktop</strong><br /><span class="project-badge project-badge--desktop">Desktop</span><span class="project-badge">Electron</span>                                             | 已安装的桌面客户端及其本地系统能力连接。        | <a class="repository-link" href="https://github.com/Martin-WMM/AgentGo-desktop" target="_blank" rel="noreferrer"><img class="repository-link__icon" src="https://github.githubassets.com/favicons/favicon.svg" width="18" height="18" alt="GitHub" /><span>AgentGo-desktop</span></a> |
| <strong>AgentGo UI</strong><br /><span class="project-badge project-badge--ui">Frontend</span><span class="project-badge">Vue</span>                                                           | 面向 AgentGo 客户端的可复用前端界面与交互流程。 | <a class="repository-link" href="https://github.com/Martin-WMM/AgentGo-UI" target="_blank" rel="noreferrer"><img class="repository-link__icon" src="https://github.githubassets.com/favicons/favicon.svg" width="18" height="18" alt="GitHub" /><span>AgentGo-UI</span></a>           |
| <strong>AgentGo Docs</strong><br /><span class="project-badge project-badge--docs">Documentation</span><span class="project-badge">Bilingual</span>                                            | 双语产品与开发者文档、集成指南和架构说明。      | <a class="repository-link" href="https://github.com/Martin-WMM/AgentGo-docs" target="_blank" rel="noreferrer"><img class="repository-link__icon" src="https://github.githubassets.com/favicons/favicon.svg" width="18" height="18" alt="GitHub" /><span>AgentGo-docs</span></a>       |

## 聚合能力，而不是堆叠功能

智能体要真正完成工作，需要的不仅是推理能力，还需要能够在合适的边界内获取信息、调用工具、执行操作并返回可追踪的结果。AgentGo 将这些能力聚合到统一的平台模型中，并通过标准化协议接入外部能力。

标准化接入让工具、数据、服务和可复用工作流能够以一致的方式被发现、授权、加载和调用。对智能体而言，这意味着它可以依据任务需要使用受控的能力，而不必把每一种集成都变成一次独立的定制开发。

因此，AgentGo 追求的是“**会行动，少思考**”的智能助手：在明确目标、权限和上下文后，智能体应把更多精力用于可靠执行、反馈结果与处理例外，而不是反复停留在没有行动的推理循环中。

## 本地部署与持续扩展

AgentGo 支持本地化部署，使组织能够按自身的网络、数据治理和运行要求部署平台。在此基础上，平台支持动态接入能力：团队可以按需引入新的工具、服务、数据源或协议适配，而无需重建整套智能体运行环境。

对于更具体的业务需求，AgentGo 也支持二次开发。开发者可以在清晰的模块边界和标准接入方式下，扩展领域能力、连接内部系统，并将新的能力纳入统一的认证、资源管理与智能体配置体系。

## 设计原则

AgentGo 的项目背景最终落实为以下原则：

1. **先可用，后复杂**：基础能力应可配置并开箱即用；复杂度只在确有需要时暴露。
2. **能力可组合**：模型、工具、资源和工作流通过标准化边界组合，而非相互耦合。
3. **行动受治理**：智能体的每次资源访问和外部操作都应在身份、权限与审计边界内进行。
4. **平台可落地**：部署、运行、资源管理和二次开发与智能体体验同等重要。

关于 AgentGo 需要解决的具体问题与用户期望，请继续阅读 [用户需求](../02-用户需求/user-needs.md)；关于平台组成与运行协作方式，请阅读 [架构设计](../03-架构设计/system-architecture.md)。
