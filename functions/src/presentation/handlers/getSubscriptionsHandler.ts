import * as functions from "firebase-functions";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";
import { SubscriptionRepository } from "../../domain";
import { getSubscriptions } from "../../application/usecases/getSubscriptions";

export const getSubscriptionsHandler = ({
  subscriptionRepository
}: {
  subscriptionRepository: SubscriptionRepository;
}) => (_request: functions.https.Request, response: functions.Response<any>) =>
  pipe(
    pipe(
      getSubscriptions({ subscriptionRepository })
    ),
    TaskEither.fold(
      error => {
        response.status(500).send(error.reason);
        return Task.of(undefined);
      },
      subscriptions => {
        response.send(subscriptions);
        return Task.of(undefined);
      }
    )
  )();
