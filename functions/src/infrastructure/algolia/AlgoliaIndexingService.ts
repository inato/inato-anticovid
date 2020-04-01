import { IndexingService, FacetFilters } from "../../application";
import { Trial } from "../../domain";
import { serialize } from "./serialize";
import { SearchIndex } from "algoliasearch";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { unknownError } from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";
import { deserializeSearchTrialsResponse } from "./deserialize";
import { Option, getOrElse } from "fp-ts/lib/Option";

export class AlgoliaIndexingService implements IndexingService {
  constructor(private readonly algoliaIndex: SearchIndex) {}

  indexTrials(trials: ReadonlyArray<Trial>) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () =>
            this.algoliaIndex.replaceAllObjects(
              trials.map(trial => serialize(trial)),
              {
                safe: true,
                batchSize: 50
              }
            ))(),
        e =>
          unknownError(
            e instanceof Error
              ? e.message
              : "Unknown algolia replacing all objects error"
          )
      ),
      TaskEither.map(({ objectIDs }) => objectIDs)
    );
  }

  setSettings({
    searchableAttributes,
    attributesForFaceting,
    customRanking
  }: {
    searchableAttributes: ReadonlyArray<string>;
    attributesForFaceting: ReadonlyArray<string>;
    customRanking: ReadonlyArray<string>;
  }) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () =>
            this.algoliaIndex.setSettings({
              searchableAttributes,
              attributesForFaceting,
              customRanking
            }))(),
        e =>
          unknownError(
            e instanceof Error
              ? e.message
              : "Unknown algolia set settings error"
          )
      ),
      TaskEither.map(() => undefined)
    );
  }

  searchTrials({
    searchQuery,
    facetFilters
  }: {
    searchQuery: Option<string>;
    facetFilters: Partial<FacetFilters>;
  }) {
    const facetFiltersToSearch = serializeFacetFilters(facetFilters);
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () =>
            this.algoliaIndex.search(getOrElse(() => "")(searchQuery), {
              facetFiltersToSearch,
              attributesToRetrieve: ["objectID"]
            }))(),
        e =>
          unknownError(
            e instanceof Error ? e.message : "Unknown algolia search error"
          )
      ),
      TaskEither.map(response => deserializeSearchTrialsResponse(response.hits))
    );
  }
}

const serializeFacetFilters = ({
  recruitment_status = [],
  therapeutic_classes = [],
  clinical_outcome_extracted_ = [],
  surrogate_outcome_extracted_ = [],
  study_type = [],
  countries = []
}: Partial<FacetFilters>) => {
  return [
    recruitment_status.map(
      recruitmentStatus => `recruitment_status:${recruitmentStatus}`
    ),
    therapeutic_classes.map(
      therapeuticClass => `therapeutic_classes:${therapeuticClass}`
    ),
    clinical_outcome_extracted_.map(
      clinicalOutcomeExtracted =>
        `clinical_outcome_extracted_:${clinicalOutcomeExtracted}`
    ),
    surrogate_outcome_extracted_.map(
      surrogateOutcomeExtracted =>
        `surrogate_outcome_extracted_:${surrogateOutcomeExtracted}`
    ),
    study_type.map(studyType => `study_type:${studyType}`),
    countries.map(country => `countries:${country}`)
  ];
};
