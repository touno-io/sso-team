FROM nginx:latest

ARG VERSION=0.0.0

COPY ./nginx.conf /etc/nginx/
COPY ./dist /var/www

RUN echo $VERSION > /var/www/VERSION