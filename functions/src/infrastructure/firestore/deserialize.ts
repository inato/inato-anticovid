import * as decod from "decod";
import * as Either from "fp-ts/lib/Either";
import { EmailAddress, Subscription, toTrialId } from "../../domain";
import { firestore } from "firebase-admin";
import { invalidInformationError } from "../../domain/errors";

const decodeTrialId = (value: unknown) => toTrialId(decod.string(value));

const decodeEmail = (email: unknown) =>
  EmailAddress.unsafe_parse(decod.string(email));

const decodeSearch = (search: unknown) => search as { [key: string]: unknown };
const decodeTimestamp = (timestamp: unknown) =>
  (timestamp as firestore.Timestamp).toDate();

export const unsafe_deserialize = (document: { [key: string]: unknown }) =>
  new Subscription({
    ...decod.props({
      email: decod.at("email", decodeEmail),
      lastEmailSentDate: decod.at("last_email_sent_date", decodeTimestamp),
      search: decod.at("search", decodeSearch),
      searchResults: decod.at("search_results", decod.array(decodeTrialId))
    })(document)
  });

export const deserialize = (document: { [key: string]: unknown }) =>
  Either.tryCatch(
    () => unsafe_deserialize(document),
    e =>
      invalidInformationError(
        e instanceof Error ? e.message : "Invalid document from firebase"
      )
  );
