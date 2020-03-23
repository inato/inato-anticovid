# Run locally

You will need to use node 10 (use nvm)

Then, you must set the environment variables in a `.runtimeconfig.json` file:

```sh
{
  "algolia": {
    "apikey": "***REMOVED***",
    "tablename": "who_trial_staging",
    "index": "dev_data"
  }
}
```

Then you can run

```
yarn shell
```