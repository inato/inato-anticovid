import { uploadToAlgoliaHandler } from "./uploadToAlgoliaHandler";
import { trialRepositoryFactory, trialFactory } from "../../domain";
import { indexingServiceFactory } from "../../application";
import { requestFactory, responseFactory } from "../factories";

describe("uploadToAlgoliaHandler", () => {
  it("should answer number of trials indexed", async () => {
    const handler = uploadToAlgoliaHandler({
      trialRepository: trialRepositoryFactory({
        findAllTrials: async () => [trialFactory(), trialFactory()]
      }),
      indexingService: indexingServiceFactory()
    });
    const send = jest.fn();
    await handler(requestFactory(), responseFactory({ send }));

    expect(send).toHaveBeenCalledWith("Indexed 2 trials");
  });
});
