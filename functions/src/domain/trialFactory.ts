import { Trial } from "./Trial";

export const trialFactory = ({
  trialid = "trialid",
  rest = {}
}: Partial<{
  trialid: string;
  rest: Object;
}>) => new Trial(trialid, rest);
