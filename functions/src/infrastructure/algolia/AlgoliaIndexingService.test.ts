import { AlgoliaIndexingService } from "./AlgoliaIndexingService";

describe("AlgoliaIndexingService", () => {
  describe("setSearchableAttributes", () => {
    it("should call setSettings index method", async () => {
      const indexMock: any = {
        setSettings: jest.fn()
      };
      const indexingService = new AlgoliaIndexingService(indexMock);
      await indexingService.setSettings({
        searchableAttributes: ["attribute1"],
        attributesForFaceting: []
      });
      expect(indexMock.setSettings).toHaveBeenCalledWith({
        searchableAttributes: ["attribute1"],
        attributesForFaceting: []
      });
    });
  });
});
