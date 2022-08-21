FROM node:16-slim AS builder
RUN apt-get update
RUN apt-get install -y openssl
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=keystone-cms --docker


FROM node:16-slim AS dependencies

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN SKIP_POSTINSTALL=1 yarn install

FROM node:16-slim AS dev

WORKDIR /app
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY --from=dependencies /app/node_modules node_modules
CMD yarn dev

FROM node:16-slim AS prod

WORKDIR /app
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY keystone.ts keystone.ts
COPY --from=dependencies /app/node_modules node_modules
CMD yarn build && yarn start



# Add lockfile and package.json's of isolated subworkspace
FROM node:16-slim AS installer
RUN apt-get update
RUN apt-get install -y openssl
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
COPY turbo.json turbo.json

RUN yarn install
RUN yarn turbo run build --filter=keystone-cms...

FROM node:16-slim AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD yarn start