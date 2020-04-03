import {
  SubscriptionRepository,
  SubscriptionId,
  Subscription
} from "../../domain";
import { pipe } from "fp-ts/lib/pipeable";
import { taskEitherExtend } from "../../domain/utils/taskEither";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { aggregateNotFoundError, genericError } from "../../domain/errors";
import { IndexingService, SearchResult, EmailService } from "../services";

export const sendEmail = ({
  subscriptionRepository,
  indexingService,
  emailService,
  subscriptionId
}: {
  subscriptionRepository: SubscriptionRepository;
  indexingService: IndexingService;
  emailService: EmailService;
  subscriptionId: SubscriptionId;
}) =>
  pipe(
    findSubscriptionIfEmailNotSentForToday({
      subscriptionId,
      subscriptionRepository
    }),
    taskEitherExtend(subscription =>
      pipe(
        findNewTrials({ subscription, indexingService }),
        taskEitherExtend(newTrials =>
          sendEmailAndUpdateSubscription({
            subscription,
            newTrials,
            subscriptionRepository,
            emailService
          })
        )
      )
    )
  );

const sendEmailAndUpdateSubscription = ({
  subscription,
  newTrials,
  subscriptionRepository,
  emailService
}: {
  subscription: Subscription;
  newTrials: ReadonlyArray<SearchResult>;
  subscriptionRepository: SubscriptionRepository;
  emailService: EmailService;
}) =>
  pipe(
    emailService.sendNewResultsForSubscription({
      subscription,
      newResults: newTrials
    }),
    taskEitherExtend(() =>
      subscriptionRepository.store(
        subscription.buildWithNewSearchResultsAndEmailSentDate({
          searchResults: newTrials.map(({ trialId }) => trialId),
          lastEmailSentDate: new Date()
        })
      )
    )
  );

const findSubscriptionIfEmailNotSentForToday = ({
  subscriptionId,
  subscriptionRepository
}: {
  subscriptionId: SubscriptionId;
  subscriptionRepository: SubscriptionRepository;
}) =>
  pipe(
    subscriptionRepository.findById(subscriptionId),
    taskEitherExtend(subscriptionOption =>
      pipe(
        subscriptionOption,
        TaskEither.fromOption(() =>
          aggregateNotFoundError("Subscription not found")
        ),
        taskEitherExtend(subscription => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          if (subscription.lastEmailSentDate > date) {
            return TaskEither.right(subscription);
          }
          return TaskEither.left(
            duplicateError(
              `Mail has already been sent today for subscription ${subscription.id}`
            )
          );
        })
      )
    )
  );

const findNewTrials = ({
  subscription,
  indexingService
}: {
  subscription: Subscription;
  indexingService: IndexingService;
}) =>
  pipe(
    indexingService.searchTrials(subscription.search),
    TaskEither.map(results =>
      results.filter(
        result => !subscription.searchResults.includes(result.trialId)
      )
    )
  );

enum SendEmailError {
  Duplicate = "SEND_EMAIL_DUPLICATE_ERROR"
}

const duplicateError = (reason: string) =>
  genericError(SendEmailError.Duplicate, reason);
