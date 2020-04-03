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

Install the dependencies:

```sh
yarn install
```

Even though we're running the function locally, firebase requires you to choose an environment. It doesn't really matter which though because it will use a local configuration file.

```sh
firebase use staging
# or
firebase use production
```

The local configuration is stored in `.runtimeconfig.json`

### Usage

#### Prerequisite: have a JDK installed
```sh
brew install homebrew/cask/java
```

Run:

```sh
yarn serve
```

It will build then emulate all Firebase services we use (functions, hosting, firestore) locally.
It doesn't watch your changes so you need to restart it every time you make a change.

## Add a new environment variable

First choose the environment you want to add the variable to:

```sh
firebase use production
```

Then you can set it:

```sh
firebase functions:config:set algolia.index=prod_data
```
