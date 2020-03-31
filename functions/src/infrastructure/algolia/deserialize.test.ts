import { deserializeSearchTrialsResponse } from "./deserialize";

describe("deserializeSearchTrialsResponse", () => {
  it("should deserialize a response with multiple hits", () => {
    const responseHits = [{ objectID: "objectID1" }, { objectID: "objectID2" }];
    expect(deserializeSearchTrialsResponse(responseHits)).toStrictEqual([
      "objectID1",
      "objectID2"
    ]);
  });
});
