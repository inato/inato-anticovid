import { IndexingService } from "./IndexingService";

export const indexingServiceFactory = ({
  indexTrials = () => Promise.resolve(),
  setSearchableAttributes = () => Promise.resolve()
}: Partial<IndexingService> = {}) => ({
  indexTrials,
  setSearchableAttributes
});
