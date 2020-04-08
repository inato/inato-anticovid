import * as TaskEither from 'fp-ts/lib/TaskEither';
import * as Task from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import { readonlyArray } from 'fp-ts/lib/ReadonlyArray';
import { subDays } from 'date-fns';

import { SubscriptionRepository } from '../../domain';
import { taskEitherExtend } from '../../domain/utils/taskEither';
import {
  MessagingService,
  LoggingService,
  ReportingService,
} from '../../application';
import { TimeService } from '../../application/services/TimeService';

export const sendEmailsScheduled = ({
  subscriptionRepository,
  messagingService,
  loggingService,
  timeService,
  reportingService,
}: {
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
  loggingService: LoggingService;
  reportingService: ReportingService;
  timeService: TimeService;
}) => () =>
  pipe(
    subscriptionRepository.findAllSubscriptionsLastEmailSentBefore(
      subDays(timeService.currentDate, 1),
    ),
    taskEitherExtend(subscriptions => {
      loggingService.log(
        `Sending ${subscriptions.length} orders to send emails`,
      );
      return readonlyArray.traverse(TaskEither.taskEither)(
        subscriptions,
        subscription =>
          messagingService.sendSubscriptionEmailMessage({
            subscriptionId: subscription.id,
          }),
      );
    }),
    TaskEither.fold(
      e => {
        reportingService.reportError(e.toError());
        loggingService.log('Error scheduling mails', e.reason);
        return Task.of(undefined);
      },
      () => {
        return Task.of(undefined);
      },
    ),
  )();
