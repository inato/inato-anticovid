import { refreshAlgoliaTrialIndexHandler } from "./refreshAlgoliaTrialIndexHandler";
import { trialRepositoryFactory, trialFactory } from "../../domain";
import { indexingServiceFactory } from "../../application";
import { requestFactory, responseFactory } from "../factories";
import * as TaskEither from "fp-ts/lib/TaskEither";

describe("refreshAlgoliaTrialIndexHandler", () => {
  it("should answer number of trials indexed", async () => {
    const handler = refreshAlgoliaTrialIndexHandler({
      trialRepository: trialRepositoryFactory({
        findAllTrials: () => TaskEither.right([trialFactory(), trialFactory()])
      }),
      indexingService: indexingServiceFactory()
    });
    const send = jest.fn();
    await handler(requestFactory(), responseFactory({ send }));

    expect(send).toHaveBeenCalledWith("Indexed 2 trials");
  });
});
