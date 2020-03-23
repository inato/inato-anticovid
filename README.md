# Overview

This project contains 2 main parts:

- a cloud function that pulls data from a PG database to insert it into an Algolia index
- a web application that queries this Algolia index

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

# Data Schema used by the front-end

Those data point are used for each trial for now, as is.
Please warn the app-team before changing the type of any of those data point.

```javascript
{
  public_title: string;
  intervention: string;
  web_address: string;
  recruitment_status: string;
  therapeutic_classes: Array<string>;
  date_registration3: string;
}
```

All the data used in the Algolia Search is [here](https://www.algolia.com/apps/QC98I887KP/explorer/configuration/prod_data/searchable-attributes)
