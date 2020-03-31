import { Trial } from "../../domain";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { GenericErrorType, GenericError } from "../../domain/errors";
import { Option } from "fp-ts/lib/Option";

export interface FacetFilters {
  recruitment_status: Array<string>;
  therapeutic_classes: Array<string>;
  clinical_outcome_extracted_: Array<string>;
  surrogate_outcome_extracted_: Array<string>;
  study_type: Array<string>;
  countries: Array<string>;
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
  searchTrials({
    searchQuery,
    facetFilters
  }: {
    searchQuery: Option<string>;
    facetFilters: Partial<FacetFilters>;
  }): TaskEither.TaskEither<
    GenericError<GenericErrorType.UnknownError>,
    ReadonlyArray<string>
  >;
}
