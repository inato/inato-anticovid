import * as functions from "firebase-functions";
import {
  setupAlgoliaIndex,
  AlgoliaIndexingService
} from "../../infrastructure";
import { setIndexSettings } from "../../application";

export const setAlgoliaSettingsHandler = async (
  _request: functions.https.Request,
  response: functions.Response<any>
) => {
  const algoliaIndex = setupAlgoliaIndex({
    apiKey: functions.config().algolia.apikey,
    indexName: functions.config().algolia.index
  });
  const indexingService = new AlgoliaIndexingService(algoliaIndex);

  await setIndexSettings({ indexingService });

  response.send(`Algolia settings have been set`);
};
