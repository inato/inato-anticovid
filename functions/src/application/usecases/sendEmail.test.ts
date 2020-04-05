import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Either from "fp-ts/lib/Either";

import { sendEmail, duplicateError } from "./sendEmail";
import {
  subscriptionFactory,
  InMemorySubscriptionRepository,
  trialFactory
} from "../../domain";
import { indexingServiceFactory, emailServiceFactory } from "../services";
import { subDays } from "date-fns";

describe("sendEmail", () => {
  it("should send an error if email has been sent less than a day ago", async () => {
    const subscription = subscriptionFactory({
      lastEmailSentDate: new Date()
    });
    const subscriptionRepository = new InMemorySubscriptionRepository();

    const indexingService = indexingServiceFactory({
      searchTrials: jest.fn(() => TaskEither.right([]))
    });
    const emailService = emailServiceFactory({
      sendNewResultsForSubscription: jest.fn(() => TaskEither.right(undefined))
    });
    await subscriptionRepository.store(subscription)();

    const result = await sendEmail({
      subscriptionRepository,
      indexingService,
      emailService,
      subscriptionId: subscription.id
    })();

    expect(emailService.sendNewResultsForSubscription).not.toHaveBeenCalled();
    expect(result).toStrictEqual(
      Either.left(
        duplicateError(
          `Mail has already been sent today for subscription ${subscription.id}`
        )
      )
    );
  });

  it("should not send an email and not return an error if there are no new trials", async () => {
    const subscription = subscriptionFactory({
      lastEmailSentDate: subDays(new Date(), 7)
    });
    const subscriptionRepository = new InMemorySubscriptionRepository();

    const indexingService = indexingServiceFactory({
      searchTrials: jest.fn(() => TaskEither.right([]))
    });
    const emailService = emailServiceFactory({
      sendNewResultsForSubscription: jest.fn(() => TaskEither.right(undefined))
    });
    await subscriptionRepository.store(subscription)();

    const result = await sendEmail({
      subscriptionRepository,
      indexingService,
      emailService,
      subscriptionId: subscription.id
    })();

    expect(emailService.sendNewResultsForSubscription).not.toHaveBeenCalled();
    expect(result).toStrictEqual(Either.right(undefined));
  });

  it("should send an email if there are new trials", async () => {
    const subscription = subscriptionFactory({
      lastEmailSentDate: subDays(new Date(), 7)
    });
    const newResults = [trialFactory()];
    const subscriptionRepository = new InMemorySubscriptionRepository();

    const indexingService = indexingServiceFactory({
      searchTrials: jest.fn(() => TaskEither.right(newResults))
    });
    const emailService = emailServiceFactory({
      sendNewResultsForSubscription: jest.fn(() => TaskEither.right(undefined))
    });
    await subscriptionRepository.store(subscription)();

    const result = await sendEmail({
      subscriptionRepository,
      indexingService,
      emailService,
      subscriptionId: subscription.id
    })();

    expect(emailService.sendNewResultsForSubscription).toHaveBeenCalledWith({
      newResults,
      subscription
    });
    expect(result).toStrictEqual(Either.right(undefined));
  });
});
