# Overview

This project contains 2 main parts:

- Lambda Functions (back end)
- a web application that queries the Algolia index and calls the lambda functions (front end)

All decisions related to this project are located in the [ADR folder](https://github.com/inato/inato-anticovid/tree/staging/adr).

## Components

A complete stack of AntiCovid is composed of the following:

- A PostgreSQL database, which contains views of data to expose;
- Firebase Functions, that are used to push data from the PostgreSQL database to the Algolia index, or register a new subscription, or send an email when new trials match a subscription.
- An [Algolia](https://www.algolia.com/) index, which is used as database and search engine for the application;
- A Firestore database that is used to store search suggestions and subscriptions.
- Google Cloud Pub/sub, used by functions to communicated with each other.
- A React front-end application, visitor facing, deployed on Firebase Hosting.

If you're not part of Inato, you'll need an Algolia account and a Postgres database with a table filled with required data to be able to fully run all the components of this project.

## Development

### Local app

To build and run on localhost:3000

```sh
yarn start
```

To configure the indices your local app connects to, modify `src/config/config.json`

### Testing

To run integration tests use

```sh
yarn test
```

from the root folder for the app tests, and from the `functions/` folder for the functions tests.

We use Cypress to run e2e tests. Locally, you can open a cypress window and select the tests to run:

```sh
yarn e2e:dev
```

To run all e2e tests (CI for ex):

```sh
yarn e2e
```

## Deployment

Everything is deployed to Firebase.

There are two long-lived branches:

- staging, that is automatically deployed to https://anticovid.staging.inato.com/
- master, that is automatically deployed to https://anticovid.inato.com/

To make a contribution:

- open a pull request against the staging branch
- merge it into staging
- check that it works correctly on https://anticovid.staging.inato.com/
- merge it into master
- check that it works correctly on https://anticovid.inato.com/
