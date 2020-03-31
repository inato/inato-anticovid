import { Subscription } from "./Subscription";

export interface SubscriptionRepository {
  findAllSubscriptionsLastEmailSentAfter(
    date: Date
  ): Promise<Array<Subscription>>;
  store(subscription: Subscription): Promise<void>;
}
