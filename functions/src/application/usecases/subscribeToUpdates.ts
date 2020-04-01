import { pipe } from "fp-ts/lib/pipeable";
import * as Option from "fp-ts/lib/Option";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { IndexingService, FacetFilters } from "../services";
import {
  EmailAddress,
  Subscription,
  SubscriptionRepository
} from "../../domain";

export const subscribeToUpdates = ({
  indexingService,
  subscriptionRepository,
  searchState,
  email
}: {
  indexingService: IndexingService;
  subscriptionRepository: SubscriptionRepository;
  searchState: {
    searchQuery: Option.Option<string>;
    facetFilters: Partial<FacetFilters>;
  };
  email: EmailAddress;
}) =>
  pipe(
    searchState,
    indexingService.searchTrials,
    TaskEither.map(trialIds =>
      subscriptionRepository.store(
        Subscription.build({
          email,
          search: searchState,
          searchResults: trialIds
        })
      )
    )
  );
