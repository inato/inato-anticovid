import { Client as PostmarkClient } from "postmark";
import { EmailService, SearchResult } from "../../application";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { Subscription } from "../../domain";
import { GenericError, GenericErrorType } from "../../domain/errors";

export class PostmarkEmailService implements EmailService {
  client: PostmarkClient;

  constructor({ apiToken }: { apiToken: string }) {
    this.client = new PostmarkClient(apiToken);
  }

  sendNewResultsForSubscription(attributes: {
    subscription: Subscription;
    newResults: ReadonlyArray<SearchResult>;
  }): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void> {
    return TaskEither.right(undefined);
  }
}
