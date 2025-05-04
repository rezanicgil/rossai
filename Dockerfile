FROM node:20.11.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20.11.0

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

COPY .env .env

EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist/main"]
