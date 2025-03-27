FROM node AS build
WORKDIR /app

COPY server-epic1/package.json server-epic1/package-lock.json ./

RUN npm install --only=production

COPY /server-epic1/ ./

EXPOSE 5000


CMD ["node", "index.js"]

