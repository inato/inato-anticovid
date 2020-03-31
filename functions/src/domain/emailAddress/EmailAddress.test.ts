import * as Either from "fp-ts/lib/Either";

import { EmailAddress } from "./EmailAddress";
import { emailAddressFactory } from "./emailAddressFactory";
import { pipe } from "fp-ts/lib/pipeable";

describe("EmailAddress", () => {
  describe("tryParse", () => {
    it("should return left when the provided value is not a valid email address", () => {
      const emailAddress = EmailAddress.tryParse("invalid");
      expect(emailAddress).toStrictEqual(Either.left(expect.anything()));
    });

    it("should return right when the provided value is a valid email address", () => {
      const emailAddress = EmailAddress.tryParse("valid@topLevelDomain");
      expect(emailAddress).toStrictEqual(Either.right(expect.anything()));
    });

    it("should return right when the provided value is a valid email address", () => {
      const emailAddress = EmailAddress.tryParse("valid@domain.tld");
      expect(emailAddress).toStrictEqual(Either.right(expect.anything()));
    });

    it("should trim the provided email address", () => {
      expect(
        pipe(
          EmailAddress.tryParse(" valid@domain.tld "),
          Either.map(email => email.toString()),
          Either.getOrElse(() => "")
        )
      ).toBe("valid@domain.tld");
    });
  });

  describe("unsafe_parse", () => {
    it("should throw an error if the provided value is not a valid email address", () => {
      expect(() => EmailAddress.unsafe_parse("invalid")).toThrow();
    });

    it("should return an EmailAddress object if the provided value is a valid email address", () => {
      const emailAddress = EmailAddress.unsafe_parse("valid@domain.tld");
      expect(emailAddress.toString()).toEqual("valid@domain.tld");
    });
  });

  describe("equals", () => {
    it("should return true if both email address are equal", () => {
      const emailAddress = emailAddressFactory("email@inato.com");
      const equalEmailAddress = emailAddressFactory("email@inato.com");
      expect(emailAddress.equals(equalEmailAddress)).toBe(true);
    });

    it("should return false if both email address are different", () => {
      const emailAddress = emailAddressFactory("email@inato.com");
      const differentEmailAddress = emailAddressFactory(
        "differentEmail@inato.com"
      );
      expect(emailAddress.equals(differentEmailAddress)).toBe(false);
    });

    it("should return true if both email address are equal with case insensitivity", () => {
      const emailAddress = emailAddressFactory("email@inato.com");
      const equalEmailAddress = emailAddressFactory("eMail@inato.com");
      expect(emailAddress.equals(equalEmailAddress)).toBe(true);
    });
  });
});
