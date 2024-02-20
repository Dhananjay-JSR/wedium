FROM node:18-alpine3.18

ARG PORT

ENV PORT=${PORT}

EXPOSE ${PORT}


WORKDIR /app

COPY . .

RUN yarn

RUN yarn workspace client build

RUN yarn workspace server build

ENTRYPOINT [ "yarn","serve" ]
