import * as TaskEither from "fp-ts/lib/TaskEither";

import {
  MessagingService,
  SubscriptionEmailMessagePayload
} from "../../application";
import {
  GenericErrorType,
  GenericError,
  unknownError
} from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";
import { PubSub } from "@google-cloud/pubsub";

// Creates a client

export const SUBSCRIPTION_EMAIL_TOPIC = "subscription_email";

export class PubSubMessageService implements MessagingService {
  pubsub: PubSub = new PubSub();

  sendSubscriptionEmailMessage(
    payload: SubscriptionEmailMessagePayload
  ): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void> {
    return pipe(
      TaskEither.tryCatch(
        () => this.pubsub.topic(SUBSCRIPTION_EMAIL_TOPIC).publishJSON(payload),
        e =>
          unknownError(
            e instanceof Error ? e.message : "Unknown publishing to topic error"
          )
      ),
      TaskEither.map(() => undefined)
    );
  }
}
