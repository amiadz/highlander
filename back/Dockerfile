FROM node:16.19.0-bullseye-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY ./dist .

CMD [ "node", "index.js" ]