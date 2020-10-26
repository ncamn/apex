# Apex NodeJS API

## Local setup

Copy the `.env.example` file to a new `.env` file at the project's root.

Bootstrap local database instances with `docker-compose up -d`.

When you're finished you can tear it down with `docker-compose down` to free resources on your computer.

## NPM scripts

### build

Build the repo's TypeScript sources.

### coverage

TODO

### lint

Lint the repo's sources and try to fix errors when possible using `eslint`.

### prettify

Reformat the repo's sources using `prettier`.

### seed

TODO

### start

Start the API.

### test

Run integration tests using `mocha`.
