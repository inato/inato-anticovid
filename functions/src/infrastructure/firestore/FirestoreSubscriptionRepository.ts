import * as admin from 'firebase-admin';
import * as TaskEither from 'fp-ts/lib/TaskEither';
import * as Option from 'fp-ts/lib/Option';
import { array } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';

import {
  SubscriptionRepository,
  Subscription,
  SubscriptionId,
} from '../../domain';
import { unknownError } from '../../domain/errors';
import { taskEitherExtend } from '../../domain/utils/taskEither';

import { deserialize } from './deserialize';
import { serialize } from './serialize';

const SUBSCRIPTION_COLLECTION_NAME = 'subscriptions';

export class FirestoreSubscriptionRepository implements SubscriptionRepository {
  firestore: admin.firestore.Firestore;

  constructor(firestore: admin.firestore.Firestore) {
    this.firestore = firestore;
  }

  findAllSubscriptionsLastEmailSentBefore(date: Date) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          this.firestore
            .collection(SUBSCRIPTION_COLLECTION_NAME)
            .where('last_email_sent_date', '<', date)
            .get(),
        e =>
          unknownError(
            e instanceof Error ? e.message : 'Unknown firestore get error',
          ),
      ),
      taskEitherExtend(results =>
        array.traverse(TaskEither.taskEither)(results.docs, document =>
          TaskEither.fromEither(deserialize(document.id, document.data())),
        ),
      ),
    );
  }

  findAllSubscriptions() {
    return pipe(
      TaskEither.tryCatch(
        () => this.firestore.collection(SUBSCRIPTION_COLLECTION_NAME).get(),
        e =>
          unknownError(
            e instanceof Error ? e.message : 'Unknown firestore get error',
          ),
      ),
      taskEitherExtend(results =>
        array.traverse(TaskEither.taskEither)(results.docs, document =>
          TaskEither.fromEither(deserialize(document.id, document.data())),
        ),
      ),
    );
  }

  findById(subscriptionId: SubscriptionId) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          this.firestore
            .collection(SUBSCRIPTION_COLLECTION_NAME)
            .doc(subscriptionId)
            .get(),
        e =>
          unknownError(
            e instanceof Error
              ? e.message
              : 'Unknown firestore find document error',
          ),
      ),
      taskEitherExtend(document => {
        const documentData = document.data();
        return document.exists && documentData
          ? pipe(deserialize(document.id, documentData), TaskEither.fromEither)
          : TaskEither.right(null);
      }),
      TaskEither.map(Option.fromNullable),
    );
  }

  remove(subscriptionId: SubscriptionId) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          this.firestore
            .collection(SUBSCRIPTION_COLLECTION_NAME)
            .doc(subscriptionId)
            .delete(),
        e =>
          unknownError(
            e instanceof Error
              ? e.message
              : 'Unknown firestore delete document error',
          ),
      ),
      TaskEither.map(() => undefined),
    );
  }

  store(subscription: Subscription) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          this.firestore
            .collection(SUBSCRIPTION_COLLECTION_NAME)
            .doc(subscription.id)
            .set(serialize(subscription)),
        e =>
          unknownError(
            e instanceof Error ? e.message : 'Unknown firestore store error',
          ),
      ),
      TaskEither.map(() => undefined),
    );
  }
}
