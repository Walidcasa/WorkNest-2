FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY apps/api/package.json ./package.json

RUN npm install --include=dev --legacy-peer-deps

COPY apps/api/prisma ./prisma/

RUN npx prisma generate

COPY apps/api/src ./src/
COPY apps/api/tsconfig.json ./tsconfig.json

RUN npm run build

ENV NODE_ENV=production
EXPOSE 10000

CMD ["node", "dist/main"]
