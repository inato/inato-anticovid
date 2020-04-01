import * as isEmail from "isemail";
import { pipe } from "fp-ts/lib/pipeable";
import * as Either from "fp-ts/lib/Either";

import { EmailAddressError, invalidEmailAddressError } from "./error";
import { GenericError } from "../errors";

export class EmailAddress {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  toString() {
    return this._value.toLowerCase();
  }

  equals(emailAddress: EmailAddress) {
    return this.toString() === emailAddress.toString();
  }

  private static validate(value: string) {
    return isEmail.validate(value);
  }

  private static sanitize(value: string) {
    return value.trim();
  }

  private static parse(
    value: string
  ): Either.Either<GenericError<EmailAddressError.Invalid>, EmailAddress> {
    if (!EmailAddress.validate(value)) {
      return Either.left(invalidEmailAddressError(value));
    }
    return Either.right(new EmailAddress(value));
  }

  static tryParse(
    value: string
  ): Either.Either<GenericError<EmailAddressError.Invalid>, EmailAddress> {
    return EmailAddress.parse(EmailAddress.sanitize(value));
  }

  static unsafe_parse(value: string): EmailAddress {
    return pipe(
      EmailAddress.parse(value),
      Either.getOrElse<GenericError<EmailAddressError.Invalid>, EmailAddress>(
        error => {
          throw error.toError();
        }
      )
    );
  }
}
