# ─── build stage ──────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 1) install deps (from client/package.json)
COPY client/package*.json ./
RUN npm ci

# 2) copy over public assets & server images
COPY client/public ./public

# 3) copy your client source
COPY client ./

# 4) build the Next.js app
RUN npm run build

# ─── runtime stage ───────────────────────────────────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

# install only production deps
COPY client/package*.json ./
RUN npm ci --omit=dev

# copy build output from builder
COPY --from=builder /app/.next  ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

EXPOSE 3000
CMD ["npm","run","start"]
