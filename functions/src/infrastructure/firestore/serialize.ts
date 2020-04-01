import { Subscription } from "../../domain";

export const serialize = (subscription: Subscription) => ({
  email: subscription.email.toString(),
  last_email_sent_date: subscription.lastEmailSentDate,
  search_results: subscription.searchResults.map(trialId => trialId.toString()),
  search: subscription.search
});
