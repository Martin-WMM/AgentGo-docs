FROM node:22-alpine AS build

WORKDIR /workspace
RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY app/package.json app/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN pnpm install --frozen-lockfile

COPY . .
# TEST gateway mounts the docs container at /docs/; GitHub Pages keeps the default base.
ARG VITE_BASE=/docs/
ENV VITE_BASE=$VITE_BASE
RUN pnpm build

FROM nginx:1.27-alpine
COPY --from=build /workspace/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
