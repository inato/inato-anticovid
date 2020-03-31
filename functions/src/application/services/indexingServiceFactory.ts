/* tslint:disable:no-empty */
import * as TaskEither from "fp-ts/lib/TaskEither";

import { IndexingService } from "./IndexingService";
import { Trial } from "../../domain";

export const indexingServiceFactory = ({
  indexTrials = (trials: ReadonlyArray<Trial>) =>
    TaskEither.right(trials.map(trial => trial.trialId)),
  setSettings = () => TaskEither.right(undefined)
}: Partial<IndexingService> = {}): IndexingService => ({
  indexTrials,
  setSettings
});
