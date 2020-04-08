import { indexingServiceFactory } from '../services';
import {
  InMemorySubscriptionRepository,
  searchFactory,
  emailAddressFactory,
} from '../../domain';

import { subscribeToUpdates } from './subscribeToUpdates';

describe('subscribeToUpdates', () => {
  it('should create a new subscription', async () => {
    const subscriptionRepository = new InMemorySubscriptionRepository();
    await subscribeToUpdates({
      indexingService: indexingServiceFactory(),
      subscriptionRepository,
      searchState: searchFactory(),
      email: emailAddressFactory(),
    })();

    expect(Array.from(subscriptionRepository.entities.entries())).toHaveLength(
      1,
    );
  });
});
