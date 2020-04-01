# Functions

## Run locally

### Installation

You will need to use node 10 (use nvm)

Make sure you have `firebase` installed and configured:

```sh
brew install firebase-cli
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
yarn emulators:start
```

It will emulate all Firebase services we use (functions, hosting, firestore) locally.

## Add a new environment variable

First choose the environment you want to add the variable to:

```sh
firebase use production
```

Then you can set it:

```sh
firebase functions:config:set algolia.index=prod_data
```
