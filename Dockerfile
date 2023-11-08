FROM node:18-alpine as base 
WORKDIR /app
COPY package*.json tailwind.config.ts tsconfig.json  ./ 
EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run builder

FROM base as production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

CMD npm start

FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev