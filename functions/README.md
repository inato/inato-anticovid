# Functions

## Run locally

### Installation

You will need to use node 10 (use nvm)

Make sure you have `firebase` installed and configured:

```
$> brew install firebase-cli
$> firebase login
```

Even though we're running the function locally, firebase requires you to choose an environment. It doesn't really matter which though because it will use a local configuration file.

```
$> firebase use staging
# or
$> firebase use default # production
```

The local configuration is stored in `.runtimeconfig.json`

### Usage

Run:

```
$> yarn shell
```

It will open a firebase shell in which you can type `uploadToAlgolia()` to run the function.

## Add a new environment variable

First choose the environment you want to add the variable to:

```
$> firebase use default
```

Then you can set it:

```
$> firebase functions:config:set algolia.index=prod_data
```
