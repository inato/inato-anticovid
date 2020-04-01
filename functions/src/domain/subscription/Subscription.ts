import { v4 as uuid } from "uuid";
import { EmailAddress } from "../emailAddress";
import { TrialId } from "../trial/TrialId";
import { Opaque } from "../opaque";
import { FacetFilters } from "../../application";

export type SubscriptionId = Opaque<"SubscriptionId", string>;

export const toSubscriptionId = (id: string) => id as SubscriptionId;

export interface SubscriptionConstructorArgs {
  id: SubscriptionId;
  email: EmailAddress;
  search: Partial<FacetFilters>;
  searchResults: ReadonlyArray<TrialId>;
  lastEmailSentDate: Date;
}

export class Subscription {
  id: SubscriptionId;
  email: EmailAddress;
  search: Partial<FacetFilters>;
  searchResults: ReadonlyArray<TrialId>;
  lastEmailSentDate: Date;

  constructor({
    id,
    email,
    search,
    searchResults,
    lastEmailSentDate
  }: SubscriptionConstructorArgs) {
    this.id = id;
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
    search: Partial<FacetFilters>;
    searchResults: ReadonlyArray<TrialId>;
  }) {
    return new Subscription({
      id: toSubscriptionId(uuid()),
      email,
      search,
      searchResults,
      lastEmailSentDate: new Date()
    });
  }
}
