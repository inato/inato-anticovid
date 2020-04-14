import { v4 as uuid } from 'uuid';
import { firestore } from 'firebase-admin';
import * as Option from 'fp-ts/lib/Option';
import * as Either from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import {
  trialIdFactory,
  Subscription,
  subscriptionIdFactory,
  EmailAddress,
  searchFactory,
  facetFiltersFactory,
} from '../../domain';
import { GenericErrorType } from '../../domain/errors';

import { deserialize } from './deserialize';

const setupUseCase = ({
  search,
}: Partial<{
  search: Partial<{
    recruitment_status: Array<string>;
    therapeutic_classes: Array<string>;
    clinical_outcomes_extracted: Array<string>;
    surrogate_outcomes_extracted: Array<string>;
    study_types: Array<string>;
    countries: Array<string>;
    has_results_publications: boolean | null;
  }>;
}> = {}) => {
  const id = uuid();
  const date = new Date();

  const document = {
    email: 'user@inato.com',
    last_email_sent_date: new firestore.Timestamp(
      Math.floor(date.getTime() / 1000),
      0,
    ),
    search: {
      recruitment_status: [],
      therapeutic_classes: [],
      clinical_outcomes_extracted: [],
      surrogate_outcomes_extracted: [],
      study_types: [],
      countries: [],
      has_results_publications: null,
      total_recruitment_size: { min: undefined, max: undefined },
      ...search,
    },
    search_results: ['trialId'],
  };

  return {
    id,
    date,
    simplifiedUseCase: () => deserialize(id, document),
  };
};

describe('deserialize', () => {
  it('should return an InvalidInformationError error if the one field is missing', () => {
    const { simplifiedUseCase } = setupUseCase({
      search: { has_results_publications: undefined },
    });

    expect(
      pipe(
        simplifiedUseCase(),
        Either.mapLeft(({ type }) => type),
      ),
    ).toStrictEqual(Either.left(GenericErrorType.InvalidInformationError));
  });

  it('should deserialize a firestore document to a Subscription', () => {
    const { simplifiedUseCase, id, date } = setupUseCase();

    expect(simplifiedUseCase()).toStrictEqual(
      Either.right(
        new Subscription({
          id: subscriptionIdFactory(id),
          email: EmailAddress.unsafeParse('user@inato.com'),
          search: searchFactory({ searchQuery: Option.none }),
          searchResults: [trialIdFactory('trialId')],
          lastEmailSentDate: new Date(Math.floor(date.getTime() / 1000) * 1000),
        }),
      ),
    );
  });

  it('should deserialize a document that has results publications', () => {
    const { simplifiedUseCase, id, date } = setupUseCase({
      search: { has_results_publications: true },
    });

    expect(simplifiedUseCase()).toStrictEqual(
      Either.right(
        new Subscription({
          id: subscriptionIdFactory(id),
          email: EmailAddress.unsafeParse('user@inato.com'),
          search: searchFactory({
            searchQuery: Option.none,
            facetFilters: facetFiltersFactory({ hasResultsPublications: true }),
          }),
          searchResults: [trialIdFactory('trialId')],
          lastEmailSentDate: new Date(Math.floor(date.getTime() / 1000) * 1000),
        }),
      ),
    );
  });
});
