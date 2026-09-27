<p align="center">
  <img src="app/public/assets/logo-dark-light.png" alt="AgentGo" width="180">
</p>

<h1 align="center">AgentGo Docs</h1>

<p align="center">
  <a href="https://github.com/Martin-WMM/AgentGo-docs/actions/workflows/ci.yml"><img src="https://github.com/Martin-WMM/AgentGo-docs/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI"></a>
  <a href="https://github.com/Martin-WMM/AgentGo-docs"><img src="https://img.shields.io/github/stars/Martin-WMM/AgentGo-docs" alt="GitHub stars"></a>
</p>

AgentGo 的双语文档站，覆盖使用、集成、扩展、架构和二次开发。项目内容以简体中文和 English 提供，并支持明暗主题。

## 快速开始

要求：Node.js 22、pnpm 10.28.1。

```bash
pnpm install
pnpm dev
```

质量检查：

```bash
pnpm typecheck
pnpm test
pnpm lint
pnpm exec prettier --check app packages eslint.config.mjs package.json pnpm-workspace.yaml tsconfig.json .prettierrc.json
pnpm build
```

## 文档目录

- [快速上手](app/src/resources/快速上手/quick-start_zh.md)
- [参考文档](app/src/resources/参考文档/README.md)
- [集成与扩展](app/src/resources/集成与扩展/README.md)
- [二次开发](app/src/resources/二次开发/README.md)
- [设计哲学与架构](app/src/resources/设计哲学/system-architecture.md)

贡献前请阅读 [AGENTS.md](AGENTS.md)、[CONTRIBUTING.md](CONTRIBUTING.md) 和 [SECURITY.md](SECURITY.md)。
