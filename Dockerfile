FROM node:18.16.0-alpine3.17 as dev
WORKDIR /app
RUN apk update && apk add bash 
COPY . .
RUN npm install


# 本番環境
# docker build -t chatbot-repo-client --platform linux/amd64 .
FROM node:18.16.0-alpine3.17 as build
WORKDIR /app
RUN apk add --no-cache bash 
COPY . .
RUN npm install 
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache bash
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

