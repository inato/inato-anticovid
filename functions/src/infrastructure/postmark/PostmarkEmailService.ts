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

const SENDER_EMAIL_ADDRESS = "anticovid@inato.com";
const NUMBER_OF_TRIALS_TO_DISPLAY = 5;
const logoImgBase64 = `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`;

export class PostmarkEmailService implements EmailService {
  client: PostmarkClient;

  constructor({ apiToken }: { apiToken: string }) {
    if (!apiToken) {
      throw new Error("Postmark api token not set");
    }
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
