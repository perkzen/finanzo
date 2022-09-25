# Finanzo - A financial management tool

<img src="pictures/Screenshot 2022-06-12 at 22.30.22 (2).png" alt="logo"/>

# Why Finanzo?
Just as a company needs to take care of their finances, so each individual must take responsibility for their finances
if they want to make some progress in the financial field.

# Features
- Create expense item
- Create income item
- Delete expense item
- Delete income item
- List all expenses and incomes for a specific month
- List all expenses and incomes for a specific year
- Expense analysis graph for year
- Income analysis graph for year

[//]: # (<img src="pictures/Screenshot 2022-06-12 at 22.54.16 &#40;2&#41;.png" />)

[//]: # (<img src="pictures/Screenshot 2022-06-12 at 22.54.43 &#40;2&#41;.png"/>)

[//]: # ()

[//]: # ()

# Tech stack:

T3 stack - https://init.tips/other

### Frontend:

- TailwindCSS
- Next.js
- tRPC
- react hook form
- Chart.js
- Zod
- react-hot-toast

### Backend:

- NextAuth
- tRPC
- Prisma
- PlanetScale MySQL Database

# Env exmaple

```dotenv
DATABASE_URL="mysql://127.0.0.1:3306/finanzo"
NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-sceret
```

# Getting started

### Start Next project

```bash
$ npm install
$ npm run dev
```

### Start Prisma

```bash
$ npx prisma db pull
$ npx prisma generate
```

To push prisma schema to database run :

```bash
$ npx prisma db push
```

To view database tables run :

```bash
$ npx prisma studio
```

### Start database

If you are on a Mac you need to install the CLI first :

```bash
$ brew install planetscale/tap/pscale
```

You need privileges from admin to connect to the database :
```bash
$ pscale connect finanzo
```

# Todo

- [ ] add translations
- [ ] add tests
- [ ] add auth middleware
- [ ] add mobile responsiveness
- [ ] fix login when revisiting site (if already logged in redirect to dashboard)
