# build environment
FROM node:12.4.0-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

# production environment
FROM node:12.4.0-alpine
WORKDIR /app
COPY --from=build /app/dist dist
COPY --from=build app/package.json .
RUN npm install -g prpl-server
EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
# start app
CMD [ "npm", "run", "serve:docker" ]
# RUN npm run serve