import { deserialize } from "./deserialize";

describe("deserialize", () => {
  it("should trow an Error if one mandatory field is missing", () => {
    const row = {
      trialid: "trialid"
    };
    expect(() => deserialize(row)).toThrowError();
  });
  it("should make a Trial object from a query result row", () => {
    const date = new Date();
    const row = {
      trialid: "trialid",
      public_title: "public_title",
      intervention: "intervention",
      web_address: "web_address",
      recruitment_status: "recruitment_status",
      therapeutic_classes: ["therapeutic_classes"],
      date_registration3: date,
      study_design: "study_design"
    };
    const trial = deserialize(row);
    expect(trial.trialid).toBe("trialid");
    expect(trial.intervention).toBe("intervention");
    expect(trial.rest).toStrictEqual({
      trialid: "trialid",
      public_title: "public_title",
      intervention: "intervention",
      web_address: "web_address",
      recruitment_status: "recruitment_status",
      therapeutic_classes: ["therapeutic_classes"],
      date_registration3: date,
      study_design: "study_design"
    });
  });
});
