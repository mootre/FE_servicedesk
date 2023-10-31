FROM node:18

WORKDIR /app
COPY package*.json tailwind.config.ts tsconfig.json  ./ 
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev