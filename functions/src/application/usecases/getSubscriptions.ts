import { SubscriptionRepository } from '../../domain/subscription';

export const getSubscriptions = ({
  subscriptionRepository,
}: {
  subscriptionRepository: SubscriptionRepository;
}) => subscriptionRepository.findAllSubscriptions();
