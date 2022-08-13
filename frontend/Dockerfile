# Base Image
FROM node:alpine as builder

# Working Directory (WORKDIR)
WORKDIR /usr/app

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 3000
