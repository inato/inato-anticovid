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
  const trialsCount = trials.length;
  console.log(`Found ${trialsCount} trials`);

  await indexingService.indexTrials(trials);
  return trialsCount;
};
