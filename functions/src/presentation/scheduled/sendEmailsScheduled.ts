import * as functions from "firebase-functions";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { SubscriptionRepository } from "../../domain";
import { pipe } from "fp-ts/lib/pipeable";
import { readonlyArray } from "fp-ts/lib/ReadonlyArray";
import { taskEitherExtend } from "../../domain/utils/taskEither";
import { MessagingService } from "../../application";
import { subDays } from "date-fns";

export const sendEmailsScheduled = ({
  subscriptionRepository,
  messagingService
}: {
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
}) => (_context: functions.EventContext) =>
  pipe(
    subscriptionRepository.findAllSubscriptionsLastEmailSentAfter(
      subDays(new Date(), 1)
    ),
    taskEitherExtend(subscriptions =>
      readonlyArray.traverse(TaskEither.taskEither)(
        subscriptions,
        subscription =>
          messagingService.sendSubscriptionEmailMessage({
            subscriptionId: subscription.id
          })
      )
    )
  )();
