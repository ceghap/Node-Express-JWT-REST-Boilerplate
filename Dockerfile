FROM node:12.18.0-slim

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

CMD ["npm", "run", "start:dev"]