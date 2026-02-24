# ─────────────────────────────────────────────
#  Backend – Node.js / Express / Mongoose
# ─────────────────────────────────────────────

# Use the official Node.js LTS Alpine image for a small footprint
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of the application source
COPY . .

# The server listens on 8080 by default (see server.js)
EXPOSE 8080

# Start the Express server
CMD ["node", "server.js"]
