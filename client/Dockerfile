FROM node:20 AS build
WORKDIR /app

COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy source files and build
COPY client/ .
RUN npm run build

# Serve using Nginx
FROM nginx:latest

# Copy built files
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
