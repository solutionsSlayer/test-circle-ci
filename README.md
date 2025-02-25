# Next.js + Jest

This example shows how to configure Jest to work with Next.js.

This includes Next.js' built-in support for Global CSS, CSS Modules and TypeScript. This example also shows how to use Jest with the App Router and React Server Components.

> **Note:** Since tests can be co-located alongside other files inside the App Router, we have placed those tests in `app/` to demonstrate this behavior (which is different than `pages/`). You can still place all tests in `__tests__` if you prefer.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-jest&project-name=with-jest&repository-name=with-jest)

## How to Use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-jest with-jest-app
```

```bash
yarn create next-app --example with-jest with-jest-app
```

```bash
pnpm create next-app --example with-jest with-jest-app
```

## Running Tests

```bash
npm test
```

```bash
yarn test
```

```bash
pnpm test
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

# Projet Calculator avec CI/CD

## Pipeline CI/CD

Notre pipeline inclut :
- Build automatique
- Tests unitaires
- Vérification de la qualité du code
- Déploiement automatique sur la branche main

## Badges
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/{username}/{repo}/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/{username}/{repo}/tree/main)
[![Coverage](https://codecov.io/gh/{username}/{repo}/branch/main/graph/badge.svg)](https://codecov.io/gh/{username}/{repo})

## Scripts Disponibles
- `npm run test` - Lance les tests en mode watch
- `npm run test:ci` - Lance les tests pour CI
- `npm run build` - Build le projet
- `npm run lint` - Vérifie la qualité du code
- `npm run format` - Formate le code
