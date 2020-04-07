import { setAlgoliaSettingsHandler } from "./setAlgoliaSettingsHandler";
import {
  indexingServiceFactory,
  reportingServiceFactory
} from "../../application";
import { requestFactory, responseFactory } from "../factories";

describe("setAlgoliaSettingsHandler", () => {
  it("should answer that settings have been set", async () => {
    const handler = setAlgoliaSettingsHandler({
      indexingService: indexingServiceFactory(),
      reportingService: reportingServiceFactory()
    });
    const send = jest.fn();
    await handler(requestFactory(), responseFactory({ send }));

    expect(send).toHaveBeenCalledWith("Algolia settings have been set");
  });
});
