import { genericError } from '../errors';

export const invalidEmailAddressError = (email: string) =>
  genericError(
    EmailAddressError.Invalid,
    `The email ${email} is not a valid email address`,
  );

export enum EmailAddressError {
  Invalid = 'InvalidEmailAddressError',
}
