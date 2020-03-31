import * as decod from "decod";

export const deserializeSearchTrialsResponse = (
  response: ReadonlyArray<unknown>
) => response.map(hit => deserializeSearchTrial(hit));

const deserializeSearchTrial = (hit: unknown) =>
  decod.at("objectID", decod.string)(hit);
