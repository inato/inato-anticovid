import { Trial } from "../../domain";
import * as decod from "decod";

export const deserialize = (row: unknown): Trial => {
  const trialMandatoryProps = decod.props({
    trialid: decod.at(["trialid"], decod.string),
    public_title: decod.at(["public_title"], decod.string),
    intervention: decod.at(["intervention"], decod.string),
    web_address: decod.at(["web_address"], decod.string),
    recruitment_status: decod.at(["recruitment_status"], decod.string),
    therapeutic_classes: decod.at(
      ["therapeutic_classes"],
      decod.array(decod.string)
    ),
    date_registration3: decod.at(["date_registration3"], decod.date)
  })(row);

  return new Trial({
    rest: row,
    ...trialMandatoryProps
  });
};
