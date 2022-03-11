This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### NB! It is now *required* to fill out the NEXTAUTH_SECRET variable for anything to work.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## How To Set Up The Environment

### Set Up Database

* Install MySQL 8.0
* Go make a copy of .env.example, paste it as .env and fill it with your credentials
* Run migrations with commands:

```bash
npx prisma migrate deploy
npx prisma migrate dev
```

* Create new user by seeding:

```bash
npx prisma db seed
```

We use prisma.io as ORM, read more at https://www.prisma.io/docs/concepts

* To see the table in Prisma Studio, run:

```bash
npx prisma studio
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
