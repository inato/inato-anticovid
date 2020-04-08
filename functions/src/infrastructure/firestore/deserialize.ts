import * as decod from 'decod';
import * as Either from 'fp-ts/lib/Either';
import * as Option from 'fp-ts/lib/Option';
import { firestore } from 'firebase-admin';

import {
  EmailAddress,
  Subscription,
  toTrialId,
  toSubscriptionId,
} from '../../domain';
import { invalidInformationError } from '../../domain/errors';

const decodeTrialId = (value: unknown) => toTrialId(decod.string(value));

const decodeEmail = (email: unknown) =>
  EmailAddress.unsafeParse(decod.string(email));

const decodeSearchQuery = (searchQuery: unknown) =>
  Option.fromNullable(decod.optional(decod.string)(searchQuery) || null);

const decodeSearch = (search: unknown) => ({
  searchQuery: decod.at('search_query', decodeSearchQuery)(search),
  facetFilters: decod.props({
    recruitmentStatus: decod.at(
      'recruitment_status',
      decod.array(decod.string),
    ),
    therapeuticClasses: decod.at(
      'therapeutic_classes',
      decod.array(decod.string),
    ),
    clinicalOutcomesExtracted: decod.at(
      'clinical_outcomes_extracted',
      decod.array(decod.string),
    ),
    surrogateOutcomesExtracted: decod.at(
      'surrogate_outcomes_extracted',
      decod.array(decod.string),
    ),
    studyTypes: decod.at('study_types', decod.array(decod.string)),
    countries: decod.at('countries', decod.array(decod.string)),
    hasResultsPublications: decod.at(
      'has_results_publications',
      decod.nullable(decod.boolean),
    ),
  })(search),
});
const decodeTimestamp = (timestamp: unknown) =>
  (timestamp as firestore.Timestamp).toDate();

const unsafeDeserialize = (
  documentId: string,
  document: { [key: string]: unknown },
) =>
  new Subscription({
    id: toSubscriptionId(documentId),
    ...decod.props({
      email: decod.at('email', decodeEmail),
      lastEmailSentDate: decod.at('last_email_sent_date', decodeTimestamp),
      search: decod.at('search', decodeSearch),
      searchResults: decod.at('search_results', decod.array(decodeTrialId)),
    })(document),
  });

export const deserialize = (
  documentId: string,
  document: { [key: string]: unknown },
) =>
  Either.tryCatch(
    () => unsafeDeserialize(documentId, document),
    e =>
      invalidInformationError(
        e instanceof Error ? e.message : 'Invalid document from firebase',
      ),
  );
