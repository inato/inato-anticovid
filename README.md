# Overview

This project contains 2 main parts:
- a cloud function that pulls data from a PG database to insert it into an Algolia index
- a web application that queries this Algolia index


# Development

## Local app

Make sure `serve` is globally set:
```
$> yarn global add serve
```

To build and run on localhost:5000
```
$> yarn start
```

To configure the indices your local app connects to, modify `src/config/config.json`

# Deployment

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
