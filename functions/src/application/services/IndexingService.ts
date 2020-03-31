import { Trial } from "../../domain";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericErrorType, GenericError } from "../../domain/errors";

export interface IndexingService {
  indexTrials(
    trials: ReadonlyArray<Trial>
  ): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<string>
  >;
  setSettings(attributes: {
    searchableAttributes: ReadonlyArray<string>;
    attributesForFaceting: ReadonlyArray<string>;
    customRanking: ReadonlyArray<string>;
  }): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void>;
}
