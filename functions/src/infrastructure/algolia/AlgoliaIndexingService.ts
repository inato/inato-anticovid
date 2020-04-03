import { IndexingService, SearchResult } from "../../application";
import { Trial, FacetFilters, Facets } from "../../domain";
import { serialize } from "./serialize";
import { SearchIndex } from "algoliasearch";
import * as TaskEither from "fp-ts/lib/TaskEither";
import {
  unknownError,
  GenericErrorType,
  GenericError
} from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";
import { deserializeSearchTrialsHits } from "./deserialize";
import * as Option from "fp-ts/lib/Option";
import { taskEitherExtend } from "../../domain/utils/taskEither";

const HITS_PER_PAGE = 100;

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
    facetFilters,
    startPage = 0
  }: {
    searchQuery: Option.Option<string>;
    facetFilters: FacetFilters;
    startPage?: number;
  }): TaskEither.TaskEither<
    GenericError<
      GenericErrorType.UnknownError | GenericErrorType.InvalidInformationError
    >,
    ReadonlyArray<SearchResult>
  > {
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () =>
            this.algoliaIndex.search(
              pipe(
                searchQuery,
                Option.getOrElse(() => "")
              ),
              {
                page: startPage,
                hitsPerPage: HITS_PER_PAGE,
                facetFilters: serializeFacetFilters(facetFilters),
                attributesToRetrieve: ["objectID", "public_title"]
              }
            ))(),
        e =>
          unknownError(
            e instanceof Error ? e.message : "Unknown algolia search error"
          )
      ),
      taskEitherExtend(response => {
        const hitsTask = TaskEither.fromEither(
          deserializeSearchTrialsHits(response.hits)
        );
        if (response.nbPages > startPage + 1) {
          return pipe(
            this.searchTrials({
              searchQuery,
              facetFilters,
              startPage: startPage + 1
            }),
            taskEitherExtend(newHits =>
              pipe(
                hitsTask,
                TaskEither.map(hits => [...hits, ...newHits])
              )
            )
          );
        }
        return hitsTask;
      })
    );
  }
}

const serializeFacetFilters = ({
  recruitmentStatus = [],
  therapeuticClasses = [],
  clinicalOutcomesExtracted = [],
  surrogateOutcomesExtracted = [],
  studyTypes = [],
  countries = []
}: FacetFilters) => {
  return [
    recruitmentStatus.map(status => `${Facets.recruitmentStatus}:${status}`),
    therapeuticClasses.map(
      therapeuticClass => `${Facets.therapeuticClasses}:${therapeuticClass}`
    ),
    clinicalOutcomesExtracted.map(
      clinicalOutcomeExtracted =>
        `${Facets.clinicalOutcomeExtracted}:${clinicalOutcomeExtracted}`
    ),
    surrogateOutcomesExtracted.map(
      surrogateOutcomeExtracted =>
        `${Facets.surrogateOutcomeExtracted}:${surrogateOutcomeExtracted}`
    ),
    studyTypes.map(studyType => `${Facets.studyType}:${studyType}`),
    countries.map(country => `${Facets.countries}:${country}`)
  ];
};
