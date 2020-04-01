import * as functions from "firebase-functions";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";
import * as decod from "decod";
import { SubscriptionRepository, EmailAddress } from "../../domain";
import { IndexingService, subscribeToUpdates } from "../../application";
import * as Option from "fp-ts/lib/Option";
import { invalidInformationError } from "../../domain/errors";

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
    TaskEither.map(query =>
      subscribeToUpdates({
        indexingService,
        subscriptionRepository,
        searchState: {
          searchQuery: query.searchQuery,
          facetFilters: query.facetFilters
        },
        email: query.email
      })
    ),
    TaskEither.fold(
      e => {
        response.status(500).send(e.reason);
        return Task.of(undefined);
      },
      () => {
        response.sendStatus(204);
        return Task.of(undefined);
      }
    )
  )();

const getFacetFiltersQueryFromRequest = ({ query }: functions.https.Request) =>
  TaskEither.tryCatch(
    async () => ({
      email: decod.at("email", decodeEmailAddress)(query),
      searchQuery: decod.at("searchQuery", decodeSearchQuery)(query),
      facetFilters: decod.props({
        recruitment_status: decod.at(
          "recruitment_status",
          decod.attempt(decod.array(decod.string), [])
        ),
        therapeutic_classes: decod.at(
          "therapeutic_classes",
          decod.attempt(decod.array(decod.string), [])
        ),
        clinical_outcome_extracted_: decod.at(
          "clinical_outcome_extracted_",
          decod.attempt(decod.array(decod.string), [])
        ),
        surrogate_outcome_extracted_: decod.at(
          "surrogate_outcome_extracted_",
          decod.attempt(decod.array(decod.string), [])
        ),
        study_type: decod.at(
          "study_type",
          decod.attempt(decod.array(decod.string), [])
        ),
        countries: decod.at(
          "countries",
          decod.attempt(decod.array(decod.string), [])
        )
      })(query)
    }),
    e =>
      invalidInformationError(
        e instanceof Error ? e.message : "Invalid query error"
      )
  );

const decodeEmailAddress = (email: unknown) =>
  EmailAddress.unsafe_parse(decod.string(email));

const decodeSearchQuery = (searchQuery: unknown) =>
  Option.fromNullable(decod.optional(decod.string)(searchQuery));
