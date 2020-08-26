FROM node:12.18.0-slim

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]