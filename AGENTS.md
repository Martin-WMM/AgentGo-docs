# AgentGo Docs Agent Instructions

## Project identity

AgentGo Docs is the bilingual documentation site and cross-repository contract reference for AgentGo. It explains how to use, integrate, extend, operate, and develop AgentGo across the backend, Web UI, and desktop client.

The local directory is `AgentGo-docs`; the project is **AgentGo Docs** and the GitHub repository is `Martin-WMM/AgentGo-docs`. Use **AgentGo** in all new documentation, issue titles, branch names, release notes, and user-facing project references.

## Repository boundaries

- This repository owns documentation, examples, integration guidance, architecture decisions, API explanations, and release notes.
- `AgentGo-backend` is the authority for server behavior, domain rules, authorization, API contracts, and event contracts.
- `AgentGo-UI` is the Web management and Agent entry point.
- `AgentGo-desktop` is the Electron client for Linux, macOS, and Windows.
- Do not duplicate backend authorization rules or data definitions in this repository. Describe them from the published contract.
- Every externally visible backend, UI, or desktop contract change must be documented here before the corresponding release is considered complete.

## Code and content requirements

- Use Vue 3, TypeScript, Vite, pnpm workspaces, Tailwind CSS 4, and shadcn-vue-compatible components.
- Keep the workspace split between `app` and `packages/ui`; shared UI belongs in `@agentgo/ui`.
- Support Simplified Chinese (`zh-CN`) and English (`en-US`) from the first implementation. User-facing copy must have both translations and must not be hard-coded in templates.
- Persist the selected locale and provide a visible language switcher. Use English as the fallback when a translation key is missing.
- Support light and dark themes. Persist the selected theme, respect the system preference on first visit, and expose a visible theme switcher.
- Use Iconify for every icon through `@iconify/vue` and named icon identifiers. Do not add Lucide, Font Awesome, inline SVG icons, emoji icons, or hand-drawn icon components.
- Prefer semantic HTML, keyboard navigation, visible focus states, responsive layouts, and accessible names for controls.
- Use design tokens and Tailwind utilities. Do not duplicate theme colors in component templates.
- Keep documentation content in typed Vue data or Vue components until a Markdown/content system is explicitly introduced.
- API examples must match the current backend contract, use safe placeholder credentials, and never contain real secrets or personal data.
- Add or update a focused test when changing routing, locale behavior, theme behavior, shared UI behavior, or content navigation.

## Shared AgentGo conventions

The four repositories must use the same conventions for branch governance, commit messages, issue tracking, API terminology, identifiers, timestamps, pagination, errors, and permission names.

- Use the backend-published OpenAPI/JSON Schema and event definitions as the source of truth for API examples and data definitions.
- Use UTC and ISO-8601 timestamps in all examples unless a document explicitly explains another representation.
- Use the canonical names `User`, `Organization`, `Role`, `Permission`, `Agent`, `Session`, `Task`, `Execution`, `Tool`, `Provider`, and `AuditEvent` consistently.
- Document breaking changes, compatibility requirements, migration steps, and deprecations in the same change as the contract update.
- When a contract is not yet published, mark the documentation as provisional rather than inventing a competing schema.

## Issue, branch, and pull request workflow

- Every bug, task, improvement, documentation change, and new requirement starts with a GitHub Issue. The issue must include context, expected outcome, acceptance criteria, and relevant labels.
- Use the shared branch flow:

  ```text
  main -> release/* -> feature/<issue-number>-<short-name> or fix/<issue-number>-<short-name>
       -> PR -> release/* -> PR -> main
  ```

- `main` and `release/*` are protected integration branches and must not receive direct pushes.
- `feature/*` and `fix/*` are short-lived branches and should be deleted automatically after their PR is merged.
- GitHub Pages is published through Actions artifacts; do not create a deployment branch.
- Every pull request must reference at least one issue using GitHub closing syntax such as `Closes #123`, including repository-maintenance changes.
- Pull requests must describe user impact, validation steps, and documentation or screenshot changes when relevant.
- A PR may merge only when all required checks pass and the required reviewers approve it.

## Commit requirements

Use the same commit format in all AgentGo repositories:

```text
<emoji><type>: <message>
```

Examples:

```text
✨feat: add bilingual agent runtime guide
🐛fix: correct permission example for session access
📝docs: document API compatibility policy
🔧chore: standardize documentation checks
```

Allowed types include `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`, and `security`.

