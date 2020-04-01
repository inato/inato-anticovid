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
  exclusionCriteria = null,
  inclusionCriteria = null,
  hasResultsPublications = false,
  rest = {}
}: Partial<{
  trialId: TrialId;
  publicTitle: string;
  webAddress: string;
  recruitmentStatus: string | null;
  therapeuticClasses: Array<string>;
  registrationDate: Date;
  exclusionCriteria: string | null;
  inclusionCriteria: string | null;
  hasResultsPublications: boolean;
  rest: Object;
}> = {}) =>
  new Trial({
    trialId,
    publicTitle,
    webAddress,
    recruitmentStatus,
    therapeuticClasses,
    registrationDate,
    exclusionCriteria,
    inclusionCriteria,
    hasResultsPublications,
    rest
  });
