import { TrialRepository } from "./TrialRepository";

export const trialRepositoryFactory = ({
  findAllTrials = async () => []
}: Partial<TrialRepository> = {}): TrialRepository => ({
  findAllTrials
});
