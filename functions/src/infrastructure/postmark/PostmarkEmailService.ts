import { Client as PostmarkClient } from "postmark";
import * as qs from "qs";
import { format } from "date-fns";
import { EmailService, SearchResult } from "../../application";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Option from "fp-ts/lib/Option";
import { Subscription, Search } from "../../domain";
import {
  GenericError,
  GenericErrorType,
  unknownError
} from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";
import * as logoImg from "../../../assets/logo.png";

const SENDER_EMAIL_ADDRESS = "anticovid@inato.com";
const NUMBER_OF_TRIALS_TO_DISPLAY = 5;
const logoImgBase64 = Buffer.from(logoImg).toString("base64");

export class PostmarkEmailService implements EmailService {
  client: PostmarkClient;

  constructor({ apiToken }: { apiToken: string }) {
    this.client = new PostmarkClient(apiToken);
  }

  sendNewResultsForSubscription({
    subscription,
    newResults
  }: {
    subscription: Subscription;
    newResults: ReadonlyArray<SearchResult>;
  }): TaskEither.TaskEither<GenericError<GenericErrorType.UnknownError>, void> {
    const trialsToDisplay = newResults.slice(0, NUMBER_OF_TRIALS_TO_DISPLAY);
    const numberOfTrialsLeft = newResults.length - trialsToDisplay.length;

    return pipe(
      TaskEither.tryCatch(
        () =>
          this.client.sendEmailWithTemplate({
            From: SENDER_EMAIL_ADDRESS,
            To: subscription.email.toString(),
            TemplateAlias: "anticovid-new-trials-for-subscription",
            TemplateModel: {
              subscriptionId: subscription.id,
              numberOfNewTrials: newResults.length,
              trialsToDisplay: trialsToDisplay.map(trial => ({
                trialId: trial.trialId,
                publicTitle: trial.publicTitle,
                registrationDate: format(trial.registrationDate, "MMM d yyyy")
              })),
              numberOfTrialsLeft:
                numberOfTrialsLeft === 0 ? undefined : numberOfTrialsLeft,
              allMatchingResultsQueryParams: serializeSearchToQueryParams(
                subscription.search
              ),
              criterias: serializeCriteriasForNewResultsForSubscriptionEmail(
                subscription.search
              )
            },
            Attachments: [
              {
                Name: "logo.png",
                ContentID: "cid:logo.png",
                ContentType: "image/png",
                Content: logoImgBase64
              }
            ]
          }),
        e =>
          unknownError(
            e instanceof Error
              ? e.message
              : "Unknown sending email with postmark error"
          )
      ),
      TaskEither.map(() => undefined)
    );
  }
}

export const serializeSearchToQueryParams = (search: Search) =>
  qs.stringify(
    cleanNullValues({
      query: pipe(
        search.searchQuery,
        Option.getOrElse(() => "")
      ),
      toggle: {
        has_results_publications: search.facetFilters.hasResultsPublications
      },
      refinementList: {
        therapeutic_class: search.facetFilters.therapeuticClasses,
        study_type: search.facetFilters.studyTypes,
        recruitment_status: search.facetFilters.recruitmentStatus,
        countries: search.facetFilters.countries,
        clinical_outcome_extracted_:
          search.facetFilters.clinicalOutcomesExtracted,
        surrogate_outcome_extracted_:
          search.facetFilters.surrogateOutcomesExtracted
      }
    })
  );

const cleanNullValues = (obj: {
  [key: string]: unknown | null | undefined;
}): { [key: string]: unknown | null | undefined } =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    if (value instanceof Object) {
      return { ...acc, [key]: cleanNullValues(value as any) };
    }
    return { ...acc, [key]: value };
  }, {});

const serializeCriteriasForNewResultsForSubscriptionEmail = (
  search: Search
): string =>
  [
    ...pipe(
      search.searchQuery,
      Option.fold(
        () => [],
        searchQuery => [`"${searchQuery}"`]
      )
    ),
    ...search.facetFilters.therapeuticClasses,
    ...search.facetFilters.studyTypes,
    ...search.facetFilters.recruitmentStatus,
    ...(search.facetFilters.hasResultsPublications
      ? ["Has results publications"]
      : []),
    ...search.facetFilters.countries,
    ...search.facetFilters.clinicalOutcomesExtracted,
    ...search.facetFilters.surrogateOutcomesExtracted
  ].join(", ");
