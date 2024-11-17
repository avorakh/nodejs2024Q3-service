# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- PostgreSQL - [Link](https://www.postgresql.org/)
- Docker - [Docker Docs](https://docs.docker.com/).
- Docker Compose: Included with Docker Desktop or can be installed separately.

## Downloading

```
git clone https://github.com/avorakh/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

## Application configuration
Please see the application variables:

| Name           | Presence   | Notes                                                                 |
|----------------|------------|-----------------------------------------------------------------------|
| PORT           | Optional   | 4000 as default                                                       |
| DB_HOST        | Mandatory  | Database host                                                         |
| DB_PORT        | Mandatory  | Database port                                                         |
| DB_USERNAME    | Mandatory  | Database username                                                     |
| DB_PASSWORD    | Mandatory  | Database password                                                     |
| DB_NAME        | Mandatory  | Database name                                                         |
| DB_SYNCHRONIZE | Optional   | If set to 'true', automatically synchronizes the database schema with the current state of the entities. Disabled by default |

> Please configure the `.evv` file to run locally without containerization.
> the `dc-config.env` file to run locally with containerization (Docker-Compose). The DB configuration should be same for the application container and the DB container

## Running application (Simple)
> Need to install and configure PostgreSQL

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
The port value is stored in .env file:
```bash
PORT=<PUT_PORT_VALUE>
```

For more information about OpenAPI/Swagger please visit https://swagger.io/.
Please update

## Running application (Docker-Compose)
> Please find more details in the **Home Library Service - Docker Compose** section
```
npm run docker:compose:build
npm run docker:compose:up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization
> This component will be fixed in Part 3

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


## Containerization, Docker

### Home Library Service (DB- PostgreSQL)

 The `postgres:17-alpine` image is used. -  [Link](https://hub.docker.com/_/postgres)

 Please see the application variables:

| Name              | Presence   | Notes              |
|-------------------|------------|---------------------|
| POSTGRES_PORT     | Mandatory  | Database port       |
| POSTGRES_USER     | Mandatory  | Database username   |
| POSTGRES_PASSWORD | Mandatory  | Database password   |
| POSTGRES_NAME     | Mandatory  | Database name       |


### Home Library Service (Application)

1. **Build the Docker development image:**

Build the image from the specific path of the project

   ```bash
   npm run docker:build:dev
   ```

2. **Build the Docker production image:**

Build the production image

   ```bash
   npm run docker:build:prod
   ```

### Home Library Service - Docker Compose

> the `dc-config.env` file is used to run the application with Docker Compose.

1. **Building the Application**

The docker-compose build command is used to build or rebuild the services defined in the `docker-compose.yml` file.

   ```bash
   npm run docker:compose:build
   ```

2. **Starting the Application**

The command creates and starts the containers defined in your docker-compose.yml file.
> Run the services in the background (detached mode)
   ```bash
   npm run docker:compose:up
   ```
Run the services in the background (detached mode)
   ```bash
   npm run docker:compose:up-background
   ```

3. **Stopping the Application**

To stop the running services, use:
   ```bash
   npm run docker:compose:down
   ```

### Vulnerabilities scanning
1. **Vulnerabilities scanning for the Docker development image**
The the Docker development image should be built before scanning.

Please run:
   ```bash
   npm run scan:vulnerabilities:dev
   ```

2. **Vulnerabilities scanning for the Docker production image**
The the Docker production image should be built before scanning.

Please run:
   ```bash
   npm run scan:vulnerabilities:prod
   ```