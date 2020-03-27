import { IndexingService } from "./IndexingService";

export const indexingServiceFactory = ({
  indexTrials = () => Promise.resolve([]),
  setSettings = () => Promise.resolve()
}: Partial<IndexingService> = {}) => ({
  indexTrials,
  setSettings
});
