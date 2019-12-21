FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN chown -R node:node /usr/local/lib/node_modules /usr/local/bin/

WORKDIR /home/node/app

COPY app.js ./

USER node

RUN npm install -g newman

RUN newman run "https://www.getpostman.com/collections/8a0c9bc08f062d12dcda"

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]