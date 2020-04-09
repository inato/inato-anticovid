import {
  SubscriptionRepository,
  SubscriptionId,
} from '../../domain/subscription';

export const unsubscribeFromUpdates = ({
  subscriptionRepository,
  subscriptionId,
}: {
  subscriptionRepository: SubscriptionRepository;
  subscriptionId: SubscriptionId;
}) => subscriptionRepository.remove(subscriptionId);
