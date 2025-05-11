# FROM node:20 AS build
# WORKDIR /app

# COPY client/package.json ./
# RUN npm install

# # Copy source files and build
# COPY client/ .
# RUN npm run build

# # Serve using Nginx
# FROM nginx:latest

# # Copy built files
# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build React app
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy the rest of the code and build
COPY client/ .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy React build to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config (optional but recommended)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
