# 🧱 Team Shuffler

[![Quality Gate](https://img.shields.io/github/actions/workflow/status/BondIT-ApS/team-shuffler/pr-quality-gate.yml?branch=main&label=quality%20gate&style=for-the-badge)](https://github.com/BondIT-ApS/team-shuffler/actions/workflows/pr-quality-gate.yml)
[![Build](https://img.shields.io/github/actions/workflow/status/BondIT-ApS/team-shuffler/build-and-push.yml?branch=main&label=build&style=for-the-badge)](https://github.com/BondIT-ApS/team-shuffler/actions/workflows/build-and-push.yml)
[![License](https://img.shields.io/github/license/BondIT-ApS/team-shuffler?style=for-the-badge)](LICENSE)
[![Repo Size](https://img.shields.io/github/repo-size/BondIT-ApS/team-shuffler?style=for-the-badge)](https://github.com/BondIT-ApS/team-shuffler)
[![Made in Denmark](https://img.shields.io/badge/made%20in-Denmark%20🇩🇰-red?style=for-the-badge)](https://bondit.dk)
[![Powered by Coffee](https://img.shields.io/badge/powered%20by-coffee%20☕-brown?style=for-the-badge)](https://bondit.dk)

[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-team--shuffler--frontend-blue?logo=docker&style=for-the-badge)](https://hub.docker.com/r/bonditgroup/team-shuffler-frontend)
[![Docker Pulls](https://img.shields.io/docker/pulls/bonditgroup/team-shuffler-frontend?style=for-the-badge)](https://hub.docker.com/r/bonditgroup/team-shuffler-frontend)

## 🔀 Building Better Teams, One Brick at a Time

Welcome to Team Shuffler — where we do for team assignments what LEGO did for building: make it structured, repeatable, and surprisingly satisfying.

Paste a list of names, choose how many teams to create, and watch them animate into perfectly balanced groups. Like snapping LEGO bricks together, every person clicks into the right place. Built with a LEGO-inspired design that's polished enough for the boardroom but fun enough for a workshop.

## 🚀 Features — The Building Blocks

- **🔀 Fair Team Shuffling** — Fisher-Yates algorithm with balanced remainder distribution, like a master builder distributing bricks evenly
- **🔒 Lock Assignments** — Lock specific people to their teams before reshuffling, for when some bricks must stay in place
- **🎯 Presentation Mode** — Full-screen team display for projectors and screens, because every build deserves an audience
- **🏷️ Named or Numbered Teams** — Toggle between Alpha/Bravo/Charlie… or Team 1/2/3 — your call, your build
- **📋 Copy Results** — One-click clipboard export for sharing assignments via chat or email
- **✅ Input Validation** — Catches duplicate names and impossible configurations before you hit shuffle
- **⚡ Smooth Animations** — Framer Motion spring animations with full reduced-motion support
- **🎨 LEGO Design System** — Chunky borders, bold fonts, and a team color palette straight from the brick catalogue
- **🐳 Dockerized Deployment** — As easy to deploy as following a LEGO instruction manual

## 🧱 Getting Started — Foundation Pieces

### Prerequisites — Tools You'll Need

- [Node.js 20+](https://nodejs.org/) — Your primary building tool
- [Docker](https://www.docker.com/get-started) — For containerized deployment

### Local Development — Assembly Instructions

1. **📦 Clone the repository**:
    ```bash
    git clone https://github.com/BondIT-ApS/team-shuffler.git
    cd team-shuffler
    ```

2. **📦 Install dependencies**:
    ```bash
    npm install
    ```

3. **🚀 Start the dev server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) — just like that satisfying click when bricks snap together!

4. **🧪 Run tests**:
    ```bash
    npm test          # run once
    npm run test:watch  # watch mode
    ```

5. **🔍 Lint**:
    ```bash
    npm run lint
    ```

### 🐳 Docker — Pre-Built Bricks

The production image is published to Docker Hub on every merge to `main`:

```bash
docker pull bonditgroup/team-shuffler-frontend:latest
docker run -p 3000:3000 bonditgroup/team-shuffler-frontend:latest
```

**Docker Hub:** [bonditgroup/team-shuffler-frontend](https://hub.docker.com/r/bonditgroup/team-shuffler-frontend)

## ☸️ Kubernetes Deployment — Advanced Building

Production runs on Kubernetes via ArgoCD. The [`k8s/`](./k8s/) folder contains the Helm chart used by the prod ArgoCD application.

| File | Purpose |
|------|---------|
| `k8s/Chart.yaml` | Helm chart metadata |
| `k8s/values.yaml` | Base configuration |
| `k8s/values-prod.yaml` | Production overrides — **bump `image.tag` here to deploy** |
| `k8s/templates/` | Deployment, Service, Ingress, InfisicalSecret |
| `k8s/secrets-template.yaml` | Environment variable reference |

### Deploying to Production

```bash
# 1. Create a git tag (triggers Docker Hub build)
git tag 26.3.2 && git push origin 26.3.2

# 2. Once the image is on Docker Hub, bump the tag in k8s/values-prod.yaml
# image:
#   tag: "26.3.2"

# 3. Push to main — ArgoCD syncs automatically
```

## 🔐 CI/CD Pipeline — The Instruction Manual

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `pr-quality-gate.yml` | Pull Requests | Lint, test, type-check, Docker build verification |
| `build-and-push.yml` | Push to `main` / git tags | Build and publish to Docker Hub |
| `security-monitoring.yml` | Weekly (Sunday) | CodeQL static analysis |

### Versioning — YYMM.PATCH

Tags follow `YY.MM.PATCH` format (e.g. `26.3.1`). Dev auto-deploys on every `main` push via ArgoCD Image Updater. Prod requires a manual tag bump in `k8s/values-prod.yaml`.

## 🧰 Architecture — The Building Design

Just like a well-designed LEGO set, Team Shuffler consists of a few precision-crafted pieces:

1. **Next.js 15 (App Router)** — The baseplate everything builds on
2. **TypeScript** — The instruction manual that keeps pieces the right shape
3. **Tailwind CSS v4** — The colour palette and stud spacing guide
4. **Framer Motion** — The satisfying click when pieces connect
5. **Vitest** — The quality inspector who checks every brick

```
src/
├── app/
│   ├── page.tsx          # Main shuffler UI
│   └── present/          # Presentation mode (full-screen)
├── components/shuffler/  # NameInput, TeamContainer, Controls…
├── hooks/useShuffler.ts  # Core state machine
├── lib/
│   ├── shuffle.ts        # Fisher-Yates algorithm
│   └── shuffle.test.ts   # Unit tests
└── styles/themes/lego.ts # Design tokens
```

## 👷 Contributing — Join the Building Team

Contributions are welcome! Like any good LEGO enthusiast, we believe more builders create better creations.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request — the quality gate will check your bricks automatically

## 📄 License — The Building Rules

This project is licensed under the MIT License. Like LEGO, you're free to rebuild and reimagine as you see fit!

---

## 🏢 About BondIT ApS

This project is maintained by [BondIT ApS](https://bondit.dk), a Danish IT consultancy that builds digital solutions one brick at a time. Just like our fellow Danish company LEGO, we believe in building things methodically, with precision and a touch of playfulness. Because the best solutions, like the best LEGO creations, are both functional AND fun!

**Made with ❤️, ☕, and 🧱 by BondIT ApS**
