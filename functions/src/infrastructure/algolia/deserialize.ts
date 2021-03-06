import * as decod from 'decod';
import * as Either from 'fp-ts/lib/Either';

import { toTrialId } from '../../domain';
import { invalidInformationError } from '../../domain/errors';

const decodeTrialId = (value: unknown) => toTrialId(decod.string(value));
const decodeTimestamp = (value: unknown) => new Date(decod.number(value));

export const deserializeSearchTrialsHits = (hits: ReadonlyArray<unknown>) =>
  Either.tryCatch(
    () => hits.map(hit => deserializeSearchTrial(hit)),
    e =>
      invalidInformationError(
        e instanceof Error
          ? e.message
          : 'Unknown deserializing search trials hits error',
      ),
  );

const deserializeSearchTrial = (hit: unknown) =>
  decod.props({
    trialId: decod.at('objectID', decodeTrialId),
    publicTitle: decod.at('public_title', decod.string),
    registrationDate: decod.at('registration_timestamp', decodeTimestamp),
  })(hit);
