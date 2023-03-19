FROM node:18.15.0-alpine as build

WORKDIR /home/app

ARG NODE_ENV=production
ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN if ["${NODE_ENV}" = "production"];\
  then yarn install --prod;\
  else yarn install --production=false;\
  fi

COPY . .

CMD if [[ "$NODE_ENV" = "production" ]]; then\
      yarn start;\
    else\
      yarn dev;\
  fi