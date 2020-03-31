import { TrialRepository } from "./TrialRepository";
import * as TaskEither from "fp-ts/lib/TaskEither";

export const trialRepositoryFactory = ({
  findAllTrials = () => TaskEither.right([])
}: Partial<TrialRepository> = {}): TrialRepository => ({
  findAllTrials
});
