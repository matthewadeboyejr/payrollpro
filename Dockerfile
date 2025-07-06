FROM  node:23-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM  node:23-alpine3.20 AS runner

WORKDIR /app

RUN apk add --no-cache curl

COPY --from=builder /app ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl --fail http://localhost:3000 || exit 1

CMD ["npm",  "start"]