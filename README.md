# dockerized-pern

A PERN stack application running on docker.

## How To Use

You need to follow these steps

### Environment

You need to create an `.env` file in the `/server/` directory. It will look something like this :

```
JWT_SECRET=
PORT=
DB_HOST=
DB_USER=
DB_PASS=
DB_PORT=
DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

### Dependancies

You will need to install:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.JS / NPM](https://nodejs.org/en/download/)

### Controls

Starts Docker containers and networks (will build first if no build exists):

```
docker-compose up
```

Stops Docker containers and networks:

```
docker-compose down
```

## Technologies Used

- Docker
- PostgreSQL
- Express JS
- React
- Node JS