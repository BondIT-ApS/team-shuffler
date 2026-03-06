# AGENTS.md — Team Shuffler

Read this before touching anything in this repo.

## What Is This

A LEGO-themed team assignment tool built with Next.js 15. Paste names, pick team count, shuffle. Designed for workshops, meetings and presentations.

**Live:**
- Dev: https://team-shuffler.dev.bondit.dk
- Prod: https://team-shuffler.bondit.dk

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Tests | Vitest |
| Runtime | Node 24 Alpine (non-root uid 1001) |
| Registry | Docker Hub — `bonditgroup/team-shuffler-frontend` (public) |

## Repo Structure

```
src/
├── app/
│   ├── page.tsx            # Main shuffler UI
│   └── present/page.tsx    # Presentation mode (full-screen, opens in new tab)
├── components/
│   ├── layout/             # Header, Footer
│   └── shuffler/           # NameInput, TeamCountSelector, ShuffleControls, TeamContainer, NameBlock
├── hooks/useShuffler.ts    # All shuffler state (names, teamCount, result, locks, validation)
├── lib/
│   ├── shuffle.ts          # Fisher-Yates algorithm
│   └── shuffle.test.ts     # Unit tests
└── styles/themes/lego.ts   # Design tokens (colours, shadows, fonts)
```

## Design System

Design tokens live in `src/styles/themes/lego.ts`. Use `legoTheme.*` — don't hardcode colours or shadows.

**Team colours:** `legoTheme.teamColors` — 8 colours, cycle with `teamIndex % 8`

**Team names:** Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel (defined in `src/app/page.tsx`)

## Versioning

- `YY.MM.0` — monthly release, auto-created on 1st of month by `monthly-release.yml`
- `YY.MM.PATCH` — manual feature/hotfix releases created with `git tag`

```bash
git tag 26.3.2 && git push origin 26.3.2
```

The build workflow picks up the tag and pushes `bonditgroup/team-shuffler-frontend:26.3.2` + `:latest` to Docker Hub.

## Deployment

### Dev (auto)
ArgoCD Image Updater watches Docker Hub with `semver` strategy and `allow-tags: regexp:^[0-9]+\.[0-9]+\.[0-9]+$`.
Push a new semver tag → Docker Hub → Image Updater detects it → writes tag to infra repo → ArgoCD syncs.

### Prod (manual)
1. Push a semver git tag (triggers Docker Hub build)
2. Bump `image.tag` in `k8s/values-prod.yaml`
3. Push to main → ArgoCD syncs

### Helm chart
- Dev chart: `consultant-portal-infra/charts/team-shuffler/`
- Prod chart: `k8s/` in this repo (source of truth for prod ArgoCD app)

## Secrets

Managed via **Infisical** (project: `bond-it-consultant-portal-xy9v`).

| Secret | Description |
|--------|-------------|
| `TEAMSHUFFLER_APP_URL` | Public URL of the app |

Infisical identity IDs are injected via the ArgoCD app spec in `consultant-portal-infra` — they do NOT belong in `k8s/values-prod.yaml`.

**Namespace:** `team-shuffler` (both dev and prod clusters)

⚠️ The Infisical RBAC (`bootstrap/dev/infisical-k8s-auth-rbac.yaml`) is NOT GitOps-managed — if adding a new namespace, `kubectl apply` it manually. See infra issue #110.

## CI / CD Workflows

| Workflow | Trigger | Does |
|----------|---------|------|
| `quality-gate.yml` | Push to `main` | Lint, test, audit |
| `pr-quality-gate.yml` | Pull Requests | Full gate: lint, test, typecheck, audit, Docker build + LEGO PR comments |
| `build-and-push.yml` | Push to `main` / git tags | Build + push to Docker Hub, bakes `APP_VERSION` build arg |
| `monthly-release.yml` | 1st of month / manual | Creates `YY.MM.0` tag + GitHub release with PR changelog |
| `security-monitoring.yml` | Weekly Sunday | CodeQL JS/TS scan |

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest
npm run lint       # ESLint
npx tsc --noEmit   # Type check
```

## Commit Style

- Commit as `MaBoNi <martin@bondit.dk>` — no AI attribution anywhere
- No `Co-Authored-By` trailers
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
