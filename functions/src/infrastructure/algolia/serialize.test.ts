import { trialFactory } from "../../domain";
import { serialize } from "./serialize";

describe("serialize", () => {
  it("should serialize all fields", () => {
    const date = new Date();
    const trial = trialFactory({
      trialId: "trialid",
      publicTitle: "public_title",
      webAddress: "web_address",
      recruitmentStatus: "recruitment_status",
      therapeuticClasses: ["therapeutic_classes"],
      registrationDate: date
    });
    expect(serialize(trial)).toStrictEqual({
      exclusion_criteria: "",
      inclusion_criteria: "",
      public_title: "public_title",
      web_address: "web_address",
      recruitment_status: "recruitment_status",
      therapeutic_classes: ["therapeutic_classes"],
      date_registration3: date,
      objectID: "trialid"
    });
  });

  it("should serialize a null recruitment status", () => {
    const trial = trialFactory({
      recruitmentStatus: null
    });
    expect(serialize(trial)).toMatchObject({
      recruitment_status: null
    });
  });

  it("should serialize a trial with additional parameters", () => {
    const trial = trialFactory({
      trialId: "trialid",
      rest: {
        other: "other"
      }
    });
    expect(serialize(trial)).toMatchObject({
      exclusion_criteria: "",
      inclusion_criteria: "",
      objectID: "trialid",
      other: "other"
    });
  });
});
