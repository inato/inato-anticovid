import { refreshAlgoliaTrialIndexHandler } from "./refreshAlgoliaTrialIndexHandler";
import {
  trialFactory,
  InMemoryTrialRepository,
  trialIdFactory
} from "../../domain";
import { indexingServiceFactory } from "../../application";
import { requestFactory, responseFactory } from "../factories";

describe("refreshAlgoliaTrialIndexHandler", () => {
  it("should answer number of trials indexed", async () => {
    const trialRepository = new InMemoryTrialRepository();
    trialRepository.store([
      trialFactory({ trialId: trialIdFactory("trialId1") }),
      trialFactory({ trialId: trialIdFactory("trialId2") })
    ]);
    const handler = refreshAlgoliaTrialIndexHandler({
      trialRepository,
      indexingService: indexingServiceFactory()
    });
    const send = jest.fn();
    await handler(requestFactory(), responseFactory({ send }));

    expect(send).toHaveBeenCalledWith("Indexed 2 trials");
  });
});
