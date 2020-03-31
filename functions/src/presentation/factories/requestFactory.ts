import * as functions from "firebase-functions";

export const requestFactory = ({}: Partial<{}> = {}) =>
  ({} as functions.https.Request);
