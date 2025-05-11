# Use the official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the app and metrics ports
EXPOSE 5000 9464

# Use environment variables from .env if provided
ENV NODE_ENV=production

# Start the app
CMD ["node", "index.js"]

