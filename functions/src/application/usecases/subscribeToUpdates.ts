import { pipe } from "fp-ts/lib/pipeable";
import * as Option from "fp-ts/lib/Option";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { IndexingService } from "../services";
import {
  EmailAddress,
  Subscription,
  SubscriptionRepository,
  FacetFilters
} from "../../domain";
import { taskEitherExtend } from "../../domain/utils/taskEither";

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
    facetFilters: FacetFilters;
  };
  email: EmailAddress;
}) =>
  pipe(
    searchState,
    indexingService.searchTrials,
    taskEitherExtend(trialIds =>
      subscriptionRepository.store(
        Subscription.build({
          email,
          search: searchState,
          searchResults: trialIds
        })
      )
    )
  );
