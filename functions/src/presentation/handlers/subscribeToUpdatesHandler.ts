import * as functions from 'firebase-functions';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TaskEither from 'fp-ts/lib/TaskEither';
import * as Either from 'fp-ts/lib/Either';
import * as Task from 'fp-ts/lib/Task';
import * as decod from 'decod';
import * as Option from 'fp-ts/lib/Option';

import { SubscriptionRepository, EmailAddress } from '../../domain';
import {
  IndexingService,
  subscribeToUpdates,
  ReportingService,
} from '../../application';
import { invalidInformationError } from '../../domain/errors';
import { taskEitherExtend } from '../../domain/utils/taskEither';

export const subscribeToUpdatesHandler = ({
  subscriptionRepository,
  indexingService,
  reportingService,
}: {
  subscriptionRepository: SubscriptionRepository;
  indexingService: IndexingService;
  reportingService: ReportingService;
}) => async (
  request: functions.https.Request,
  response: functions.Response<any>,
) =>
  pipe(
    request,
    parseQueryString,
    TaskEither.fromEither,
    taskEitherExtend(query =>
      subscribeToUpdates({
        indexingService,
        subscriptionRepository,
        searchState: {
          searchQuery: query.searchQuery,
          facetFilters: query.facetFilters,
        },
        email: query.email,
      }),
    ),
    TaskEither.fold(
      e => {
        reportingService.reportError(e.toError());
        response.status(500).send(e.reason);
        return Task.of(undefined);
      },
      () => {
        response.sendStatus(204);
        return Task.of(undefined);
      },
    ),
  )();

const parseQueryString = ({ query }: functions.https.Request) =>
  Either.tryCatch(
    () => ({
      email: decod.at('email', decodeEmailAddress)(query),
      searchQuery: decod.at('searchQuery', decodeSearchQuery)(query),
      facetFilters: decod.props({
        recruitmentStatus: decod.at(
          'recruitment_status',
          decodeOptionalArrayOfString,
        ),
        therapeuticClasses: decod.at(
          'therapeutic_classes',
          decodeOptionalArrayOfString,
        ),
        clinicalOutcomesExtracted: decod.at(
          'clinical_outcome_extracted_',
          decodeOptionalArrayOfString,
        ),
        surrogateOutcomesExtracted: decod.at(
          'surrogate_outcome_extracted_',
          decodeOptionalArrayOfString,
        ),
        studyTypes: decod.at('study_type', decodeOptionalArrayOfString),
        countries: decod.at('countries', decodeOptionalArrayOfString),
        hasResultsPublications: decod.at(
          'has_results_publications',
          decodeHasResultsPublications,
        ),
        totalRecruitmentSize: decod.at(
          'total_recruitment_size',
          decodeOptionalRangeValues,
        ),
      })(query),
    }),
    e =>
      invalidInformationError(
        e instanceof Error ? e.message : 'Invalid query error',
      ),
  );

const decodeOptionalArrayOfString = (array: unknown) =>
  decod.optional(decod.array(decod.string))(array) || [];

const decodeOptionalRangeValues = (range: unknown) =>
  decod.optional(
    decod.props({
      min: (value: unknown) =>
        decod.at('min', decod.optional(decod.number))(value) ?? undefined,
      max: (value: unknown) =>
        decod.at('max', decod.optional(decod.number))(value) ?? undefined,
    }),
  )(range) ?? { min: undefined, max: undefined };

const decodeEmailAddress = (email: unknown) =>
  EmailAddress.unsafeParse(decod.string(email));

const decodeSearchQuery = (searchQuery: unknown) =>
  Option.fromNullable(decod.optional(decod.string)(searchQuery));

const decodeHasResultsPublications = (hasResultsPublicationsQuery: unknown) => {
  switch (hasResultsPublicationsQuery) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
};
