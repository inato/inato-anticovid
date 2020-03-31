import { Subscription, SubscriptionConstructorArgs } from "./Subscription";
import { emailAddressFactory } from "../emailAddress";

export const subscriptionFactory = ({
  email = emailAddressFactory(),
  search = {},
  searchResults = [],
  lastEmailSentDate = new Date("2020-03-30")
}: Partial<SubscriptionConstructorArgs>) =>
  new Subscription({ email, search, searchResults, lastEmailSentDate });
