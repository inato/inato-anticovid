import * as TaskEither from 'fp-ts/lib/TaskEither';

import { Subscription } from '../../domain';
import { GenericError, GenericErrorType } from '../../domain/errors';

import { SearchResult } from './IndexingService';

export interface EmailService {
  sendNewResultsForSubscription(attributes: {
    subscription: Subscription;
    newResults: ReadonlyArray<SearchResult>;
  }): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void>;
}
