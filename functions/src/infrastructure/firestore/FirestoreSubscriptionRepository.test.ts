import { FirestoreSubscriptionRepository } from "./FirestoreSubscriptionRepository";
import {
  subscriptionFactory,
  emailAddressFactory,
  trialIdFactory
} from "../../domain";

describe("FirestoreSubscriptionRepository", () => {
  describe("store", () => {
    it("should store a subscription", async () => {
      const set = jest.fn(() => Promise.resolve());
      const firestoreMock = {
        collection: () => ({ doc: () => ({ set }) })
      } as any;
      const lastEmailSentDate = new Date();
      const repository = new FirestoreSubscriptionRepository(firestoreMock);
      await repository.store(
        subscriptionFactory({
          email: emailAddressFactory("user@inato.com"),
          search: {},
          searchResults: [trialIdFactory("trialId")],
          lastEmailSentDate
        })
      )();

      expect(set).toHaveBeenCalledWith({
        email: "user@inato.com",
        search: {},
        search_results: ["trialId"],
        last_email_sent_date: lastEmailSentDate
      });
    });
  });
});
