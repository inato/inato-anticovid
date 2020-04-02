import { SubscriptionRepository } from "./SubscriptionRepository";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Option from "fp-ts/lib/Option";
import { subscriptionFactory } from "./subscriptionFactory";

export const subscriptionRepositoryFactory = ({
  findAllSubscriptionsLastEmailSentAfter = () => TaskEither.right([]),
  store = () => TaskEither.right(undefined),
  remove = () => TaskEither.right(undefined),
  findById = () => TaskEither.right(Option.some(subscriptionFactory()))
}: Partial<SubscriptionRepository> = {}): SubscriptionRepository => ({
  findAllSubscriptionsLastEmailSentAfter,
  store,
  remove,
  findById
});
