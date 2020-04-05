import { subscribeToUpdates } from "./subscribeToUpdates";
import { indexingServiceFactory } from "../services";
import {
  InMemorySubscriptionRepository,
  searchFactory,
  emailAddressFactory
} from "../../domain";

describe("subscribeToUpdates", () => {
  it("should create a new subscription", async () => {
    const subscriptionRepository = new InMemorySubscriptionRepository();
    await subscribeToUpdates({
      indexingService: indexingServiceFactory(),
      subscriptionRepository,
      searchState: searchFactory(),
      email: emailAddressFactory()
    })();

    expect(Array.from(subscriptionRepository.entities.entries())).toHaveLength(
      1
    );
  });
});
