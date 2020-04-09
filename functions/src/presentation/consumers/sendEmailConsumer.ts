import * as functions from 'firebase-functions';
import * as decod from 'decod';
import * as Either from 'fp-ts/lib/Either';
import * as TaskEither from 'fp-ts/lib/TaskEither';
import * as Task from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';

import { SubscriptionRepository, toSubscriptionId } from '../../domain';
import { invalidInformationError } from '../../domain/errors';
import { taskEitherExtend } from '../../domain/utils/taskEither';
import {
  sendEmailIfNewTrials,
  IndexingService,
  EmailService,
  LoggingService,
  TimeService,
  ReportingService,
} from '../../application';

export const sendEmailConsumer = ({
  subscriptionRepository,
  indexingService,
  emailService,
  loggingService,
  timeService,
  reportingService,
}: {
  subscriptionRepository: SubscriptionRepository;
  indexingService: IndexingService;
  emailService: EmailService;
  loggingService: LoggingService;
  timeService: TimeService;
  reportingService: ReportingService;
}) => (message: functions.pubsub.Message) =>
  pipe(
    TaskEither.fromEither(deserializeMessage(message.json)),
    taskEitherExtend(({ subscriptionId }) => {
      loggingService.log(
        `Handling send email message for subscription ${subscriptionId}`,
      );
      return sendEmailIfNewTrials({
        subscriptionId,
        subscriptionRepository,
        indexingService,
        emailService,
        loggingService,
        timeService,
      });
    }),
    TaskEither.fold(
      e => {
        reportingService.reportError(e.toError());
        loggingService.log('Error when sending email', e.reason);
        return Task.of(undefined);
      },
      () => {
        loggingService.log('Sent email successfully');
        return Task.of(undefined);
      },
    ),
  )();

const deserializeMessage = (message: unknown) =>
  Either.tryCatch(
    () =>
      decod.props({
        subscriptionId: decod.at('subscriptionId', (value: unknown) =>
          toSubscriptionId(decod.string(value)),
        ),
      })(message),
    e =>
      invalidInformationError(
        e instanceof Error
          ? e.message
          : 'Unknown error during decode of message',
      ),
  );
