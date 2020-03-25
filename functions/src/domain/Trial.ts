interface TrialConstructorArgs {
  trialId: string;
  publicTitle: string;
  webAddress: string;
  recruitmentStatus: string | null;
  therapeuticClasses: Array<string>;
  dateRegistration3: Date;
  rest: any;
}

export class Trial {
  public readonly trialId: string;
  public readonly publicTitle: string;
  public readonly webAddress: string;
  public readonly recruitmentStatus: string | null;
  public readonly therapeuticClasses: Array<string>;
  public readonly dateRegistration3: Date;
  public readonly rest: any;

  constructor({
    trialId,
    publicTitle,
    webAddress,
    recruitmentStatus,
    therapeuticClasses,
    dateRegistration3,
    rest
  }: TrialConstructorArgs) {
    this.trialId = trialId;
    this.publicTitle = publicTitle;
    this.webAddress = webAddress;
    this.recruitmentStatus = recruitmentStatus;
    this.therapeuticClasses = therapeuticClasses;
    this.dateRegistration3 = dateRegistration3;
    this.rest = rest;
  }
}
