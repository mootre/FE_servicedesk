FROM node:18

WORKDIR /app
COPY package*.json  tsconfig.json tailwind.config.ts ./ 
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev