import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { IndexingService } from "../services";
import {
  EmailAddress,
  Subscription,
  SubscriptionRepository,
  Search
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
  searchState: Search;
  email: EmailAddress;
}) =>
  pipe(
    indexingService.searchTrials(searchState),
    TaskEither.map(results => results.map(({ trialId }) => trialId)),
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
