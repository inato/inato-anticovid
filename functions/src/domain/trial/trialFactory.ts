import { Trial, TrialConstructorArgs } from "./Trial";
import { toTrialId } from "./TrialId";

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
  countries = [],
  acronym = null,
  totalRecruitmentSize = 100,
  clinicalOutcomes = [],
  surrogateOutcomes = [],
  resultsPublications = [],
  rest = {}
}: Partial<TrialConstructorArgs> = {}) =>
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
    countries,
    acronym,
    totalRecruitmentSize,
    clinicalOutcomes,
    surrogateOutcomes,
    resultsPublications,
    rest
  });
