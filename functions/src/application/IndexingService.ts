import { Trial } from "../domain";

export interface IndexingService {
  indexTrials(trials: Array<Trial>): Promise<readonly string[]>;
  setSettings(attributes: {
    searchableAttributes: ReadonlyArray<string>;
    attributesForFaceting: ReadonlyArray<string>;
  }): Promise<void>;
}
