/* tslint:disable:no-empty */

import { IndexingService } from "./IndexingService";
import { Trial } from "../../domain";

export const indexingServiceFactory = ({
  indexTrials = async (trials: ReadonlyArray<Trial>) =>
    trials.map(trial => trial.trialId),
  setSettings = async () => {}
}: Partial<IndexingService> = {}) => ({
  indexTrials,
  setSettings
});
