# Stage 1: Install dependencies
FROM node:20-alpine AS dependencies

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache libc6-compat git python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Stage 2: Build application
FROM dependencies AS builder

WORKDIR /app

# Copy source code
COPY . .

# Build the application with production optimizations
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Start the server
CMD ["node", ".output/server/index.mjs"]
