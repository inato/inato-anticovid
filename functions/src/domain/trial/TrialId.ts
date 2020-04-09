import { Opaque } from '../opaque';

export type TrialId = Opaque<'TrialId', string>;

export const toTrialId = (trialId: string) => trialId as TrialId;
