import { Subscription } from "./Subscription";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericError, GenericErrorType } from "../errors";

export interface SubscriptionRepository {
  findAllSubscriptionsLastEmailSentAfter(
    date: Date
  ): TaskEither.TaskEither<
    GenericError<
      GenericErrorType.UnknownError | GenericErrorType.InvalidInformationError
    >,
    ReadonlyArray<Subscription>
  >;
  store(
    subscription: Subscription
  ): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void>;
}
