# Stage 1: Build react app by ViteJS
FROM node:18.15.0-alpine as build

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Run web by Nginx
FROM nginx:1.23.3

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /home/app/build /usr/share/nginx/html

EXPOSE 80
