import { IndexingService } from "..";
import { TrialRepository } from "../../domain";

import * as TaskEither from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/pipeable";

export const refreshTrialIndex = ({
  indexingService,
  trialRepository
}: {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
}) =>
  pipe(
    trialRepository.findAllTrials(),
    TaskEither.chain(trials => {
      console.log(`Found ${trials.length} trials`);
      return indexingService.indexTrials(trials);
    }),
    TaskEither.map(indexedObjectIds => indexedObjectIds.length)
  );
