import { refreshTrialIndex } from "./refreshTrialIndex";
import { trialFactory, trialRepositoryFactory } from "./domain";
import { indexingServiceFactory } from "./application";

describe("refreshTrialIndex", () => {
  it("should index all trials found in the repository", async () => {
    const trials = [trialFactory()];
    const trialRepository = trialRepositoryFactory({
      findAllTrials: () => Promise.resolve(trials)
    });
    const indexTrials = jest.fn();
    const indexingService = indexingServiceFactory({
      indexTrials
    });
    await refreshTrialIndex({ trialRepository, indexingService });
    expect(indexTrials).toHaveBeenCalledWith(trials);
  });
});
