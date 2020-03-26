import { Trial } from "../domain";

export interface IndexingService {
  indexTrials(trials: Array<Trial>): Promise<readonly string[]>;
  setSearchableAttributes(attributes: Array<string>): Promise<void>;
}
