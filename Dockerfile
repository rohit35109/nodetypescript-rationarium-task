FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "mysql:3306", "--", "sh", "-c", "npm test && npm run start"]

EXPOSE 3000