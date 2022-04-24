### ![Logly.world](https://github.com/remainstheday/logly/blob/master/Logo.png?raw=true)

Logly is a digital space for museums & their communities to connect, share, and create. This project is primarily built on Keystone.js and Next.js with the backend using Postgres + GraphQL.

## Requirements
This codebase requires the following items before you can run the project locally:
- **A self hosted PostgresQL database**. It can be local or in the cloud.
- **Cloudinary API token**. We use this for hosting any uploaded assets.
- **environment variables**. See below

In order to run this project locally you will need a `.env` file in the root directory `/` AND a `.env.local` file inside `frontend/` with the following items:

`.env`:
```dotenv
SESSION_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
KEYSTONE_CLOUD_API=
DATABASE_PROVIDER=postgresql
DATABASE_URL=
```
`.env.local`:
```dotenv
API_URL='http://localhost:3000/api/graphql'
```

## Getting Started
>✅ Make sure you have the correct environment variables

With our environment variables in place we can start the project using the following commands:

```Bash
yarn dev # starts Keystone in development mode on localhost:3000
```
That will run Keystone but we also need to boot up the Next.js app:

```Bash
cd frontend/
yarn dev
```

## Vercel & Railway hosting
Since the Keystone code runs on a Node.js server we use Railway for hosting the admin CMS and Database. All images and assets are hosted in Cloudinary with the static front-end pages hosted on Vercel.

## Cloudinary API
Cloudinary is used to host all uploaded assets.

## Monorepo
Logly's entire codebase is built using a monorepo which allows for sharing dependencies and configurations.

## Next.js
Next.js is an ideal React.js micro-framework for rendering SEO friendly static webpages.

## Keystone.js
For Logly's admin UI we are using a javascript based CMS called Keystone. Keystone CMS has extensive documentation and a very active community for finding support.