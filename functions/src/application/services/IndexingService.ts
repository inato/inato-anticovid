import { Trial, TrialId, FacetFilters } from "../../domain/trial";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericErrorType, GenericError } from "../../domain/errors";
import { Option } from "fp-ts/lib/Option";

export interface SearchResult {
  trialId: TrialId;
  publicTitle: string;
  registrationDate: Date;
}

export interface IndexingService {
  indexTrials(
    trials: ReadonlyArray<Trial>
  ): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<string>
  >;
  setSettings(attributes: {
    searchableAttributes: ReadonlyArray<string>;
    attributesForFaceting: ReadonlyArray<string>;
    customRanking: ReadonlyArray<string>;
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
