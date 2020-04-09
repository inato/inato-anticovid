import { SearchIndex } from 'algoliasearch';
import * as TaskEither from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import * as Option from 'fp-ts/lib/Option';

import {
  unknownError,
  GenericErrorType,
  GenericError,
} from '../../domain/errors';
import { Trial, FacetFilters, Facets } from '../../domain';
import { IndexingService, SearchResult } from '../../application';
import { taskEitherExtend } from '../../domain/utils/taskEither';

import { deserializeSearchTrialsHits } from './deserialize';
import { serialize } from './serialize';

const HITS_PER_PAGE = 100;

export class AlgoliaIndexingService implements IndexingService {
  private readonly algoliaIndex: SearchIndex;

  constructor(algoliaIndex: SearchIndex) {
    this.algoliaIndex = algoliaIndex;
  }

  indexTrials(
    trials: ReadonlyArray<Trial>,
    { wait = false }: { wait?: boolean } = {},
  ) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () => {
            const result = this.algoliaIndex.replaceAllObjects(
              trials.map(trial => serialize(trial)),
              {
                safe: false,
                batchSize: 50,
              },
            );

            if (wait) {
              return result.wait();
            }
            return result;
          })(),
        e =>
          unknownError(
            e instanceof Error
              ? e.message
              : 'Unknown algolia replacing all objects error',
          ),
      ),
      TaskEither.map(({ objectIDs }) => objectIDs),
    );
  }

  setSettings({
    searchableAttributes,
    attributesForFaceting,
    customRanking,
  }: {
    searchableAttributes: ReadonlyArray<{
      name: string;
      unordered?: boolean;
    }>;
    attributesForFaceting: ReadonlyArray<{
      name: Facets;
      searchable?: boolean;
    }>;
    customRanking: ReadonlyArray<{
      name: string;
      orderBy: 'asc' | 'desc';
    }>;
  }) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () =>
            this.algoliaIndex.setSettings({
              searchableAttributes: searchableAttributes.map(
                ({ name, unordered }) =>
                  unordered ? `unordered(${name})` : name,
              ),
              attributesForFaceting: attributesForFaceting.map(
                ({ name, searchable }) =>
                  searchable ? `searchable(${name})` : name,
              ),
              customRanking: customRanking.map(
                ({ name, orderBy }) => `${orderBy}(${name})`,
              ),
            }))(),
        e =>
          unknownError(
            e instanceof Error
              ? e.message
              : 'Unknown algolia set settings error',
          ),
      ),
      TaskEither.map(() => undefined),
    );
  }

  searchTrials({
    searchQuery,
    facetFilters,
    startPage = 0,
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
                Option.getOrElse(() => ''),
              ),
              {
                page: startPage,
                hitsPerPage: HITS_PER_PAGE,
                facetFilters: serializeFacetFilters(facetFilters),
                attributesToRetrieve: [
                  'objectID',
                  'public_title',
                  'registration_timestamp',
                ],
              },
            ))(),
        e =>
          unknownError(
            e instanceof Error ? e.message : 'Unknown algolia search error',
          ),
      ),
      taskEitherExtend(response => {
        const hitsTask = TaskEither.fromEither(
          deserializeSearchTrialsHits(response.hits),
        );
        if (response.nbPages > startPage + 1) {
          return pipe(
            this.searchTrials({
              searchQuery,
              facetFilters,
              startPage: startPage + 1,
            }),
            taskEitherExtend(newHits =>
              pipe(
                hitsTask,
                TaskEither.map(hits => [...hits, ...newHits]),
              ),
            ),
          );
        }
        return hitsTask;
      }),
    );
  }
}

const serializeFacetFilters = ({
  recruitmentStatus = [],
  therapeuticClasses = [],
  clinicalOutcomesExtracted = [],
  surrogateOutcomesExtracted = [],
  studyTypes = [],
  countries = [],
  hasResultsPublications,
}: FacetFilters) => {
  const facetFilters = [
    recruitmentStatus.map(status => `${Facets.recruitmentStatus}:${status}`),
    therapeuticClasses.map(
      therapeuticClass => `${Facets.therapeuticClasses}:${therapeuticClass}`,
    ),
    clinicalOutcomesExtracted.map(
      clinicalOutcomeExtracted =>
        `${Facets.clinicalOutcomeExtracted}:${clinicalOutcomeExtracted}`,
    ),
    surrogateOutcomesExtracted.map(
      surrogateOutcomeExtracted =>
        `${Facets.surrogateOutcomeExtracted}:${surrogateOutcomeExtracted}`,
    ),
    studyTypes.map(studyType => `${Facets.studyType}:${studyType}`),
    countries.map(country => `${Facets.countries}:${country}`),
  ];

  if (hasResultsPublications !== null) {
    facetFilters.push([
      `${Facets.hasResultsPublications}:${hasResultsPublications}`,
    ]);
  }

  return facetFilters;
};
