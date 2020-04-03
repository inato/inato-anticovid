import { Subscription } from "../../domain";
import { SearchResult } from "./IndexingService";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericError, GenericErrorType } from "../../domain/errors";

export interface EmailService {
  sendNewResultsForSubscription(attributes: {
    subscription: Subscription;
    newResults: ReadonlyArray<SearchResult>;
  }): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void>;
}
