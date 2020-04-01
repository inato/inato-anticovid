import * as TaskEither from "fp-ts/lib/TaskEither";

import { IndexingService, FacetFilters } from "./IndexingService";
import { Trial } from "../../domain";
import { Option } from "fp-ts/lib/Option";

export const indexingServiceFactory = ({
  indexTrials = (trials: ReadonlyArray<Trial>) =>
    TaskEither.right(trials.map(trial => trial.trialId)),
  setSettings = () => TaskEither.right(undefined),
  searchTrials = ({
    searchQuery,
    facetFilters
  }: {
    searchQuery: Option<string>;
    facetFilters: Partial<FacetFilters>;
  }) => TaskEither.right([])
}: Partial<IndexingService> = {}): IndexingService => ({
  indexTrials,
  setSettings,
  searchTrials
});
