# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/avorakh/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

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
### Home Library network

1. **Create a custom network:**
Create a custom network for the application
   ```bash
   docker network create home-library-network
   ```

### Home Library PostgreSQL

1. **Build the Docker image:**

Build the image from the specific path of the project

   ```bash
   docker build -t home-library-postgres:1.0  -f ./docker/postgres/Dockerfile .
   ```

2. **Run the Docker container:**
Run the docker container in the custom network
   ```bash
   docker run --name home-library-db --network home-library-network --env-file .env -p 5432:5432 -d home-library-postgres:1.0
   ```

### Home Library Service (Application)

1. **Build the Docker image:**

Build the image from the specific path of the project

   ```bash
   docker build -t home-library-svc:1.0  -f ./docker/app/Dockerfile .
   ```

2. **Run the Docker container:**
Run the docker container in the custom network
   ```bash
   docker run --name home-library-app --network pg-network --env-file .env -p 4000:4000 -d home-library-svc:1.0
   ```