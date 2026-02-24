# ─────────────────────────────────────────────
#  Frontend – Angular 15  (multi-stage build)
# ─────────────────────────────────────────────

# ── Stage 1: Build ───────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests; install all deps (including devDeps needed by CLI)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the full source and build for production
COPY . .
RUN npm run build -- --configuration production

# The compiled assets end up at dist/angular-15-crud/

# ── Stage 2: Serve ───────────────────────────
FROM nginx:1.25-alpine AS runner

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled Angular output from the builder stage
COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html

# Copy custom Nginx configuration (handles SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx serves on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
