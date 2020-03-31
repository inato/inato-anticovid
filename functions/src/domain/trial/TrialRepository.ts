import { Trial } from "./Trial";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericErrorType, GenericError } from "../errors";

export interface TrialRepository {
  findAllTrials(): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<Trial>
  >;
}
