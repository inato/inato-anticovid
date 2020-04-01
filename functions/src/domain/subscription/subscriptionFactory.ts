import { v4 as uuid } from "uuid";
import {
  Subscription,
  SubscriptionConstructorArgs,
  toSubscriptionId
} from "./Subscription";
import { emailAddressFactory } from "../emailAddress";

export const subscriptionIdFactory = (id: string = uuid()) =>
  toSubscriptionId(id);

export const subscriptionFactory = ({
  id = subscriptionIdFactory(),
  email = emailAddressFactory(),
  search = {},
  searchResults = [],
  lastEmailSentDate = new Date("2020-03-30")
}: Partial<SubscriptionConstructorArgs> = {}) =>
  new Subscription({ id, email, search, searchResults, lastEmailSentDate });
