# 1) Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite env variable (build time)
ARG VITE_UNSPLASH_ACCESS_KEY
ENV VITE_UNSPLASH_ACCESS_KEY=$VITE_UNSPLASH_ACCESS_KEY

RUN npm run build

# 2) Production stage (serve dist using nginx)
FROM nginx:alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
