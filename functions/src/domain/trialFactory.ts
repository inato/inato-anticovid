import { Trial } from "./Trial";

export const trialFactory = ({
  trialId = "trialId",
  publicTitle = "publicTitle",
  webAddress = "webAddress",
  recruitmentStatus = "recruitmentStatus",
  therapeuticClasses = ["therapeuticClass"],
  registrationDate = new Date(),
  rest = {}
}: Partial<{
  trialId: string;
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
