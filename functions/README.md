# Functions

## Run locally

### Installation

You will need to use node 10 (use nvm)

Make sure you have `firebase` installed and configured:

```sh
# for Mac
brew install firebase-cli
# for linux
curl -sL https://firebase.tools | bash
# then for both
firebase login
```

Even though we're running the function locally, firebase requires you to choose an environment. It doesn't really matter which though because it will use a local configuration file.

```sh
firebase use staging
# or
firebase use production
```

The local configuration is stored in `.runtimeconfig.json`

### Usage

Run:

```sh
yarn shell
```

It will open a firebase shell in which you can type `refreshAlgoliaTrialIndex()` to run the function.

## Add a new environment variable

First choose the environment you want to add the variable to:

```sh
firebase use production
```

Then you can set it:

```sh
firebase functions:config:set algolia.index=prod_data
```
