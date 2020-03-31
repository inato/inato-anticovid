/* tslint:disable:no-empty */

import { SubscriptionRepository } from "./SubscriptionRepository";

export const SubscriptionRepositoryFactory = ({
  findAllSubscriptionsLastEmailSentAfter = async () => [],
  store = async () => {}
}: Partial<SubscriptionRepository> = {}): SubscriptionRepository => ({
  findAllSubscriptionsLastEmailSentAfter,
  store
});
