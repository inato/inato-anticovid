import * as functions from "firebase-functions";
import * as decod from "decod";
import * as Either from "fp-ts/lib/Either";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { SubscriptionRepository, toSubscriptionId } from "../../domain";
import { pipe } from "fp-ts/lib/pipeable";
import { invalidInformationError } from "../../domain/errors";
import { taskEitherExtend } from "../../domain/utils/taskEither";
import {
  sendEmail,
  IndexingService,
  EmailService,
  LoggingService
} from "../../application";

export const sendEmailConsumer = ({
  subscriptionRepository,
  indexingService,
  emailService,
  loggingService
}: {
  subscriptionRepository: SubscriptionRepository;
  indexingService: IndexingService;
  emailService: EmailService;
  loggingService: LoggingService;
}) => (message: functions.pubsub.Message, _context: functions.EventContext) =>
  pipe(
    TaskEither.fromEither(deserializeMessage(message.toJSON())),
    taskEitherExtend(({ subscriptionId }) =>
      sendEmail({
        subscriptionId,
        subscriptionRepository,
        indexingService,
        emailService,
        loggingService
      })
    )
  )();

const deserializeMessage = (message: unknown) =>
  Either.tryCatch(
    () =>
      decod.props({
        subscriptionId: decod.at("subscriptionId", (value: unknown) =>
          toSubscriptionId(decod.string(value))
        )
      })(message),
    e =>
      invalidInformationError(
        e instanceof Error
          ? e.message
          : "Unknown error during decode of message"
      )
  );
