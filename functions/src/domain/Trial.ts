export class Trial {
  public readonly trialid: string;
  public readonly rest: any;

  constructor(trialid: string, rest: any) {
    this.trialid = trialid;
    this.rest = rest;
  }
}
