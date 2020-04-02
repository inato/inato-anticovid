import * as TaskEither from "fp-ts/lib/TaskEither";

import { IndexingService } from "./IndexingService";
import { Trial, FacetFilters } from "../../domain/trial";
import { Option } from "fp-ts/lib/Option";

export const indexingServiceFactory = ({
  indexTrials = (trials: ReadonlyArray<Trial>) =>
    TaskEither.right(trials.map(trial => trial.trialId)),
  setSettings = () => TaskEither.right(undefined),
  searchTrials = (_props: {
    searchQuery: Option<string>;
    facetFilters: FacetFilters;
  }) => TaskEither.right([])
}: Partial<IndexingService> = {}): IndexingService => ({
  indexTrials,
  setSettings,
  searchTrials
});
