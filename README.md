# Shopply - Shop your suppliers | SaaS Boilerplate

An open-source ordering platform designed to benefit both the wholesale supplier and the venues they serve. The ultimate fullstack boilerplate which gives you maximum flexibility and speed. 

Try it out at [shopply.qdzungpham.com](https://shopply.qdzungpham.com/)

## Stack

- ▲ [Next.js](https://nextjs.org/) for webapp
- 🖼 [Chakra UI](https://chakra-ui.com/) for UI components
- 🖧 [Express.js](https://expressjs.com/), a back end web application framework for building RESTful APIs with Node.js
- 📦 [MongoDB](https://www.mongodb.com/) for database
- ⚙️ [TypeScript](https://www.typescriptlang.org/) for static type checking

## Getting Started

### Running `api` locally:

Navigate to the `api` folder:

```bash
cd api
```

Create .env with the the environmental variables as shown below:

```
MONGO_URL_TEST=
MONGO_URL=
SESSION_NAME=
SESSION_SECRET=
COOKIE_DOMAIN=

URL_APP="http://localhost:3000"
URL_API="http://localhost:8000"
PRODUCTION_URL_APP=
PRODUCTION_URL_API=
```

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

### Running `web` locally:

Navigate to the `web` folder:

```bash
cd web
```

Create .env with the the environmental variables as shown below:

```
NEXT_PUBLIC_URL_APP="http://localhost:3000"
NEXT_PUBLIC_URL_API="http://localhost:8000"
NEXT_PUBLIC_PRODUCTION_URL_APP=
NEXT_PUBLIC_PRODUCTION_URL_API=

NEXT_PUBLIC_API_GATEWAY_ENDPOINT=
NEXT_PUBLIC_GA_MEASUREMENT_ID=

```

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.