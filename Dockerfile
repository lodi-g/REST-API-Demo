FROM node:8.4.0-alpine 

# set up environment
ENV NODE_ENV=production
WORKDIR /opt/app

# install node modules
COPY package.json package-lock.json ./
RUN npm install

# set up application
COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]