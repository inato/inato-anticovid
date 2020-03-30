import { IndexingService } from "../../application";
import { Trial } from "../../domain";
import { serialize } from "./serialize";
import { SearchIndex } from "algoliasearch";

export class AlgoliaIndexingService implements IndexingService {
  constructor(private readonly algoliaIndex: SearchIndex) {}

  async indexTrials(trials: ReadonlyArray<Trial>) {
    const result = await this.algoliaIndex.replaceAllObjects(
      trials.map(trial => serialize(trial)),
      {
        safe: true,
        batchSize: 50
      }
    );
    return result.objectIDs;
  }

  async setSettings({
    searchableAttributes,
    attributesForFaceting,
    customRanking
  }: {
    searchableAttributes: ReadonlyArray<string>;
    attributesForFaceting: ReadonlyArray<string>;
    customRanking: ReadonlyArray<string>;
  }) {
    await this.algoliaIndex.setSettings({
      searchableAttributes,
      attributesForFaceting,
      customRanking
    });
  }
}
