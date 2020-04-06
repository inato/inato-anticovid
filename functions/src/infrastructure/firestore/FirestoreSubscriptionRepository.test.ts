import { v4 as uuid } from "uuid";
import { firestore } from "firebase-admin";
import * as Either from "fp-ts/lib/Either";
import * as Option from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { FirestoreSubscriptionRepository } from "./FirestoreSubscriptionRepository";
import {
  subscriptionFactory,
  emailAddressFactory,
  trialIdFactory,
  Subscription,
  EmailAddress,
  subscriptionIdFactory,
  facetFiltersFactory,
  Search
} from "../../domain";
import { GenericErrorType } from "../../domain/errors";
import { serializeSearch } from "./serialize";

const firestoreMock = ({
  set = () => Promise.resolve(),
  email,
  id = uuid(),
  date = new Date(),
  search = { searchQuery: Option.none, facetFilters: facetFiltersFactory() },
  search_results = []
}: Partial<{
  set: Function;
  email: string;
  id: string;
  date: Date;
  search: Search;
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
                id,
                data() {
                  return {
                    email,
                    last_email_sent_date: new firestore.Timestamp(
                      Math.floor(date.getTime() / 1000),
                      0
                    ),
                    search: serializeSearch(search),
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
      const search = {
        searchQuery: Option.none,
        facetFilters: facetFiltersFactory()
      };
      await repository.store(
        subscriptionFactory({
          email: emailAddressFactory("user@inato.com"),
          search,
          searchResults: [trialIdFactory("trialId")],
          lastEmailSentDate
        })
      )();

      expect(set).toHaveBeenCalledWith({
        email: "user@inato.com",
        search: expect.anything(),
        search_results: ["trialId"],
        last_email_sent_date: lastEmailSentDate
      });
    });
  });

  describe("findAllSubscriptionsLastEmailSentBefore", () => {
    it("should find subscriptions", async () => {
      const date = new Date();
      const email = "email@inato.com";
      const id = uuid();

      const search = {
        searchQuery: Option.none,
        facetFilters: facetFiltersFactory()
      };
      const repository = new FirestoreSubscriptionRepository(
        firestoreMock({
          email,
          date,
          id,
          search,
          search_results: ["trialId"]
        })
      );

      const results = await repository.findAllSubscriptionsLastEmailSentBefore(
        date
      )();

      expect(results).toStrictEqual(
        Either.right([
          new Subscription({
            id: subscriptionIdFactory(id),
            email: EmailAddress.unsafe_parse(email),
            search,
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

      const results = await repository.findAllSubscriptionsLastEmailSentBefore(
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
