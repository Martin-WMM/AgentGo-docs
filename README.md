# AgentGo Docs

AgentGo Docs is the bilingual documentation site for AgentGo, an extensible intelligent-agent platform centered on a general Agent Loop and harness engineering. It is designed to connect agents with external tools and resources and to support extension and secondary development.

## Stack

- Vue 3 + TypeScript + Vite
- pnpm workspace Monorepo
- Tailwind CSS 4
- shadcn-vue-compatible components in `packages/ui`
- Iconify for all icons
- Simplified Chinese and English locales
- Light and dark themes

## Workspace

```text
app/          Documentation application
packages/ui/  Shared UI components
```

## Development

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm typecheck
pnpm test
pnpm lint
pnpm format
pnpm build
```

## Docker image

After a pull request is merged into `main`, GitHub Actions publishes the image to GHCR and creates a GitHub Release containing a compressed Docker image archive.

```bash
docker pull ghcr.io/martin-wmm/agentgo-docs:latest
docker run --rm -p 8080:80 ghcr.io/martin-wmm/agentgo-docs:latest
```

Open the local URL printed by Vite. The app includes locale and theme controls in the header.

## Contribution

Read [AGENTS.md](./AGENTS.md), [CONTRIBUTING.md](./CONTRIBUTING.md), and [SECURITY.md](./SECURITY.md) before contributing. Changes flow through feature or fix branches and pull requests; `main`, `release/*`, and `deploy` are governed branches.

## License

The project license will be added when the AgentGo distribution license is finalized.
