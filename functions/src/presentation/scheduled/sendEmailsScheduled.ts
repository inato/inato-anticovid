import * as functions from "firebase-functions";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { SubscriptionRepository } from "../../domain";
import { pipe } from "fp-ts/lib/pipeable";
import { readonlyArray } from "fp-ts/lib/ReadonlyArray";
import { taskEitherExtend } from "../../domain/utils/taskEither";
import { MessagingService, LoggingService } from "../../application";
import { subDays } from "date-fns";
import { TimeService } from "../../application/services/TimeService";

export const sendEmailsScheduled = ({
  subscriptionRepository,
  messagingService,
  loggingService,
  timeService
}: {
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
  loggingService: LoggingService;
  timeService: TimeService;
}) => (_context: functions.EventContext) =>
  pipe(
    subscriptionRepository.findAllSubscriptionsLastEmailSentAfter(
      subDays(timeService.currentDate, 1)
    ),
    taskEitherExtend(subscriptions => {
      loggingService.log(
        `Sending ${subscriptions.length} orders to send emails`
      );
      return readonlyArray.traverse(TaskEither.taskEither)(
        subscriptions,
        subscription =>
          messagingService.sendSubscriptionEmailMessage({
            subscriptionId: subscription.id
          })
      );
    })
  )();
