import { EmailAddress } from "../emailAddress";
import { TrialId } from "../trial/TrialId";

export interface SubscriptionConstructorArgs {
  email: EmailAddress;
  search: { [key: string]: unknown };
  searchResults: ReadonlyArray<TrialId>;
  lastEmailSentDate: Date;
}

export class Subscription {
  email: EmailAddress;
  search: { [key: string]: unknown };
  searchResults: ReadonlyArray<TrialId>;
  lastEmailSentDate: Date;

  constructor({
    email,
    search,
    searchResults,
    lastEmailSentDate
  }: SubscriptionConstructorArgs) {
    this.email = email;
    this.search = search;
    this.searchResults = searchResults;
    this.lastEmailSentDate = lastEmailSentDate;
  }

  static build({
    email,
    search,
    searchResults
  }: {
    email: EmailAddress;
    search: { [key: string]: unknown };
    searchResults: ReadonlyArray<TrialId>;
  }) {
    return new Subscription({
      email,
      search,
      searchResults,
      lastEmailSentDate: new Date()
    });
  }
}
