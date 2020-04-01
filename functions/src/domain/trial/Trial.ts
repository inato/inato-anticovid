import { TrialId } from "./TrialId";

interface TrialConstructorArgs {
  trialId: TrialId;
  publicTitle: string;
  webAddress: string;
  recruitmentStatus: string | null;
  therapeuticClasses: Array<string>;
  registrationDate: Date;
  exclusionCriteria: string | null;
  inclusionCriteria: string | null;
  hasResultsPublications: boolean;
  rest: any;
}

export class Trial {
  public readonly trialId: TrialId;
  public readonly publicTitle: string;
  public readonly webAddress: string;
  public readonly recruitmentStatus: string | null;
  public readonly therapeuticClasses: Array<string>;
  public readonly registrationDate: Date;
  public readonly exclusionCriteria: string | null;
  public readonly inclusionCriteria: string | null;
  public readonly hasResultsPublications: boolean;
  public readonly rest: any;

  constructor({
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
  }: TrialConstructorArgs) {
    this.trialId = trialId;
    this.publicTitle = publicTitle;
    this.webAddress = webAddress;
    this.recruitmentStatus = recruitmentStatus;
    this.therapeuticClasses = therapeuticClasses;
    this.registrationDate = registrationDate;
    this.exclusionCriteria = exclusionCriteria;
    this.inclusionCriteria = inclusionCriteria;
    this.hasResultsPublications = hasResultsPublications;
    this.rest = rest;
  }
}
