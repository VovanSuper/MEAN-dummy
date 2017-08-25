FROM node:8-alpine
ENV NODE_ENV production
RUN apk --no-cache add ca-certificates
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install --global bunyan 
COPY ./wwwroot/ .
EXPOSE 80 443
CMD ["node", "./wwwroot"]