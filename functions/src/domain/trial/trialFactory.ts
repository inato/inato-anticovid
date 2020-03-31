import { Trial } from "./Trial";
import { TrialId, toTrialId } from "./TrialId";

export const trialIdFactory = (trialId: string = "trialId") =>
  toTrialId(trialId);

export const trialFactory = ({
  trialId = trialIdFactory(),
  publicTitle = "publicTitle",
  webAddress = "webAddress",
  recruitmentStatus = "recruitmentStatus",
  therapeuticClasses = ["therapeuticClass"],
  registrationDate = new Date(),
  rest = {}
}: Partial<{
  trialId: TrialId;
  publicTitle: string;
  webAddress: string;
  recruitmentStatus: string | null;
  therapeuticClasses: Array<string>;
  registrationDate: Date;
  rest: Object;
}> = {}) =>
  new Trial({
    trialId,
    publicTitle,
    webAddress,
    recruitmentStatus,
    therapeuticClasses,
    registrationDate,
    rest
  });
