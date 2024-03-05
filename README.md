# i18n-editor

This application will provide an easy way to edit internationalization files for a translated web applications.

## Idea

The idea for this project came up during development of my master thesis. The developed React app there had to be translated to German and English. Online I didn't find a good tool to do that job for free, without to much overhead. Originally I planned to implement this application in React and Electron. In a full version this application should then automatically update localization files in other web projects, so that the developer has an easy way to edit those files.

This implementation here is a very stripped down, first proof of concept, of the core idea, as it is used for the for a Svelte course in uni. It is not integrated in a local fat client and therefore does not include the main functionality. It only represents the visual idea, usability concepts, aswell as some translations features for testing.

## Setup

First installation of dependencies

```
pnpm install
```

Setup of environment variables (create a `.env` and fill in with data from `.env.example`)

```
POSTGRES_URL="postgres://default:localhost:5432/db"
POSTGRES_PRISMA_URL="postgres://default:localhost:5432/db"
POSTGRES_URL_NO_SSL="postgres://default:localhost:5432/db"
POSTGRES_URL_NON_POOLING="postgres://default:localhost:5432/db"
POSTGRES_USER="default"
POSTGRES_HOST="localhost"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="db"
JWT_PRIVATE_KEY="jwt_private_key"
```

Synchronize your new database with the existing prisma schema

```
npx prisma migrate dev
```

Startup of the development server

```
pnpm dev
```
