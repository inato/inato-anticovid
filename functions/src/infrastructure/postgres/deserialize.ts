import { Trial, toTrialId } from "../../domain";
import * as decod from "decod";

export const decodeTrialId = (value: unknown) => toTrialId(decod.string(value));

export const deserialize = (row: unknown): Trial => {
  const trialMandatoryProps = decod.props({
    trialId: decod.at(["trialid"], decodeTrialId),
    publicTitle: decod.at(["public_title"], decod.string),
    webAddress: decod.at(["web_address"], decod.string),
    recruitmentStatus: decod.at(
      ["recruitment_status"],
      decod.nullable(decod.string)
    ),
    therapeuticClasses: decod.at(
      ["therapeutic_classes"],
      decod.array(decod.string)
    ),
    registrationDate: decod.at(["date_registration3"], decod.date)
  })(row);

  return new Trial({
    rest: row,
    ...trialMandatoryProps
  });
};
