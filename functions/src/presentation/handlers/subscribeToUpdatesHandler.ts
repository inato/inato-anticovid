import * as functions from "firebase-functions";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";
import {
  SubscriptionRepository,
  Subscription,
  EmailAddress
} from "../../domain";
import { taskEitherExtend } from "../../domain/utils/taskEither";

export const subscribeToUpdatesHandler = ({
  subscriptionRepository
}: {
  subscriptionRepository: SubscriptionRepository;
}) => async (
  _request: functions.https.Request,
  response: functions.Response<any>
) =>
  pipe(
    subscriptionRepository.store(
      Subscription.build({
        email: EmailAddress.unsafe_parse("julien@inato.com"),
        search: {},
        searchResults: []
      })
    ),
    taskEitherExtend(() =>
      subscriptionRepository.findAllSubscriptionsLastEmailSentAfter(
        new Date("2020-01-01")
      )
    ),
    TaskEither.fold(
      e => {
        response.status(500).send(e.reason);
        return Task.of(undefined);
      },
      result => {
        response.send(`Subscribed ${result.map(sub => sub.email)}`);
        return Task.of(undefined);
      }
    )
  )();

// SHOULD ADD ID
