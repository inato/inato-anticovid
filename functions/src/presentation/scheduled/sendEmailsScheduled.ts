import * as functions from "firebase-functions";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { SubscriptionRepository } from "../../domain";
import { pipe } from "fp-ts/lib/pipeable";
import { readonlyArray } from "fp-ts/lib/ReadonlyArray";
import { taskEitherExtend } from "../../domain/utils/taskEither";
import { MessagingService } from "../../application";

export const sendEmailsScheduled = ({
  subscriptionRepository,
  messagingService
}: {
  subscriptionRepository: SubscriptionRepository;
  messagingService: MessagingService;
}) => (_context: functions.EventContext) => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return pipe(
    subscriptionRepository.findAllSubscriptionsLastEmailSentAfter(date),
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
};
