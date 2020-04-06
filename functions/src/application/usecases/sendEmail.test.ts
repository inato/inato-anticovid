import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Either from "fp-ts/lib/Either";
import * as Option from "fp-ts/lib/Option";

import { sendEmail, duplicateError } from "./sendEmail";
import {
  subscriptionFactory,
  InMemorySubscriptionRepository,
  trialFactory,
  Subscription
} from "../../domain";
import { indexingServiceFactory, emailServiceFactory } from "../services";
import { subDays } from "date-fns";
import { pipe } from "fp-ts/lib/pipeable";

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

  it("should send an email if there are new trials and update subscription", async () => {
    const subscription = subscriptionFactory({
      lastEmailSentDate: subDays(new Date(), 7),
      searchResults: []
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

    const newSubscription = pipe(
      await subscriptionRepository.findById(subscription.id)(),
      Either.getOrElse<any, Option.Option<Subscription>>(() => Option.none),
      Option.getOrElse<Subscription | null>(() => null)
    );

    expect(newSubscription).not.toEqual(null);
    expect(newSubscription!.lastEmailSentDate).not.toBe(
      subscription.lastEmailSentDate
    );
    expect(newSubscription!.searchResults).toStrictEqual(
      newResults.map(({ trialId }) => trialId)
    );
  });
});
