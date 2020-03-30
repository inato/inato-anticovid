import { refreshTrialIndex } from "../../application";
import * as functions from "firebase-functions";

import {
  AlgoliaIndexingService,
  setupAlgoliaIndex,
  setupPostgresClient,
  PostgresTrialRepository
} from "../../infrastructure";

export const uploadToAlgoliaHandler = async (
  _request: functions.https.Request,
  response: functions.Response
) => {
  const client = await setupPostgresClient();
  const tableName = functions.config().pg.tablename;
  const trialRepository = new PostgresTrialRepository(client, tableName);

  const algoliaIndex = setupAlgoliaIndex({
    apiKey: functions.config().algolia.apikey,
    indexName: functions.config().algolia.index
  });
  const indexingService = new AlgoliaIndexingService(algoliaIndex);

  const trialsCount = await refreshTrialIndex({
    indexingService,
    trialRepository
  });
  await client.end();
  response.send(`Indexed ${trialsCount} trials`);
};
