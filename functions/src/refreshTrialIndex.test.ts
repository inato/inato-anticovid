import { refreshTrialIndex } from "./refreshTrialIndex";
import { trialFactory } from "./domain";

describe("refreshTrialIndex", () => {
  it("should index all trials found in the repository", async () => {
    const trials = [trialFactory()];
    const trialRepository = {
      findAllTrials() {
        return Promise.resolve(trials);
      }
    };
    const indexingService = {
      indexTrials: jest.fn()
    };
    await refreshTrialIndex({ trialRepository, indexingService });
    expect(indexingService.indexTrials).toHaveBeenCalledWith(trials);
  });
});
