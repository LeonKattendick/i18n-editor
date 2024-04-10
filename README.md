# i18n-editor

This application provides a dummy PoC for an easy way to edit internationalization files for a translated web application.

#### Screenshot

<img src="https://i.imgur.com/PdIr2Jc.png" alt=""/>

## Idea

The idea for this project came up during development of my master thesis. The developed React app there had to be translated to German and English. Online I didn't find a good tool to do that job for free, without to much overhead. Originally I planned to implement this application in React and Electron. In a full version this application should then automatically update localization files in other web projects, so that the developer has an easy way to edit those files.

This implementation here is a very stripped down, first proof of concept of the core idea, as it is used for the for a Svelte course in uni. It is not integrated in a local fat client and therefore does not include the main functionality of updating localization files. It only represents the visual idea, usability concepts, aswell as some translations features + download for testing.

## Requirements for the uni course

### Client-side state management using `$state`

Used in different places to store dynamic data

### Dynamic page data using `load` and an external API

DeepL API is used to fetch translation data in one of the API's used, while translating. However this is not done in a `load` function, but in a `fetch` call. The editor `load` will fetch data, not from an external API, but from the database, to then present it asynchronously to the user.

### Custom styling

TailwindCSS was used to create a custom look. A dark and light mode were added to enhance the feeling of the webpage. It was checked that the styling matches between the pages and elements.

### At least two pages with a link between

The four pages _/register_, _/login_, _/projects_ and _/editor_ are linked.

### Login with Username/Password

A fully working register and login system is provided. This included storing the username + the hashed password in a database and authenticating the user via a JWT token after login.

### Hosting on Vercel

The app is hosted on vercel and the deployment can be found [here](https://i18n-editor.vercel.app/login).

## Setup

First installation of dependencies

```
pnpm install
```

Setup of environment variables (create a `.env` and fill in with data from `.env.example`)
For the possibility to translate over DeepL, please also add an API key.

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
DEEPL_API_KEY="deepl_api_key"
```

Synchronize your new database with the existing prisma schema

```
npx prisma migrate dev
```

Startup of the development server

```
pnpm dev
```
