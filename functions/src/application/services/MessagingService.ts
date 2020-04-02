import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericErrorType, GenericError } from "../../domain/errors";
import { SubscriptionId } from "../../domain";

export interface SubscriptionEmailMessagePayload {
  subscriptionId: SubscriptionId;
}

export interface MessagingService {
  sendSubscriptionEmailMessage(
    payload: SubscriptionEmailMessagePayload
  ): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void>;
}
