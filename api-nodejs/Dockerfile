###
# Build image
###
FROM node:13-alpine AS build

# Create app directory
WORKDIR /usr/local/src

# Bundle app and install dependencies
COPY . .
RUN yarn && yarn build

###
# Final image
###
FROM node:13-alpine

ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/local/src

# Bundle app and install dependencies
COPY package*.json .
COPY yarn.lock .
COPY --from=build /usr/local/src/dist dist
RUN yarn

EXPOSE 80

CMD [ "npm", "start" ]
