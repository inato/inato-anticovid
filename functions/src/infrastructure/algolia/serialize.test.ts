import { trialFactory, trialIdFactory } from "../../domain";
import { serialize } from "./serialize";

describe("serialize", () => {
  it("should serialize all fields", () => {
    const date = new Date("Fri, 27 Mar 2020 10:45:59 GMT");
    const trial = trialFactory({
      trialId: trialIdFactory("trialid"),
      publicTitle: "public_title",
      webAddress: "web_address",
      recruitmentStatus: "recruitment_status",
      therapeuticClasses: ["therapeutic_classes"],
      registrationDate: date
    });
    expect(serialize(trial)).toStrictEqual({
      exclusion_criteria: "",
      inclusion_criteria: "",
      has_results_publications: false,
      public_title: "public_title",
      web_address: "web_address",
      recruitment_status: "recruitment_status",
      therapeutic_classes: ["therapeutic_classes"],
      date_registration3: date,
      registration_timestamp: 1585305959000,
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
      trialId: trialIdFactory("trialid"),
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
