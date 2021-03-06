import * as TaskEither from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';

import { TrialRepository } from '../../domain';
import { LoggingService } from '../services';

import { IndexingService } from '..';

export const refreshTrialIndex = ({
  indexingService,
  trialRepository,
  loggingService,
}: {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
  loggingService: LoggingService;
}) =>
  pipe(
    trialRepository.findAllTrials(),
    TaskEither.chain(trials => {
      loggingService.log(`Found ${trials.length} trials`);
      return indexingService.indexTrials(trials);
    }),
    TaskEither.map(indexedObjectIds => indexedObjectIds.length),
  );
