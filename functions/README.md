# Run locally


## Installation
You will need to use node 10 (use nvm)


Make sure you have `firebase` installed and configured:
```
$> brew install firebase
$> firebase login
```

## Usage

Configure firebase to use the project you want to use:

```
$> firebase use staging # to run staging cloud functions
$> firebase use production # to run production cloud functions
```

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
