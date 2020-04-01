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
      web_address: "web_address",
      recruitment_status: "recruitment_status",
      therapeutic_classes: ["therapeutic_classes"],
      date_registration3: date,
      exclusion_criteria: null,
      inclusion_criteria: null,
      has_results_publications: false,
    };
    const trial = deserialize(row);

    expect(trial.therapeuticClasses).toEqual(['therapeutic_classes']);
    expect(trial).toEqual(expect.objectContaining({
      trialId: "trialid",
      publicTitle: "public_title",
      webAddress: "web_address",
      recruitmentStatus: "recruitment_status",
      registrationDate: date,
      exclusionCriteria: null,
      inclusionCriteria: null,
      hasResultsPublications: false,
    }));
  });
});
