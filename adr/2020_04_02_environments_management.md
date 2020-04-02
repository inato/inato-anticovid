# Environments management

**Status**: In review

**Date of approval**: N/A

**Owner:** Léopold Houdin

## Context

Throughout the process of development and release, the deployed components, codebase and data may vary in stability and quality (despite all used effort by the teams 😛). Also, since several teams with different use cases work on the same project, potentially at the same time, there might be collision(s) in development and integration.

## Decision

In order to ensure that only stable and quality code is shipped to the public viewer (app visitor), we will use several environments. This will allow siloting the code updates in a controlled manner.

## Consequences

The following environments exist:

- **Production**: This is the visitor facing environment. **It must be stable**, i.e. code and data shipped to production must be of the best quality and validated by product team.

- **Staging**: This is an internal purposed environment. *Components, code and data therein might be unstable* and thus could potentially not reflect what would be deployed to production. This is the environment used by the product team to validate new improvements, fix and so... Since there is "only" one environment of that kind, several updates might concurrently live there.

- **Local**: This is a development purposed environment. Each developer (independently of its team) might use such an environment while developing. Since our stack involves components on GCP and Algolia, the following has been decided: GCP CloudFunctions can be ran locally (refer to `README.md` for usage); Algolia indices can only exist in Algolia (i.e. SAAS), thus one must create its own (i.e. developer bound) index (refer to `README.md` for usage) and refer to it locally by updating `algolia.index` in the `functions/.runtimeconfig.json` file.
