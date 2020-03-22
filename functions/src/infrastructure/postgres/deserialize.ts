import { Trial } from "../../domain";

export const deserialize = (row: any): Trial => {
  return new Trial(row.trialid, row);
};
