import * as functions from "firebase-functions";

import {
  setAlgoliaSettingsHandler,
  refreshAlgoliaTrialIndexHandler,
  subscribeToUpdatesHandler,
  unsubscribeFromUpdatesHandler,
  sendEmailsScheduled
} from "./presentation";
import {
  AlgoliaIndexingService,
  setupAlgoliaIndex,
  PostgresTrialRepository,
  setupPostgresClient,
  setupFirebase,
  FirestoreSubscriptionRepository,
  PubSubMessageService
} from "./infrastructure";
import { IndexingService, MessagingService } from "./application";
import { TrialRepository, SubscriptionRepository } from "./domain";

interface Services {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
}

const { firestore } = setupFirebase({
  config: functions.config().firebase ?? undefined
});

const feedServices = <Ret, Argument1, Argument2>(
  callback:
    | ((
        services: Services
      ) => (arg1: Argument1, ...rest: any[]) => Promise<Ret>)
    | ((
        services: Services
      ) => (arg1: Argument1, arg2?: Argument2, ...rest: any[]) => Promise<Ret>)
) => async (
  arg1: Argument1,
  arg2?: Argument2,
  ...rest: any[]
): Promise<Ret> => {
  const algoliaIndex = setupAlgoliaIndex({
    apiKey: functions.config().algolia.apikey,
    indexName: functions.config().algolia.index
  });
  const postgresClient = await setupPostgresClient();

  const indexingService = new AlgoliaIndexingService(algoliaIndex);

  const trialRepository = new PostgresTrialRepository(
    postgresClient,
    functions.config().pg.tablename
  );

  const subscriptionRepository = new FirestoreSubscriptionRepository(firestore);

  const messagingService = new PubSubMessageService();

  const result = await callback({
    indexingService,
    trialRepository,
    subscriptionRepository,
    messagingService
  })(arg1, arg2, ...rest);

  await postgresClient.end();

  return result;
};

export const refreshAlgoliaTrialIndex = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(feedServices(refreshAlgoliaTrialIndexHandler));

export const setAlgoliaSettings = functions.https.onRequest(
  feedServices(setAlgoliaSettingsHandler)
);

export const subscribeToUpdates = functions.https.onRequest(
  feedServices(subscribeToUpdatesHandler)
);

export const unsubscribeFromUpdates = functions.https.onRequest(
  feedServices(unsubscribeFromUpdatesHandler)
);

export const sendEmails = functions.pubsub
  .schedule("every 1 hour")
  .onRun(feedServices(sendEmailsScheduled));
