import * as Either from "fp-ts/lib/Either";
import { deserializeSearchTrialsHits } from "./deserialize";

describe("deserializeSearchTrialsHits", () => {
  it("should deserialize a response with multiple hits", () => {
    const responseHits = [{ objectID: "objectID1" }, { objectID: "objectID2" }];
    expect(deserializeSearchTrialsHits(responseHits)).toStrictEqual(
      Either.right(["objectID1", "objectID2"])
    );
  });
});
