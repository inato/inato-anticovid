import * as TaskEither from 'fp-ts/lib/TaskEither';

import { Trial } from '../../domain/trial';

import { IndexingService } from './IndexingService';

export const indexingServiceFactory = ({
  indexTrials = (trials: ReadonlyArray<Trial>) =>
    TaskEither.right(trials.map(trial => trial.trialId)),
  setSettings = () => TaskEither.right(undefined),
  searchTrials = () => TaskEither.right([]),
}: Partial<IndexingService> = {}): IndexingService => ({
  indexTrials,
  setSettings,
  searchTrials,
});
