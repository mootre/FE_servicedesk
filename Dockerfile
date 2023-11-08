FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run builder

COPY .next ./.next

CMD ["npm","run","dev"]