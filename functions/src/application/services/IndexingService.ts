import { Trial } from "../../domain";

export interface IndexingService {
  indexTrials(trials: ReadonlyArray<Trial>): Promise<readonly string[]>;
  setSettings(attributes: {
    searchableAttributes: ReadonlyArray<string>;
    attributesForFaceting: ReadonlyArray<string>;
    customRanking: ReadonlyArray<string>;
  }): Promise<void>;
}
