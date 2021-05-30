FROM node:14 AS client-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=client-build /usr/src/app/client/build ./client/build
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server/server.js ./server/

EXPOSE 4000

CMD ["node", "./server/server.js"]