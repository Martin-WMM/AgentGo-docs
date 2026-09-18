# AgentGo Docs Agent Instructions

## Project identity

AgentGo Docs is a bilingual documentation project for AgentGo, an extensible intelligent-agent platform built around a general Agent Loop and harness engineering. The documentation must explain the platform clearly to developers who want to use, integrate, extend, or build on AgentGo.

## Code requirements

- Use Vue 3, TypeScript, Vite, pnpm workspaces, Tailwind CSS 4, and shadcn-vue-compatible components.
- Keep the workspace split between `app` and `packages/ui`; shared UI belongs in `@agentgo/ui`.
- Support Simplified Chinese (`zh-CN`) and English (`en-US`) from the first implementation. All user-facing copy must have both translations; do not hard-code interface text in templates.
- Persist the selected locale and provide a visible language switcher. Use English as the fallback locale when a translation key is missing.
- Support light and dark themes. Persist the selected theme, respect the system preference on first visit, and expose a visible theme switcher.
- Use Iconify for every icon. Use `@iconify/vue` with named icon identifiers; do not add Lucide, Font Awesome, inline SVG icons, emoji icons, or hand-drawn icon components.
- Prefer semantic HTML, keyboard navigation, visible focus states, responsive layouts, and accessible names for controls.
- Use design tokens and Tailwind utilities. Do not duplicate theme colors in component templates.
- Keep documentation content in typed Vue data or Vue components until a Markdown/content system is explicitly introduced.
- Add or update a focused test when changing routing, locale behavior, theme behavior, or shared UI behavior.

## Repository workflow

- Every bug, task, improvement, documentation change, and new requirement starts with a GitHub Issue. Describe the context, expected outcome, acceptance criteria, and relevant labels in the issue before creating implementation branches or pull requests.
- Protected branches: `main` and `release/*` must not accept direct pushes.
- Intended flow: `main` -> `release/<name>` -> `feature/*` or `fix/*` -> PR -> `release/<name>` -> PR -> `main`.
- `release/*` branches are long-lived release integration branches and must never be deleted automatically or manually as part of a merge. `feature/*` and `fix/*` branches are short-lived and are deleted automatically after their PR is merged.
- Every pull request must reference at least one issue using GitHub closing syntax such as `Closes #123`, except for repository-maintenance changes that are explicitly tracked by a maintenance issue.
- `deploy` is a generated GitHub Pages branch. It is updated only by the deployment workflow after a PR is merged into `main`; never edit it manually.
- Every commit must change no more than 200 source/config lines total (added plus deleted). Generated dependency lockfiles are excluded from this count and must remain reproducible; split all other larger work into coherent commits before committing.
- Commit format is `<emoji>[<type>]: <message>`, for example `✨[feat]: add bilingual navigation` or `🛠️[fix]: correct dark mode persistence`.
- Pull requests must pass typecheck, tests, lint, formatting, accessibility/security checks, and commit-size validation before merge.
- Never commit secrets, generated dependency directories, build output, or local environment files.

## CI and release rules

- Every commit runs compliance, formatting, typecheck, test, build, dependency/security, and secret scanning checks.
- Merges into `main` build the app with pnpm and publish the generated static site to `deploy`.
- Merges into `release/<name>` create tag `<name>` if it does not already exist.
- CI must fail on any error; warnings must not be used to bypass a required check.
- The repository must keep PR, issue, security, contribution, and code-of-conduct guidance current.

## Working agreement for agents

1. Read this file before changing code.
2. Inspect the existing implementation and preserve unrelated user changes.
3. Make the smallest coherent change, then run the relevant checks.
4. Report blocked external actions explicitly, especially GitHub operations requiring authentication or repository-plan permissions.
