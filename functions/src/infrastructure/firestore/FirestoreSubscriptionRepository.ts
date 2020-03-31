import * as admin from "firebase-admin";
import * as TaskEither from "fp-ts/lib/TaskEither";

import { SubscriptionRepository, Subscription } from "../../domain";
import { unknownError } from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";
import { deserialize } from "./deserialize";
import { serialize } from "./serialize";

const SUBSCRIPTION_COLLECTION_NAME = "subscriptions";

export class FirestoreSubscriptionRepository implements SubscriptionRepository {
  firestore: admin.firestore.Firestore;

  constructor(firestore: admin.firestore.Firestore) {
    this.firestore = firestore;
  }

  findAllSubscriptionsLastEmailSentAfter(date: Date) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          this.firestore
            .collection(SUBSCRIPTION_COLLECTION_NAME)
            .where("last_email_sent_date", ">", date)
            .get(),
        e =>
          unknownError(
            e instanceof Error ? e.message : "Unknown firestore get error"
          )
      ),
      TaskEither.map(results =>
        results.docs.map(document => deserialize(document.data()))
      )
    );
  }

  store(subscription: Subscription) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          this.firestore
            .collection(SUBSCRIPTION_COLLECTION_NAME)
            .doc()
            .set(serialize(subscription)),
        e =>
          unknownError(
            e instanceof Error ? e.message : "Unknown firestore store error"
          )
      ),
      TaskEither.map(() => undefined)
    );
  }
}
