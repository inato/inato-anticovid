import * as functions from "firebase-functions";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";
import * as decod from "decod";
import {
  SubscriptionRepository,
  Subscription,
  EmailAddress
} from "../../domain";
import { taskEitherExtend } from "../../domain/utils/taskEither";
import { IndexingService } from "../../application";
import { fromNullable } from "fp-ts/lib/Option";

export const subscribeToUpdatesHandler = ({
  subscriptionRepository,
  indexingService
}: {
  subscriptionRepository: SubscriptionRepository;
  indexingService: IndexingService;
}) => async (
  request: functions.https.Request,
  response: functions.Response<any>
) =>
  pipe(
    request.body,
    getFacetFiltersQueryFromRequest,
    indexingService.searchTrials,
    subscriptionRepository.store(
      Subscription.build({
        email: EmailAddress.unsafe_parse("julien@inato.com"),
        search: {},
        searchResults: []
      })
    ),
    taskEitherExtend(() =>
      subscriptionRepository.findAllSubscriptionsLastEmailSentAfter(
        new Date("2020-01-01")
      )
    ),
    TaskEither.fold(
      e => {
        response.status(500).send(e.reason);
        return Task.of(undefined);
      },
      result => {
        response.send(`Subscribed ${result.map(sub => sub.email)}`);
        return Task.of(undefined);
      }
    )
  )();

const getFacetFiltersQueryFromRequest = (request: functions.https.Request) =>
  decod.props({
    searchQuery: fromNullable(
      decod.at("search_query", decod.nullable(decod.string))
    ),
    facetFilters: decod.at("facet_filters", decod.array(decod.string))
  })(request.body);
