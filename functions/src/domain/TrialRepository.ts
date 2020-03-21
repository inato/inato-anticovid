import { Trial } from "./Trial";

export interface TrialRepository {
  findAllTrials(): Promise<Array<Trial>>;
}
