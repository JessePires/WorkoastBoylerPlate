FROM node:22.11.0-alpine  

WORKDIR /WORKOAST_FRONT_BOYLERPLATE

ENV VITE_WEBSERVICE_ROUTE=https://webservice.usaworkoast.com
ENV VITE_WEBSOCKET_VOICE_API_ROUTE=wss://workoast-voice-api.usaworkoast.com/ws

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 3002

CMD ["yarn", "dev"]
