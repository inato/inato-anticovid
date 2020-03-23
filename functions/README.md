# Run locally

You will need to use node 10 (use nvm)


Make sure you have `firebase` installed and configured:
```
$> brew install firebase
$> firebase login
$> firebase use staging # to run staging cloud functions
$> firebase use production # to run production cloud functions
```

Then, you must set the environment variables in a `.runtimeconfig.json` file:

```sh
{
  "algolia": {
    "apikey": "6938d009a19fe72f19e9aa01a35dea3f",
    "tablename": "who_trial_staging",
    "index": "dev_data"
  }
}
```

Then you can run

```
yarn shell
```
