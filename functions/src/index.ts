import * as functions from "firebase-functions";

import {
  setAlgoliaSettingsHandler,
  uploadToAlgoliaHandler
} from "./presentation";

export const uploadToAlgolia = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(uploadToAlgoliaHandler);

export const setAlgoliaSettings = functions.https.onRequest(
  setAlgoliaSettingsHandler
);
