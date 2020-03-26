import { refreshTrialIndex } from "./refreshTrialIndex";
import { trialFactory, trialRepositoryFactory } from "./domain";

describe("refreshTrialIndex", () => {
  it("should index all trials found in the repository", async () => {
    const trials = [trialFactory()];
    const trialRepository = trialRepositoryFactory({
      findAllTrials: () => Promise.resolve(trials)
    });
    const indexingService: any = {
      indexTrials: jest.fn()
    };
    await refreshTrialIndex({ trialRepository, indexingService });
    expect(indexingService.indexTrials).toHaveBeenCalledWith(trials);
  });
});
