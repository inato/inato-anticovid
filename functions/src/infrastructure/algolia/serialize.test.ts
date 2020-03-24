import { trialFactory } from "../../domain";
import { serialize } from "./serialize";

describe("serialize", () => {
  it("should serialize all fields", () => {
    const date = new Date();
    const trial = trialFactory({
      trialid: "trialid",
      public_title: "public_title",
      web_address: "web_address",
      recruitment_status: "recruitment_status",
      therapeutic_classes: ["therapeutic_classes"],
      date_registration3: date
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
      recruitment_status: null
    });
    expect(serialize(trial)).toMatchObject({
      recruitment_status: null
    });
  });

  it("should serialize a trial with additional parameters", () => {
    const trial = trialFactory({
      trialid: "trialid",
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
