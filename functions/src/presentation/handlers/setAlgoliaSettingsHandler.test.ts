import { setAlgoliaSettingsHandler } from "./setAlgoliaSettingsHandler";
import { indexingServiceFactory } from "../../application";
import { requestFactory, responseFactory } from "../factories";

describe("setAlgoliaSettingsHandler", () => {
  it("should answer that settings have been set", async () => {
    const handler = setAlgoliaSettingsHandler({
      indexingService: indexingServiceFactory()
    });
    const send = jest.fn();
    await handler(requestFactory(), responseFactory({ send }));

    expect(send).toHaveBeenCalledWith("Algolia settings have been set");
  });
});
