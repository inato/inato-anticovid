import { pipe } from 'fp-ts/lib/pipeable';
import * as TaskEither from 'fp-ts/lib/TaskEither';
import { subDays, isBefore } from 'date-fns';

import {
  SubscriptionRepository,
  SubscriptionId,
  Subscription,
} from '../../domain';
import { taskEitherExtend } from '../../domain/utils/taskEither';
import { aggregateNotFoundError, genericError } from '../../domain/errors';
import {
  IndexingService,
  SearchResult,
  EmailService,
  LoggingService,
  TimeService,
} from '../services';

export const sendEmail = ({
  subscriptionRepository,
  indexingService,
  emailService,
  loggingService,
  timeService,
  subscriptionId,
}: {
  subscriptionRepository: SubscriptionRepository;
  indexingService: IndexingService;
  emailService: EmailService;
  loggingService: LoggingService;
  timeService: TimeService;
  subscriptionId: SubscriptionId;
}) =>
  pipe(
    findSubscriptionIfEmailNotSentForToday({
      subscriptionId,
      subscriptionRepository,
      timeService,
    }),
    taskEitherExtend(subscription =>
      pipe(
        findNewTrials({ subscription, indexingService }),
        taskEitherExtend(newTrials => {
          loggingService.log(
            `Found ${newTrials.length} new trials for subscription ${subscription.id}`,
          );
          return newTrials.length > 0
            ? sendEmailAndUpdateSubscription({
                subscription,
                newTrials,
                subscriptionRepository,
                emailService,
                timeService,
              })
            : TaskEither.right(undefined);
        }),
      ),
    ),
  );

const sendEmailAndUpdateSubscription = ({
  subscription,
  newTrials,
  subscriptionRepository,
  emailService,
  timeService,
}: {
  subscription: Subscription;
  newTrials: ReadonlyArray<SearchResult>;
  subscriptionRepository: SubscriptionRepository;
  emailService: EmailService;
  timeService: TimeService;
}) =>
  pipe(
    emailService.sendNewResultsForSubscription({
      subscription,
      newResults: newTrials,
    }),
    taskEitherExtend(() =>
      subscriptionRepository.store(
        subscription.buildWithNewSearchResultsAndEmailSentDate({
          newSearchResults: newTrials.map(({ trialId }) => trialId),
          lastEmailSentDate: timeService.currentDate,
        }),
      ),
    ),
  );

const findSubscriptionIfEmailNotSentForToday = ({
  subscriptionId,
  subscriptionRepository,
  timeService,
}: {
  subscriptionId: SubscriptionId;
  subscriptionRepository: SubscriptionRepository;
  timeService: TimeService;
}) =>
  pipe(
    subscriptionRepository.findById(subscriptionId),
    taskEitherExtend(subscriptionOption =>
      pipe(
        subscriptionOption,
        TaskEither.fromOption(() =>
          aggregateNotFoundError('Subscription not found'),
        ),
        taskEitherExtend(subscription => {
          if (
            isBefore(
              subscription.lastEmailSentDate,
              subDays(timeService.currentDate, 1),
            )
          ) {
            return TaskEither.right(subscription);
          }
          return TaskEither.left(
            duplicateError(
              `Mail has already been sent today for subscription ${subscription.id}`,
            ),
          );
        }),
      ),
    ),
  );

const findNewTrials = ({
  subscription,
  indexingService,
}: {
  subscription: Subscription;
  indexingService: IndexingService;
}) =>
  pipe(
    indexingService.searchTrials(subscription.search),
    TaskEither.map(results =>
      results.filter(
        result => !subscription.searchResults.includes(result.trialId),
      ),
    ),
  );

export enum SendEmailError {
  Duplicate = 'SEND_EMAIL_DUPLICATE_ERROR',
}

export const duplicateError = (reason: string) =>
  genericError(SendEmailError.Duplicate, reason);
