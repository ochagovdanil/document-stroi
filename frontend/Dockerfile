FROM node:22-alpine3.19 as build

# dependency installation
COPY package*.json .

RUN npm i 

# building production folder
COPY . . 

RUN npm run build

# running production via Nginx
FROM nginx:1.27.0-alpine as prod 

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build /nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
