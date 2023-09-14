# Stage 1: Build the Angular app
FROM node:alpine as build
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --prefer-offline --no-audit


COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine-slim
COPY --from=build /app/dist/app /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
