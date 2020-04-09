import * as TaskEither from 'fp-ts/lib/TaskEither';
import * as Either from 'fp-ts/lib/Either';

import { trialFactory, InMemoryTrialRepository } from '../../domain';
import { loggingServiceFactory } from '../services';

import { refreshTrialIndex } from './refreshTrialIndex';

import { indexingServiceFactory } from '..';

describe('refreshTrialIndex', () => {
  it('should index all trials found in the repository', async () => {
    const trial = trialFactory();
    const trials = [trial];
    const trialRepository = new InMemoryTrialRepository();
    trialRepository.store(trials);

    const indexTrials = jest
      .fn()
      .mockReturnValue(TaskEither.right([trial.trialId]));
    const indexingService = indexingServiceFactory({
      indexTrials,
    });
    const count = await refreshTrialIndex({
      trialRepository,
      indexingService,
      loggingService: loggingServiceFactory(),
    })();
    expect(count).toEqual(Either.right(1));
    expect(indexTrials).toHaveBeenCalledWith(trials);
  });
});
