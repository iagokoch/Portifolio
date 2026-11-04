FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# O Vite grava VITE_* no JavaScript durante o build; vazio = chamadas relativas a /api.
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=build /app/dist /usr/share/caddy
