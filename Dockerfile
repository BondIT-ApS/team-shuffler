# ── Stage 1: Install dependencies ───────────────────────────────────────────
FROM node:24-alpine AS deps
WORKDIR /app

# Install only production-critical native build tools, then clean up
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && \
    # Remove npm cache to reduce layer size
    npm cache clean --force

# ── Stage 2: Build ──────────────────────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app

# Need full deps (including devDeps) for the build
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Stage 3: Runtime ─────────────────────────────────────────────────────────
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Apply latest OS security patches and create non-root user
RUN apk upgrade --no-cache && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the standalone output and static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
