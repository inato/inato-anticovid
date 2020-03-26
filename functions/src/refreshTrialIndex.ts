import { IndexingService } from "./application";
import { TrialRepository } from "./domain";

export const refreshTrialIndex = async ({
  indexingService,
  trialRepository
}: {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
}) => {
  const trials = await trialRepository.findAllTrials();
  console.log(`Found ${trials.length} trials`);
  const indexedObjectIds = await indexingService.indexTrials(trials);
  return indexedObjectIds.length;
};
