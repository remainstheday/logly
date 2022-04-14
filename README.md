### ![Logly.world](https://github.com/remainstheday/logly/blob/master/Logo.png?raw=true)

Logly is a digital space for museums & their communities to connect, share, and create. This project is primarily built on Keystone.js and Next.js with the backend using Postgres + GraphQL.

## Getting Started

```
git clone https://github.com/remainstheday/logly.git
cd logly/ && yarn
cd logly/frontend && yarn
```
This will install the required npm packages but you will notice an error because we haven't defined our environment variables. 

Let's go ahead and create those. You can read more about environment variables here https://nextjs.org/docs/basic-features/environment-variables but the steps are as follows:
Inside `logly/frontend/` create a file called `.env.local` with the following contents
```
API_URL='http://localhost:3000/api/graphql'
```
Then inside the root directory `logly/` create a file called `.env` with the following contents:
```
SESSION_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
KEYSTONE_CLOUD_API=
DATABASE_PROVIDER=postgresql
DATABASE_URL=
```
Finally to run the entire project you will need to first start the Keystone server with `yarn dev` on localhost:3000, then you can simultaniusly run the Next frontend code with `yarn dev` on localhost:3001.

## Hosting
Since the Keystone code runs on a Node.js server we use Railway for hosting the admin CMS and Database. All images and assets are hosted in Cloudinary with the static front-end pages hosted on Vercel.
