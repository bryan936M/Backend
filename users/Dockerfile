FROM node:18-alpine

WORKDIR /app/users

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "start"]