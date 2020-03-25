import { Trial } from "./Trial";

export const trialFactory = ({
  trialId = "trialId",
  publicTitle = "publicTitle",
  webAddress = "webAddress",
  recruitmentStatus = "recruitmentStatus",
  therapeuticClasses = ["therapeuticClass"],
  dateRegistration3 = new Date(),
  rest = {}
}: Partial<{
  trialId: string;
  publicTitle: string;
  webAddress: string;
  recruitmentStatus: string | null;
  therapeuticClasses: Array<string>;
  dateRegistration3: Date;
  rest: Object;
}>) =>
  new Trial({
    trialId,
    publicTitle,
    webAddress,
    recruitmentStatus,
    therapeuticClasses,
    dateRegistration3,
    rest
  });
