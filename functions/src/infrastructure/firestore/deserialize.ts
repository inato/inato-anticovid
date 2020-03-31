import * as decod from "decod";
import { EmailAddress, Subscription, toTrialId } from "../../domain";

const decodeTrialId = (value: unknown) => toTrialId(decod.string(value));

const decodeEmail = (email: unknown) =>
  EmailAddress.unsafe_parse(decod.string(email));

const decodeSearch = (search: unknown) => search as { [key: string]: unknown };

export const deserialize = (document: { [key: string]: unknown }) =>
  new Subscription({
    ...decod.props({
      email: decod.at("email", decodeEmail),
      lastEmailSentDate: decod.at("last_email_sent_date", decod.date),
      search: decod.at("search", decodeSearch),
      searchResults: decod.at("search_results", decod.array(decodeTrialId))
    })(document)
  });
