FROM node:14 AS builder

WORKDIR /app

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=4096

RUN yarn install
RUN yarn build

FROM node:14-alpine
WORKDIR /app

COPY --from=builder /app ./

CMD ["yarn","start"]
