# syntax=docker/dockerfile:1

FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .env ./


EXPOSE 5200


ENTRYPOINT [ "node", "app.js" ]
