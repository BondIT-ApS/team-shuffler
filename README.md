# Team Shuffler

A lightweight team assignment tool for workshops, meetings, classrooms, and events.

Paste a list of names, choose how many teams to create, and watch them animate into balanced groups — with a playful LEGO-inspired design that's polished enough for professional use.

## Product summary

Team Shuffler solves a common friction point: quickly and fairly splitting a group of people into teams. It is designed to feel instant and satisfying to use, with an animated LEGO-block visual style that works equally well in a school classroom, a workshop, or a company kick-off.

The MVP is intentionally lean. Future versions will support saved sessions, shareable URLs, multiple visual themes, and a full persistence layer — making it suitable as a public product.

## MVP scope

- Paste or type names (one per line)
- Choose the number of teams
- Balanced assignment with fair remainder distribution
- LEGO-inspired animated team blocks
- Lock individual names before reshuffling
- Reshuffle without losing locked positions
- Copy results to clipboard
- Reset / start over
- Duplicate and empty-line detection
- Accessibility: respects `prefers-reduced-motion`

## Future platform vision

- **Multiple themes** — LEGO is the first theme; the system is built to be extended
- **Shareable URLs** — generate a unique link for a prepared session
- **Saved sessions** — persist title, attendee list, team count, theme, locked assignments, and results
- **Public event view** — attendees open a link and see a prepared team setup
- **Hosted product** — available on a subdomain of `bondit.dk` or a dedicated domain
- **Admin / session management** — manage and revisit past sessions

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Drag & drop (future) | @dnd-kit |
| State (future) | Zustand |
| Database (future) | Prisma + PostgreSQL / Supabase |
| Deployment | Vercel |

## Folder structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # Generic reusable components
│   ├── shuffler/           # Domain-specific components
│   │   ├── NameInput.tsx
│   │   ├── TeamCountSelector.tsx
│   │   ├── TeamContainer.tsx
│   │   ├── NameBlock.tsx   # LEGO-style tile element
│   │   └── ShuffleControls.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── shuffle.ts          # Team balancing algorithm (pure, testable)
│   └── utils.ts
├── hooks/
│   └── useShuffler.ts      # Core app state
└── styles/
    └── themes/
        └── lego.ts         # Theme tokens (extensible)
```

## Local setup

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Install and run

```bash
# Clone the repo
git clone https://github.com/BondIT-ApS/team-shuffler.git
cd team-shuffler

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npm run test      # Run tests
```

## Contributing

This project is maintained by [BondIT ApS](https://bondit.dk). Issues and pull requests are welcome.

## License

MIT
