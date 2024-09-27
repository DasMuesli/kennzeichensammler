FROM node:20.12.0 as build

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY angular.json karma.conf.js tsconfig*.json ./
COPY src ./src
COPY public ./public

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/kennzeichensammler/browser /usr/share/nginx/html/
COPY nginx/default /etc/nginx/sites-available/

EXPOSE 80