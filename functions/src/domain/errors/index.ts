export class GenericError<T extends string> {
  readonly type: T;

  readonly reason: string;

  readonly error: Error;

  constructor(props: { type: T; reason: string }) {
    this.type = props.type;
    this.reason = props.reason;
    this.error = new Error(props.reason);
  }

  toError() {
    return this.error;
  }
}

export const genericError = <T extends string>(
  type: T,
  reason: string,
): GenericError<T> =>
  new GenericError({
    type,
    reason,
  });

export const invalidInformationError = (reason: string) =>
  genericError(GenericErrorType.InvalidInformationError, reason);

export const forbiddenError = (reason: string) =>
  genericError(GenericErrorType.ForbiddenError, reason);

export const unknownError = (reason = 'Unknown error') =>
  genericError(GenericErrorType.UnknownError, reason);

export const aggregateNotFoundError = (reason: string) =>
  genericError(GenericErrorType.AggregateNotFound, reason);

export enum GenericErrorType {
  InvalidInformationError = 'InvalidInformationError',
  ForbiddenError = 'ForbiddenError',
  UnknownError = 'UnknownError',
  AggregateNotFound = 'AggregateNotFound',
}
