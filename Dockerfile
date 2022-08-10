FROM node:lts-apline

WORKDIR /app
COPY . .

RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 8080

CMD [ "yarn", "start" ]
