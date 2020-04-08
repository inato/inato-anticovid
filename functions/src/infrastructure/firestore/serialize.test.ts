import { v4 as uuid } from "uuid";
import * as Option from "fp-ts/lib/Option";

import { trialIdFactory, Subscription, subscriptionIdFactory, EmailAddress, facetFiltersFactory, FacetFilters } from "../../domain";
import { serialize } from "./serialize";

const setupUseCase = ({ facetFilters }: Partial<{
  facetFilters: Partial<FacetFilters>
}> = {}) => {
  const id = uuid();
  const date = new Date();
  const email = "user@inato.com";

  const search = {
    searchQuery: Option.none,
    facetFilters: facetFiltersFactory(facetFilters)
  };

  const subscription = new Subscription(
    {
      id: subscriptionIdFactory(id),
      email: EmailAddress.unsafe_parse(email),
      search,
      searchResults: [trialIdFactory("trialId")],
      lastEmailSentDate: date,
    }
  )

  return {
    email,
    date,
    simplifiedUseCase: () => serialize(subscription)
  };
}

describe('deserialize', () => {
  it('should serialize a Subscription into a firestore document', () => {
    const { simplifiedUseCase, email, date } = setupUseCase();

    expect(simplifiedUseCase()).toStrictEqual({
      email,
      last_email_sent_date: date,
      search: {
        clinical_outcomes_extracted: [],
        countries: [],
        has_results_publications: null,
        recruitment_status: [],
        search_query: "",
        study_types: [],
        surrogate_outcomes_extracted: [],
        therapeutic_classes: [],
      },
      search_results: ["trialId"],
    });
  });

  it('should serialize a Subscription that has results publications', () => {
    const {
      simplifiedUseCase,
      email,
      date
    } = setupUseCase({ facetFilters: { hasResultsPublications: true } });

    expect(simplifiedUseCase()).toStrictEqual({
      email,
      last_email_sent_date: date,
      search: {
        clinical_outcomes_extracted: [],
        countries: [],
        has_results_publications: true,
        recruitment_status: [],
        search_query: "",
        study_types: [],
        surrogate_outcomes_extracted: [],
        therapeutic_classes: [],
      },
      search_results: ["trialId"],
    });
  });
});
