FROM node:20-alpine AS installer

RUN mkdir -p /app
WORKDIR /app/polindo-fe

RUN apk update && apk upgrade
RUN apk add git

COPY . /app
RUN cd /app/polindo-fe && npm install

FROM installer AS builder
WORKDIR /app/polindo-fe
COPY . /app/polindo-fe/
RUN cd /app/polindo-fe && npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
