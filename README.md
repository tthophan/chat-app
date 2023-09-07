## Structures

```
└─── server
    └─── server.js
└─── src
    └─── common
    └─── components
    └─── hooks
    └─── interfaces
    └─── layouts
    └─── pages
    └─── redux
    └─── services
```

## Start application

### Installation & Requirements

#### Software installed on your system:

- `node` (v18.17.x or higher).
- `npm` (v9.6.x or higher).

### Local Setup

#### 1. Frontend

`WORKDIR: ./`

**Setup Environment**

- Create the file `.env` from `.example`
- Update the configuration properties depending on your project.

**Install Dependencies Modules.**

```bash
$ npm install
```

**Start Application**

```bash
$ npm run start
```

#### 2. Backend

`WORKDIR: ./server`

**Setup Environment**

- Create the file `.env` from `.example`
- Update the configuration properties depending on your project.

**Install Dependencies Modules.**

```bash
$ npm install
```

**Start Application**

```bash
$ npm run start
```

### Deploy Docker

#### Configuration template files

- `./server/Dockerfile`
- `./Dockerfile`
- `./compose.yaml`

#### Docker Compose
```bash
docker compose up
```
