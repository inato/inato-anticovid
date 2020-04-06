import * as functions from "firebase-functions";

import {
  setAlgoliaSettingsHandler,
  refreshAlgoliaTrialIndexHandler,
  subscribeToUpdatesHandler,
  unsubscribeFromUpdatesHandler,
  sendEmailsScheduled,
  sendEmailConsumer
} from "./presentation";
import {
  AlgoliaIndexingService,
  setupAlgoliaIndex,
  PostgresTrialRepository,
  setupPostgresClient,
  setupFirebase,
  FirestoreSubscriptionRepository,
  PubSubMessageService,
  SUBSCRIPTION_EMAIL_TOPIC,
  PostmarkEmailService,
  ConsoleLoggingService
} from "./infrastructure";
import {
  IndexingService,
  MessagingService,
  EmailService,
  LoggingService,
  TimeService
} from "./application";
import { TrialRepository, SubscriptionRepository } from "./domain";
import { DateTimeService } from "./infrastructure/DateTimeService";

interface Services {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
  emailService: EmailService;
  loggingService: LoggingService;
  timeService: TimeService;
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
  const loggingService = new ConsoleLoggingService();

  const algoliaIndex = setupAlgoliaIndex({
    apiKey: functions.config().algolia.apikey,
    indexName: functions.config().algolia.index,
    clientId: functions.config().algolia.clientid,
    loggingService
  });
  const postgresClient = await setupPostgresClient();

  const indexingService = new AlgoliaIndexingService(algoliaIndex);

  const trialRepository = new PostgresTrialRepository(
    postgresClient,
    functions.config().pg.tablename
  );

  const subscriptionRepository = new FirestoreSubscriptionRepository(firestore);

  const messagingService = new PubSubMessageService();

  const emailService = new PostmarkEmailService({
    apiToken: functions.config().postmark.apitoken
  });

  const timeService = new DateTimeService();

  const result = await callback({
    indexingService,
    trialRepository,
    subscriptionRepository,
    messagingService,
    emailService,
    loggingService,
    timeService
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

export const sendEmailsScheduler = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(feedServices(sendEmailsScheduled));

export const sendEmailOnEvent = functions.pubsub
  .topic(SUBSCRIPTION_EMAIL_TOPIC)
  .onPublish(feedServices(sendEmailConsumer));
