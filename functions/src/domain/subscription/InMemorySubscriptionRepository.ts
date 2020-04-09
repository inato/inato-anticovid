import * as TaskEither from 'fp-ts/lib/TaskEither';
import * as Option from 'fp-ts/lib/Option';
import { isBefore } from 'date-fns';

import { GenericError, GenericErrorType } from '../errors';

import { SubscriptionRepository } from './SubscriptionRepository';
import { Subscription, SubscriptionId } from './Subscription';

export class InMemorySubscriptionRepository implements SubscriptionRepository {
  entities: Map<SubscriptionId, Subscription> = new Map();

  findAllSubscriptionsLastEmailSentBefore(
    date: Date,
  ): TaskEither.TaskEither<
    GenericError<
      GenericErrorType.UnknownError | GenericErrorType.InvalidInformationError
    >,
    ReadonlyArray<Subscription>
  > {
    return TaskEither.right(
      Array.from(this.entities.values()).filter(subscription =>
        isBefore(subscription.lastEmailSentDate, date),
      ),
    );
  }

  store(
    subscription: Subscription,
  ): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void> {
    this.entities.set(subscription.id, subscription);
    return TaskEither.right(undefined);
  }

  remove(
    subscriptionId: SubscriptionId,
  ): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void> {
    this.entities.delete(subscriptionId);
    return TaskEither.right(undefined);
  }

  findById(
    subscriptionId: SubscriptionId,
  ): TaskEither.TaskEither<
    GenericError<
      GenericErrorType.UnknownError | GenericErrorType.InvalidInformationError
    >,
    Option.Option<Subscription>
  > {
    return TaskEither.right(
      Option.fromNullable(this.entities.get(subscriptionId)),
    );
  }

  findAllSubscriptions(): TaskEither.TaskEither<
    GenericError<
      GenericErrorType.UnknownError | GenericErrorType.InvalidInformationError
    >,
    ReadonlyArray<Subscription>
  > {
    return TaskEither.right(Array.from(this.entities.values()));
  }
}
