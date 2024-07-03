FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

# Start the app using serve command

CMD [ "npm", "start" ]