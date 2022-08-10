FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN npm i
RUN npm build

ENV HOST 0.0.0.0
EXPOSE 8080

CMD [ "npm", "start" ]
