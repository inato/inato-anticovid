import { trialFactory } from "../../domain";
import { serialize } from "./serialize";

describe("serialize", () => {
  it("should serialize an empty trial", () => {
    const trial = trialFactory({
      trialid: "trialid"
    });
    expect(serialize(trial)).toStrictEqual({
      exclusion_criteria: "",
      inclusion_criteria: "",
      objectID: "trialid",
    });
  });

  it("should serialize a trial with additional parameters", () => {
    const trial = trialFactory({
      trialid: "trialid",
      rest: {
        other: "other"
      }
    });
    expect(serialize(trial)).toStrictEqual({
      exclusion_criteria: "",
      inclusion_criteria: "",
      objectID: "trialid",
      other: "other",
    });
  });
});
