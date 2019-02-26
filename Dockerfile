FROM node:10.14.2

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Bundle app source
COPY . /src/app

EXPOSE 3000

# defined in package.json
CMD [ "yarn", "run", "prod" ]