import isEmail from 'isemail';
import { Either, right, left } from '@inato/fp';

import { GenericError } from '../errors';

import { EmailAddressError, invalidEmailAddressError } from './error';

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
    value: string,
  ): Either<GenericError<EmailAddressError.Invalid>, EmailAddress> {
    if (!EmailAddress.validate(value)) {
      return left(invalidEmailAddressError(value));
    }
    return right(new EmailAddress(value));
  }

  static tryParse(
    value: string,
  ): Either<GenericError<EmailAddressError.Invalid>, EmailAddress> {
    return EmailAddress.parse(EmailAddress.sanitize(value));
  }

  static unsafe_parse(value: string): EmailAddress {
    return EmailAddress.parse(value).getOrElse(error => {
      throw error.toError();
    });
  }
}
