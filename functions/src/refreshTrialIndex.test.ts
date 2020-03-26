import { Trial } from "./domain";
import { refreshTrialIndex } from "./refreshTrialIndex";

describe("refreshTrialIndex", () => {
  it("should index all trials found in the repository", () => {
    const trialRepository = {
      findAllTrials() {
        return Promise.resolve([]);
      }
    };
    const indexingService = {
      indexTrials(trials: Array<Trial>) {
        return Promise.resolve();
      }
    };
    expect(refreshTrialIndex({ trialRepository, indexingService }));
  });
});
