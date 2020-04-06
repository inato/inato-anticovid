import {
  InMemorySubscriptionRepository,
  subscriptionFactory
} from "../../domain";
import { unsubscribeFromUpdates } from "./unsubscribeFromUpdates";
import * as Either from "fp-ts/lib/Either";
import * as Option from "fp-ts/lib/Option";

describe("unsubscribeFromUpdates", () => {
  it("should unsubscribe from updates", async () => {
    const subscription = subscriptionFactory();
    const subscriptionRepository = new InMemorySubscriptionRepository();
    await subscriptionRepository.store(subscription)();
    await unsubscribeFromUpdates({
      subscriptionRepository,
      subscriptionId: subscription.id
    })();

    expect(
      await subscriptionRepository.findById(subscription.id)()
    ).toStrictEqual(Either.right(Option.none));
  });
});
