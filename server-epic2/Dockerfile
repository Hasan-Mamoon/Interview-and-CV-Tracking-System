FROM node AS build
WORKDIR /app

COPY server-epic2/package.json server-epic2/package-lock.json ./

RUN npm install --only=production

COPY /server-epic2/ ./

EXPOSE 5001


CMD ["node", "index.js"]

