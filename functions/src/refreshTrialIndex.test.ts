import { refreshTrialIndex } from "./refreshTrialIndex";
import { trialFactory, trialRepositoryFactory } from "./domain";
import { indexingServiceFactory } from "./application";

describe("refreshTrialIndex", () => {
  it("should index all trials found in the repository", async () => {
    const trial = trialFactory();
    const trials = [trial];
    const trialRepository = trialRepositoryFactory({
      findAllTrials: () => Promise.resolve(trials)
    });
    const indexTrials = jest.fn().mockReturnValue([trial.trialId]);
    const indexingService = indexingServiceFactory({
      indexTrials
    });
    const count = await refreshTrialIndex({ trialRepository, indexingService });
    expect(count).toEqual(1);
    expect(indexTrials).toHaveBeenCalledWith(trials);
  });
});
