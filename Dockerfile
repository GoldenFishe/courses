FROM node:18

WORKDIR usr/app
COPY . .
RUN cd ./client && npm install
RUN cd ./client && npm run build

RUN npm install
RUN npm run build

CMD ./start.sh