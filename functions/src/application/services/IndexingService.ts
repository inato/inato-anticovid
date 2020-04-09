import * as TaskEither from 'fp-ts/lib/TaskEither';
import { Option } from 'fp-ts/lib/Option';

import { Trial, TrialId, FacetFilters, Facets } from '../../domain/trial';
import { GenericErrorType, GenericError } from '../../domain/errors';

export interface SearchResult {
  trialId: TrialId;
  publicTitle: string;
  registrationDate: Date;
}

export interface IndexingService {
  indexTrials(
    trials: ReadonlyArray<Trial>,
  ): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<string>
  >;
  setSettings(attributes: {
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
    attributesToHighlight: ReadonlyArray<string>;
  }): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void>;
  searchTrials(attributes: {
    searchQuery: Option<string>;
    facetFilters: FacetFilters;
    startPage?: number;
  }): TaskEither.TaskEither<
    GenericError<
      GenericErrorType.UnknownError | GenericErrorType.InvalidInformationError
    >,
    ReadonlyArray<SearchResult>
  >;
}