- Each commit must contain no more than 300 changed lines in total (added plus deleted).
- Generated dependency lockfile changes may be excluded from the count, but lockfiles must remain reproducible.
- Split larger work into coherent, reviewable commits before committing.
- Merge commits are exempt from ordinary commit-message validation but must still pass repository checks.
- Every commit pushed to a branch must trigger the repository's compliance and quality workflows.

## Quality, security, and CI rules

- Every commit and pull request runs commit compliance, formatting, typecheck, tests, lint, build, dependency audit, secret scanning, and security checks appropriate to the repository.
- CI must fail on errors; warnings must not bypass a required check.
- Keep the frontend quality baseline aligned with AgentGo-UI and AgentGo-desktop: ESLint, Prettier, TypeScript strict checks, unit tests, accessibility checks, dependency auditing, and CodeQL or an equivalent static security scan.
- Never commit secrets, credentials, generated dependency directories, build output, coverage output, or local environment files.
- Keep `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue templates, PR templates, and `CODEOWNERS` current.

## Documentation deployment and release

- A merge into `main` builds the documentation site with pnpm and publishes the generated static site through GitHub Pages Actions artifacts.
- A merge into `main` builds and publishes the Docker image to GHCR.
- The Docker image must be traceable to the source commit and release metadata.
- Release notes must identify the included documentation, API, architecture, and compatibility changes.
- Deployment failures must fail visibly and must not publish a partial build.

## Working agreement for agents

1. Read this file before changing code or documentation.
2. Inspect the existing implementation and preserve unrelated user changes.
3. Check the current backend contract before adding or changing API examples.
4. Make the smallest coherent change, then run the relevant checks.
5. Do not modify another repository unless the task explicitly includes it.
6. Report blocked external actions explicitly, especially GitHub operations requiring authentication or repository-plan permissions.

## Branch governance and AgentGo Project

All branch planning uses [AgentGo GitHub Project #2](https://github.com/users/Martin-WMM/projects/2).
This repository is linked to that shared Project; do not create a separate planning board.

```text
main -> release/<name> -> feature/<issue-number>-<name> or fix/<issue-number>-<name>
     feature/fix -> PR -> their source release/<name> -> PR -> main
main -> hotfix/<issue-number>-<name> -> PR -> main
```

- Create `release/*` and `hotfix/*` from an up-to-date `origin/main`.
- Create `feature/*` and `fix/*` from the intended, up-to-date `origin/release/*`, never directly from `main`.
- A PR into `release/*` must come from `feature/*` or `fix/*` created for that release.
- A PR into `main` must come from `release/*` or `hotfix/*`; feature/fix branches cannot target `main`.
- `main` and every `release/*` prohibit deletion, force pushes, and direct pushes. Change them only through PRs with all required checks passing.
- Retain `release/*` permanently, including after promotion to `main`. Never remove or bypass their deletion protection for cleanup.
- Disable repository-wide automatic head-branch deletion. Cleanup may delete only merged `feature/*`, `fix/*`, and `hotfix/*`.
- After merging a hotfix to `main`, synchronize active release branches through a project-tracked `fix/*` PR based on each affected release; do not push synchronization commits directly.

Before creating any release, feature, fix, or hotfix branch:

1. Create a repository Issue with context, expected outcome, acceptance criteria, and labels.
2. Add it to AgentGo Project #2 and set `Branch`, `Source branch`, `Target branch`, and `Status`.
3. For a release, record `Source branch = main` and `Target branch = main`; for feature/fix, record the same source and target release; for hotfix, record `main` as both.
4. Set `Status = In Progress` when work starts. Create the branch only after verifying Project membership with the authenticated GitHub CLI.
5. Add every associated PR to the same Project, populate its branch fields, and link the Issue using `Closes #<number>`.
6. Set the Issue and PR items to `Done` only when their acceptance criteria are met; retain release planning items and branches.

Each PR body must include the following machine-readable lines in addition to the repository template:

```text
Closes #<issue-number>
Project: https://github.com/users/Martin-WMM/projects/2
Source branch: <main-or-release/name>
```

The required `Branch flow policy` check validates permitted source/target branch types, issue naming and links, the declared source branch, and Git ancestry. Git does not record which checkout command created a branch; agents must verify the Project's source-branch field before creation. The PR check validates the Project declaration; actual Project membership and item fields must be verified with `gh project` during planning and review. Do not claim that a URL alone proves membership.

Use `gh project item-add 2 --owner Martin-WMM --url <issue-or-pr-url>` and `gh project item-edit` to manage items. GitHub Actions' repository token does not provide user-Project automation permissions; never copy an interactive login credential into Actions secrets. Automated Project membership checks require a separately provisioned Projects credential.
