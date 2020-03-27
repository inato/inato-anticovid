import { TrialRepository } from "./TrialRepository";

export const trialRepositoryFactory = ({
  findAllTrials = () => Promise.resolve([])
}: Partial<TrialRepository> = {}) => ({
  findAllTrials
});
