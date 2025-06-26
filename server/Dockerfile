FROM node:18-bullseye-slim
WORKDIR /app

# 1) Install everything, including devDeps (ts-node, typescript)
COPY package.json package-lock.json ./
RUN npm install

# 2) Copy your code & Prisma schema
COPY . .

# 3) Generate Prisma client
RUN npx prisma generate

# 4) Expose your port
EXPOSE 4000

# 5) On container start: migrate → seed → run TS
CMD ["sh","-c","npx prisma migrate deploy && npx ts-node prisma/seed.ts && npx ts-node src/index.ts"]
