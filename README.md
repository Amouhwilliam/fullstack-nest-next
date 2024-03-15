# File system written in Next.js Nest.js and Postgres SQL

This project is fullstack a node.js and react.js project build with [Nest.js](https://nestjs.com/), [Next.js](https://nextjs.org/)
[PostgreSql](https://www.postgres.com/), [Docker](https://www.docker.com/) and [Redis](https://redis.io/)

## Installation and starting api the server

```bash
$ cd api
```

```bash
$ cp .env.dev .env
```

```bash
$ docker-compose up
```
After setting up your environment, make sure to create a postgres server in pgAdmin and run the migration command to have your
database ready for the project. Please all the instructions are down below.

## Stopping the server

```bash
$ docker-compose down
```

## Specific running of the app

### Connect to the api container

```bash
$ docker exec -it api-container /bin/bash
```

### Run Prisma migration on the api

```bash
$ npx prisma migrate dev --name init
```
#### if you encounter cannot connect to postgres:5432 error, in the .env file change the host (postgres) with localhost and rerun the migration command

```bash
$ DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgresdb?schema=public
```
#### after the migration don't forget to set the host to postgres

```bash
$ DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgresdb?schema=public
```

## Installation and building the sdk

```bash
$ cd sdk
```

```bash
$ yarn install
```

```bash
$ yarn build
```

#### To run the on the sdk 

```bash
$ yarn test
```

## Installation and starting the frontend

```bash
$ yarn install
```

```bash
$ yarn dev
```

#### Have fun :)