FROM node:20.11.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.11.0

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 4000

ENV PORT=4000

CMD ["npm", "run", "start:prod"]