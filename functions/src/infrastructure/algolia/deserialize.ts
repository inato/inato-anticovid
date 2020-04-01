import * as decod from "decod";
import { toTrialId } from "../../domain";

export const decodeTrialId = (value: unknown) => toTrialId(decod.string(value));

export const deserializeSearchTrialsResponse = (
  response: ReadonlyArray<unknown>
) => response.map(hit => deserializeSearchTrial(hit));

const deserializeSearchTrial = (hit: unknown) =>
  decod.at("objectID", decodeTrialId)(hit);
