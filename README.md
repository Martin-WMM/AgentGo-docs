<p align="center">
  <img src="app/src/resources/agentgo-logo.png" alt="AgentGo Logo" width="180">
</p>

<h1 align="center">AgentGo Docs</h1>

<p align="center">
  <a href="https://github.com/Martin-WMM/AgentGo-docs/actions/workflows/ci.yml"><img src="https://github.com/Martin-WMM/AgentGo-docs/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI"></a>
  <a href="https://img.shields.io/github/stars/Martin-WMM/AgentGo-docs"><img src="https://img.shields.io/github/stars/Martin-WMM/AgentGo-docs" alt="GitHub stars"></a>
  <img src="https://img.shields.io/badge/Vue-3.5.13-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue 3.5.13">
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.8.2">
  <img src="https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white" alt="Node.js 22">
  <img src="https://img.shields.io/badge/pnpm-10.28.1-F69220?logo=pnpm&logoColor=white" alt="pnpm 10.28.1">
</p>

## 1. Introduction / 简介

AgentGo Docs is the bilingual documentation site for using, integrating, extending,
operating, and developing AgentGo across the backend, web UI, and desktop client.

AgentGo Docs 是 AgentGo 双语文档站，覆盖后端、Web UI 和桌面客户端的使用、集成、扩展、运维及二次开发。

## 2. Updates / 更新

- Simplified Chinese and English documentation are maintained together.
- Guides cover quick start, reference, integration, secondary development, and architecture.
- Documentation quality, dependency, and security checks run in CI。

- 同步维护简体中文和 English 文档。
- 内容覆盖快速上手、参考文档、集成扩展、二次开发和系统架构。
- CI 执行文档质量、依赖和安全检查。

## 3. Getting Started / 快速开始

Requirements / 环境要求: Node.js 22 and pnpm 10.28.1。

```bash
pnpm install
pnpm dev
```

Useful sections / 常用文档:

- [Quick Start / 快速上手](app/src/resources/快速上手/quick-start_zh.md)
- [Reference / 参考文档](app/src/resources/参考文档/README.md)
- [Integration / 集成与扩展](app/src/resources/集成与扩展/README.md)
- [Secondary Development / 二次开发](app/src/resources/二次开发/README.md)
- [Architecture / 设计哲学与架构](app/src/resources/设计哲学/system-architecture.md)

## 4. Contribution / 参与贡献

Read [AGENTS.md](AGENTS.md), [CONTRIBUTING.md](CONTRIBUTING.md), and
[SECURITY.md](SECURITY.md). Document every externally visible backend, UI, or desktop
contract change here。

请阅读 [AGENTS.md](AGENTS.md)、[CONTRIBUTING.md](CONTRIBUTING.md) 和
[SECURITY.md](SECURITY.md)，并在此记录所有对外可见的后端、UI 或桌面端契约变更。

## 5. License / 许可证

This project is governed by the [AgentGo Proprietary License](LICENSE)。All rights
belong to Martin M. W. (王美民). Any use, modification, distribution, or commercial
use requires prior written confirmation at `blessedwmm@gmail.com`。

本项目采用 [AgentGo Proprietary License](LICENSE)。所有权利归 Martin M. W.（王美民）所有。
任何使用、修改、分发或商业用途，均须先通过 `blessedwmm@gmail.com` 获得本人书面确认授权。

## Related Projects / 相关项目

- [AgentGo Backend](https://github.com/Martin-WMM/AgentGo-backend) · [AgentGo UI](https://github.com/Martin-WMM/AgentGo-UI)
- [AgentGo Desktop](https://github.com/Martin-WMM/AgentGo-desktop)
