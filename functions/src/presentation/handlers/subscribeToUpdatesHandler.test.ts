import { subscribeToUpdatesHandler } from "./subscribeToUpdatesHandler";
import { indexingServiceFactory } from "../../application";
import { requestFactory, responseFactory } from "../factories";
import { InMemorySubscriptionRepository } from "../../domain";

describe("subscribeToUpdatesHandler", () => {
  it("should answer with 204 when no errors", async () => {
    const handler = subscribeToUpdatesHandler({
      subscriptionRepository: new InMemorySubscriptionRepository(),
      indexingService: indexingServiceFactory()
    });
    const sendStatus = jest.fn();
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    await handler(
      requestFactory({
        query: {
          email: "email@toto.com"
        }
      }),
      responseFactory({ sendStatus, status, send })
    );
    expect(send).not.toHaveBeenCalled();
    expect(status).not.toHaveBeenCalled();
    expect(sendStatus).toHaveBeenCalledWith(204);
  });

  it("should answer with 500 when there is an error", async () => {
    const handler = subscribeToUpdatesHandler({
      subscriptionRepository: new InMemorySubscriptionRepository(),
      indexingService: indexingServiceFactory()
    });
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    await handler(
      requestFactory({
        query: {
          email: "invalidEmail"
        }
      }),
      responseFactory({ status })
    );

    expect(status).toHaveBeenCalledWith(500);
  });
});
