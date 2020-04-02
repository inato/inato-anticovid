import { Subscription, SubscriptionId } from "./Subscription";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Option from "fp-ts/lib/Option";
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
  remove(
    subscriptionId: SubscriptionId
  ): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void>;
  findById(
    subscriptionId: SubscriptionId
  ): TaskEither.TaskEither<
    GenericError<
      GenericErrorType.UnknownError | GenericErrorType.InvalidInformationError
    >,
    Option.Option<Subscription>
  >;
}
