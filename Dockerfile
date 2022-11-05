FROM node:18

RUN corepack enable

WORKDIR /time-tracing-api

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm i

COPY . .
