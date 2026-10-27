# Docker Node.js User Profile App

A Node.js user-profile app with MongoDB and Mongo Express, run with Docker Compose.
One command starts the whole stack, and the data stays after restarts.

## What's inside

| Service | Description | Port |
|---|---|---|
| `app` | Node.js user-profile app, built from the `Dockerfile` | 3000 |
| `mongodb` | MongoDB database, data stored in a named volume | 27017 |
| `mongo-express` | Web interface for viewing the database | 8081 |

## Features

- Starts with a single command: `docker compose up -d`
- Data is kept in a named volume (`mongo-data`), so it survives restarts
- MongoDB healthcheck: the app and Mongo Express start only when the database is ready
- Containers restart automatically (`restart: unless-stopped`)
- Mongo Express for inspecting the data in a browser

## Requirements

- Docker Desktop (Windows with WSL2, macOS) or Docker Engine with the Compose plugin (Linux)

## Quick start

```bash
git clone https://github.com/ToleeraaImmiruu/docker-nodejs-project.git
cd docker-nodejs-project
docker compose up -d --build
```

Then open:

- App: http://localhost:3000
- Mongo Express: http://localhost:8081

## Test that data persists

1. Add a user profile in the app **[CHECK: describe how, e.g. "fill in the form and save"]**.
2. Restart the containers:
   ```bash
   docker compose down
   docker compose up -d
   ```
3. Open the app again. The data is still there, because it is stored in the `mongo-data` volume.

## Reset everything (deletes all data)

```bash
docker compose down -v
```

Then run `docker compose up -d --build` to start from a clean database.

## Useful commands

```bash
docker compose ps            # show running services
docker compose logs -f app   # follow the app logs
docker compose down          # stop the containers (keeps data)
```

## Configuration

| Variable | Used by | Purpose |
|---|---|---|
| `MONGO_INITDB_ROOT_USERNAME` | mongodb | Database admin user |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | Database admin password |
| `MONGO_URL` | app | Connection string to MongoDB |

> The credentials in this repo are for local development only. For real use, move them to an `.env` file and do not commit it.

## Project structure

```
├── Dockerfile           # builds the Node.js app image
├── docker-compose.yml   # app + MongoDB + Mongo Express
├── server.js            # Node.js server
├── index.html           # frontend page
└── package.json         # dependencies and scripts
```

## Tech stack

Node.js, MongoDB, Mongo Express, Docker, Docker Compose

## Author

Tolera Imiru. [Portfolio](https://my-portfolio-25b2.onrender.com/) | [GitHub](https://github.com/ToleeraaImmiruu)
