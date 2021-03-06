import { TrialId } from './TrialId';

export interface TrialConstructorArgs {
  trialId: TrialId;
  publicTitle: string;
  webAddress: string;
  intervention: string | null;
  recruitmentStatus: string | null;
  therapeuticClasses: Array<string>;
  registrationDate: Date;
  exclusionCriteria: string | null;
  inclusionCriteria: string | null;
  hasResultsPublications: boolean;
  acronym: string | null;
  totalRecruitmentSize: number;
  countries: Array<string>;
  primaryOutcome: string | null;
  clinicalOutcomes: Array<string>;
  surrogateOutcomes: Array<string>;
  resultsPublications: Array<{
    title: string | null;
    url: string;
  }>;
  studyType: string;
  rest: any;
}

export class Trial {
  public readonly trialId: TrialId;

  public readonly publicTitle: string;

  public readonly webAddress: string;

  public readonly intervention: string | null;

  public readonly recruitmentStatus: string | null;

  public readonly therapeuticClasses: Array<string>;

  public readonly registrationDate: Date;

  public readonly exclusionCriteria: string | null;

  public readonly inclusionCriteria: string | null;

  public readonly hasResultsPublications: boolean;

  public readonly acronym: string | null;

  public readonly totalRecruitmentSize: number;

  public readonly countries: Array<string>;

  public readonly primaryOutcome: string | null;

  public readonly clinicalOutcomes: Array<string>;

  public readonly surrogateOutcomes: Array<string>;

  public readonly resultsPublications: Array<{
    title: string | null;
    url: string;
  }>;

  public readonly studyType: string;

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
    acronym,
    totalRecruitmentSize,
    countries,
    clinicalOutcomes,
    surrogateOutcomes,
    resultsPublications,
    studyType,
    intervention,
    primaryOutcome,
    rest,
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
    this.acronym = acronym;
    this.totalRecruitmentSize = totalRecruitmentSize;
    this.countries = countries;
    this.clinicalOutcomes = clinicalOutcomes;
    this.surrogateOutcomes = surrogateOutcomes;
    this.resultsPublications = resultsPublications;
    this.studyType = studyType;
    this.intervention = intervention;
    this.primaryOutcome = primaryOutcome;
    this.rest = rest;
  }
}
