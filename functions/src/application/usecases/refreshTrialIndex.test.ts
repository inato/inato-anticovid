import { refreshTrialIndex } from "./refreshTrialIndex";
import { trialFactory, trialRepositoryFactory } from "../../domain";
import { indexingServiceFactory } from "..";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Either from "fp-ts/lib/Either";

describe("refreshTrialIndex", () => {
  it("should index all trials found in the repository", async () => {
    const trial = trialFactory();
    const trials = [trial];
    const trialRepository = trialRepositoryFactory({
      findAllTrials: () => TaskEither.right(trials)
    });
    const indexTrials = jest
      .fn()
      .mockReturnValue(TaskEither.right([trial.trialId]));
    const indexingService = indexingServiceFactory({
      indexTrials
    });
    const count = await refreshTrialIndex({
      trialRepository,
      indexingService
    })();
    expect(count).toEqual(Either.right(1));
    expect(indexTrials).toHaveBeenCalledWith(trials);
  });
});
