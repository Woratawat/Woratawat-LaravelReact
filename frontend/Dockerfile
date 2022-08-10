# Base Image
FROM node:alpine as builder

# Working Directory (WORKDIR)
WORKDIR /usr/app

COPY ./package.json .

RUN npm install

COPY . .

# RUN npm run build

CMD ["npm", "start"]

# Base Image
# FROM nginx
# EXPOSE 80
# COPY --from=builder /usr/app/build /usr/share/nginx/html