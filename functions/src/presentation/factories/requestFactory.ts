import * as functions from "firebase-functions";

export const requestFactory = ({
  query = {}
}: Partial<{ query: { [key: string]: unknown } }> = {}) =>
  ({ query } as functions.https.Request);
