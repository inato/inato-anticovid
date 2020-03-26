import { IndexingService } from "../../application";
import { Trial } from "../../domain";
import { serialize } from "./serialize";
import { SearchIndex } from "algoliasearch";

export class AlgoliaIndexingService implements IndexingService {
  constructor(private readonly algoliaIndex: SearchIndex) {}

  async indexTrials(trials: Array<Trial>) {
    await this.algoliaIndex.replaceAllObjects(
      trials.map(trial => serialize(trial)),
      {
        safe: true,
        batchSize: 50
      }
    );
  }
}
