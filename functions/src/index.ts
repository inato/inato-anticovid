import * as functions from "firebase-functions";

import {
  setAlgoliaSettingsHandler,
  uploadToAlgoliaHandler
} from "./presentation";
import {
  AlgoliaIndexingService,
  setupAlgoliaIndex,
  PostgresTrialRepository,
  setupPostgresClient
} from "./infrastructure";
import { IndexingService } from "./application";
import { TrialRepository } from "./domain";

interface Services {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
}

const feedServices = <Ret, Argument1, Argument2>(
  callback: (
    services: Services
  ) => (arg1: Argument1, arg2: Argument2, ...rest: any[]) => Ret
) => async (arg1: Argument1, arg2: Argument2, ...rest: any[]): Promise<Ret> => {
  const algoliaIndex = setupAlgoliaIndex({
    apiKey: functions.config().algolia.apikey,
    indexName: functions.config().algolia.index
  });

  const indexingService = new AlgoliaIndexingService(algoliaIndex);

  const client = await setupPostgresClient();
  const tableName = functions.config().pg.tablename;
  const trialRepository = new PostgresTrialRepository(client, tableName);

  return callback({ indexingService, trialRepository })(arg1, arg2, ...rest);
};

export const uploadToAlgolia = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(feedServices(uploadToAlgoliaHandler));

export const setAlgoliaSettings = functions.https.onRequest(
  feedServices(setAlgoliaSettingsHandler)
);
