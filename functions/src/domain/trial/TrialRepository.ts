import * as TaskEither from 'fp-ts/lib/TaskEither';

import { GenericErrorType, GenericError } from '../errors';

import { Trial } from './Trial';

export interface TrialRepository {
  findAllTrials(): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<Trial>
  >;
}
