import { Trial } from "./Trial";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericError, GenericErrorType } from "../errors";

import { TrialRepository } from "./TrialRepository";
import { TrialId } from "./TrialId";

export class InMemoryTrialRepository implements TrialRepository {
  entities: Map<TrialId, Trial> = new Map();

  findAllTrials(): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<Trial>
  > {
    return TaskEither.right(Array.from(this.entities.values()));
  }

  store(trials: ReadonlyArray<Trial>) {
    trials.forEach(trial => this.entities.set(trial.trialId, trial));
  }
}
