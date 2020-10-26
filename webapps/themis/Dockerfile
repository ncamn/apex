FROM node:latest

# Bundle app and install dependencies
COPY ./build /srv/apex-dashboard/

WORKDIR /srv/apex-dashboard

# Install serving tool
RUN npm i -g serve

EXPOSE 8080

CMD [ "serve", "-p", "8080", "." ]
