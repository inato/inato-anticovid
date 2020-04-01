import { FirestoreSubscriptionRepository } from "./FirestoreSubscriptionRepository";
import {
  subscriptionFactory,
  emailAddressFactory,
  trialIdFactory,
  Subscription,
  EmailAddress
} from "../../domain";
import * as Either from "fp-ts/lib/Either";
import { GenericErrorType } from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";
import { firestore } from "firebase-admin";

const firestoreMock = ({
  set = () => Promise.resolve(),
  email,
  date = new Date(),
  search = {},
  search_results = []
}: Partial<{
  set: Function;
  email: string;
  date: Date;
  search: Object;
  search_results: ReadonlyArray<string>;
}>) =>
  ({
    collection: () => ({
      doc: () => ({ set }),
      where: () => ({
        get: () =>
          Promise.resolve({
            docs: [
              {
                data() {
                  return {
                    email,
                    last_email_sent_date: new firestore.Timestamp(
                      Math.floor(date.getTime() / 1000),
                      0
                    ),
                    search,
                    search_results
                  };
                }
              }
            ]
          })
      })
    })
  } as any);

describe("FirestoreSubscriptionRepository", () => {
  describe("store", () => {
    it("should store a subscription", async () => {
      const set = jest.fn(() => Promise.resolve());
      const lastEmailSentDate = new Date();
      const repository = new FirestoreSubscriptionRepository(
        firestoreMock({ set })
      );
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

  describe("findAllSubscriptionsLastEmailSentAfter", () => {
    it("should find subscriptions", async () => {
      const date = new Date();
      const email = "email@inato.com";

      const repository = new FirestoreSubscriptionRepository(
        firestoreMock({
          email,
          date,
          search: {},
          search_results: ["trialId"]
        })
      );

      const results = await repository.findAllSubscriptionsLastEmailSentAfter(
        date
      )();

      expect(results).toStrictEqual(
        Either.right([
          new Subscription({
            email: EmailAddress.unsafe_parse(email),
            search: {},
            searchResults: [trialIdFactory("trialId")],
            lastEmailSentDate: new Date(
              Math.floor(date.getTime() / 1000) * 1000
            )
          })
        ])
      );
    });

    it("should fail if email is invalid", async () => {
      const date = new Date();
      const email = "invalidEmail";
      const repository = new FirestoreSubscriptionRepository(
        firestoreMock({ date, email })
      );

      const results = await repository.findAllSubscriptionsLastEmailSentAfter(
        date
      )();

      expect(
        pipe(
          results,
          Either.mapLeft(({ type }) => type)
        )
      ).toStrictEqual(Either.left(GenericErrorType.InvalidInformationError));
    });
  });
});
