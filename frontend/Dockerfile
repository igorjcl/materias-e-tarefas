FROM node:alpine as node_build
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=node_build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
