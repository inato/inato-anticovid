import * as functions from "firebase-functions";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";
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
    subscriptionRepository.findAllSubscriptionsLastEmailSentBefore(
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
    }),
    TaskEither.fold(
      e => {
        loggingService.log("Error scheduling mails", e.reason);
        return Task.of(undefined);
      },
      () => {
        return Task.of(undefined);
      }
    )
  )();
