FROM node:25-alpine

WORKDIR /home/node/app

ADD . .

RUN chown -R 1000:1000 ./*

USER 1000

RUN npm i && \
    npm cache clean --force && \
    chown -R 1000:1000 ./*

EXPOSE 3000

CMD ["npm", "run", "dev"]
