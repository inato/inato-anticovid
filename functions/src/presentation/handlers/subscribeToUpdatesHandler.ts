import * as functions from "firebase-functions";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Either from "fp-ts/lib/Either";
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
    request,
    parseQueryString,
    TaskEither.fromEither,
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

const parseQueryString = ({ query }: functions.https.Request) =>
  Either.tryCatch(
    () => ({
      email: decod.at("email", decodeEmailAddress)(query),
      searchQuery: decod.at("searchQuery", decodeSearchQuery)(query),
      facetFilters: decod.props({
        recruitmentStatus: decod.at(
          "recruitment_status",
          decod.attempt(decod.array(decod.string), [])
        ),
        therapeuticClasses: decod.at(
          "therapeutic_classes",
          decod.attempt(decod.array(decod.string), [])
        ),
        clinicalOutcomesExtracted: decod.at(
          "clinical_outcome_extracted_",
          decod.attempt(decod.array(decod.string), [])
        ),
        surrogateOutcomesExtracted: decod.at(
          "surrogate_outcome_extracted_",
          decod.attempt(decod.array(decod.string), [])
        ),
        studyTypes: decod.at(
          "study_type",
          decod.attempt(decod.array(decod.string), [])
        ),
        countries: decod.at(
          "countries",
          decod.attempt(decod.array(decod.string), [])
        ),
        hasResultsPublications: decod.at(
          "has_results_publications",
          decod.attempt(decod.boolean, undefined)
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
