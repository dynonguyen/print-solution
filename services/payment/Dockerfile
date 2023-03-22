FROM node:18.15.0

WORKDIR /home/app

ARG NODE_ENV=production
ENV NODE_ENV=production

COPY package.json ./

RUN if ["${NODE_ENV}" = "production"];\
  then yarn install --prod;\
  fi

COPY . .

# Sleep to wait postgres
CMD sh -c "if [ '$NODE_ENV' = 'production' ]; then sleep 3 && yarn start; else sleep 3 && yarn install && yarn dev; fi"