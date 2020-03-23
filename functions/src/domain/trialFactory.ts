import { Trial } from "./Trial";

export const trialFactory = ({
  trialid = "trialid",
  public_title = "public_title",
  intervention = "intervention",
  web_address = "web_address",
  recruitment_status = "recruitment_status",
  therapeutic_classes = ["therapeutic_class"],
  date_registration3 = new Date(),
  rest = {}
}: Partial<{
  trialid: string;
  public_title: string;
  intervention: string;
  web_address: string;
  recruitment_status: string;
  therapeutic_classes: Array<string>;
  date_registration3: Date;
  rest: Object;
}>) =>
  new Trial({
    trialid,
    public_title,
    intervention,
    web_address,
    recruitment_status,
    therapeutic_classes,
    date_registration3,
    rest
  });
