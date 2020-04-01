import { SubscriptionRepository } from "./SubscriptionRepository";
import * as TaskEither from "fp-ts/lib/TaskEither";

export const subscriptionRepositoryFactory = ({
  findAllSubscriptionsLastEmailSentAfter = () => TaskEither.right([]),
  store = () => TaskEither.right(undefined)
}: Partial<SubscriptionRepository> = {}): SubscriptionRepository => ({
  findAllSubscriptionsLastEmailSentAfter,
  store
});
