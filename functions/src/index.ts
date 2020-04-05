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
  PostmarkEmailService
} from "./infrastructure";
import {
  IndexingService,
  MessagingService,
  EmailService,
  sendEmail
} from "./application";
import {
  TrialRepository,
  SubscriptionRepository,
  Subscription,
  facetFiltersFactory,
  EmailAddress,
  subscriptionIdFactory
} from "./domain";
import { some } from "fp-ts/lib/Option";
import { fold } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/pipeable";
import { subDays } from "date-fns";

interface Services {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
  emailService: EmailService;
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

  const emailService = new PostmarkEmailService({
    apiToken: functions.config().postmark.apitoken
  });

  const result = await callback({
    indexingService,
    trialRepository,
    subscriptionRepository,
    messagingService,
    emailService
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

export const sendEmailCon = functions.pubsub
  .topic(SUBSCRIPTION_EMAIL_TOPIC)
  .onPublish(feedServices(sendEmailConsumer));

export const sendEmailToMyself = functions.https.onRequest(
  async (req, response) => {
    await feedServices(
      ({ subscriptionRepository, indexingService, emailService }) => async (
        _req: functions.https.Request,
        resp: functions.Response
      ) => {
        const subscription = new Subscription({
          id: subscriptionIdFactory(),
          lastEmailSentDate: subDays(new Date(), 2),
          email: EmailAddress.unsafe_parse("julien@inato.com"),
          search: {
            searchQuery: some("Chloroquine"),
            facetFilters: facetFiltersFactory()
          },
          searchResults: []
        });
        await subscriptionRepository.store(subscription)();
        await pipe(
          sendEmail({
            subscriptionRepository,
            indexingService,
            emailService,
            subscriptionId: subscription.id
          }),
          fold(
            e => async () => {
              console.log("e", e);
              resp.send(e);
            },
            () => async () => {
              resp.send("OK");
            }
          )
        )();
      }
    )(req, response);
  }
);
