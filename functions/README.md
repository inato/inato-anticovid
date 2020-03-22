# Run locally

You will need to use node 10 (use nvm)

You must first select an environment:

```sh
firebase use staging
```

Then, you must set the environment variables in a local file

```sh
firebase functions:config:get > .runtimeconfig.json
```

Then you can run

```
yarn shell
```
