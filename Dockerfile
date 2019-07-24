FROM node:10
WORKDIR /app
COPY . /app
RUN npm i
RUN npm i pm2 -g
CMD ["pm2-runtime", "config.yml"]
EXPOSE 3003:3003