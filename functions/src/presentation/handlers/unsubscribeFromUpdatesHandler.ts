import * as functions from "firebase-functions";
import { unsubscribeFromUpdates } from "../../application";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Either from "fp-ts/lib/Either";
import * as Task from "fp-ts/lib/Task";
import * as decod from "decod";
import { toSubscriptionId, SubscriptionRepository } from "../../domain";
import { invalidInformationError } from "../../domain/errors";
import { taskEitherExtend } from "../../domain/utils/taskEither";

export const unsubscribeFromUpdatesHandler = ({
  subscriptionRepository
}: {
  subscriptionRepository: SubscriptionRepository;
}) => (request: functions.https.Request, response: functions.Response<any>) =>
  pipe(
    pipe(parseSubscriptionIdFromRequest(request), TaskEither.fromEither),
    taskEitherExtend(subscriptionId =>
      unsubscribeFromUpdates({ subscriptionRepository, subscriptionId })
    ),
    TaskEither.fold(
      error => {
        response.status(500).send(error.reason);
        return Task.of(undefined);
      },
      () => {
        response.send(`Successfully unsubscribed from updates`);
        return Task.of(undefined);
      }
    )
  )();

const parseSubscriptionIdFromRequest = ({ query }: functions.https.Request) =>
  Either.tryCatch(
    () => decod.at("subscriptionId", decodeSubscriptionId)(query),
    e =>
      invalidInformationError(
        e instanceof Error ? e.message : "Unknown decode error"
      )
  );

const decodeSubscriptionId = (value: unknown) =>
  toSubscriptionId(decod.string(value));
