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
  ConsoleLoggingService,
  DateTimeService,
  SentryReportingService
} from "./infrastructure";
import {
  IndexingService,
  MessagingService,
  EmailService,
  LoggingService,
  TimeService,
  ReportingService
} from "./application";
import { TrialRepository, SubscriptionRepository } from "./domain";

interface Services {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
  emailService: EmailService;
  loggingService: LoggingService;
  reportingService: ReportingService;
  timeService: TimeService;
}

const { firestore } = setupFirebase({
  config: functions.config().firebase ?? undefined
});

const feedServices = <Ret, Argument1, Argument2>(
  requiredServices: ReadonlyArray<keyof Services>,
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
): Promise<Ret | void> => {
  const loggingService = new ConsoleLoggingService();
  const reportingService = new SentryReportingService({
    dsn: functions.config().sentry.dsn,
    environment: functions.config().sentry.environment
  });

  const algoliaIndex = setupAlgoliaIndex({
    apiKey: functions.config().algolia.apikey,
    indexName: functions.config().algolia.index,
    clientId: functions.config().algolia.clientid,
    loggingService
  });
  const postgresClient = await setupPostgresClient();

  const availableServices: Map<keyof Services, any> = new Map<
    keyof Services,
    () => any
  >(
    Object.entries({
      timeService: () => new DateTimeService(),
      emailService: () =>
        new PostmarkEmailService({
          apiToken: functions.config().postmark.apitoken
        }),
      messagingService: () => new PubSubMessageService(),
      subscriptionRepository: () =>
        new FirestoreSubscriptionRepository(firestore),
      trialRepository: () =>
        new PostgresTrialRepository(
          postgresClient,
          functions.config().pg.tablename
        ),
      indexingService: () => new AlgoliaIndexingService(algoliaIndex),
      loggingService: () => loggingService,
      reportingService: () => reportingService
    }) as any
  );

  const services = Array.from(availableServices.entries())
    .filter(([key]) => requiredServices.includes(key))
    .reduce((acc, [key, f]) => {
      acc[key] = f();
      return acc;
    }, {} as any);

  try {
    const result = await callback(services)(arg1, arg2, ...rest);

    await postgresClient.end();

    return result;
  } catch (e) {
    reportingService.reportError(e);
    throw e;
  }
};

export const refreshAlgoliaTrialIndex = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(
    feedServices(
      [
        "trialRepository",
        "indexingService",
        "loggingService",
        "reportingService"
      ],
      refreshAlgoliaTrialIndexHandler
    )
  );

export const setAlgoliaSettings = functions.https.onRequest(
  feedServices(
    ["indexingService", "reportingService"],
    setAlgoliaSettingsHandler
  )
);

export const subscribeToUpdates = functions.https.onRequest(
  feedServices(
    ["subscriptionRepository", "indexingService", "reportingService"],
    subscribeToUpdatesHandler
  )
);

export const unsubscribeFromUpdates = functions.https.onRequest(
  feedServices(
    ["subscriptionRepository", "reportingService"],
    unsubscribeFromUpdatesHandler
  )
);

export const sendEmailsScheduler = functions.pubsub
  .schedule("every 60 minutes")
  .onRun(
    feedServices(
      [
        "subscriptionRepository",
        "messagingService",
        "loggingService",
        "timeService",
        "reportingService"
      ],
      sendEmailsScheduled
    )
  );

export const sendEmailOnEvent = functions.pubsub
  .topic(SUBSCRIPTION_EMAIL_TOPIC)
  .onPublish(
    feedServices(
      [
        "subscriptionRepository",
        "indexingService",
        "emailService",
        "loggingService",
        "timeService",
        "reportingService"
      ],
      sendEmailConsumer
    )
  );
