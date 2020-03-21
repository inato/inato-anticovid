import { deserialize } from "./deserialize";

describe("deserialize", () => {
  it("should make a Trial object from a query result row", () => {
    const row = {
      trialid: "trialid",
      study_design: "study_design"
    };
    const trial = deserialize(row);
    expect(trial.trialid).toBe("trialid");
    expect(trial.rest).toStrictEqual({
      trialid: "trialid",
      study_design: "study_design"
    });
  });
});
