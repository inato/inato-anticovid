import * as Either from "fp-ts/lib/Either";
import { deserializeSearchTrialsHits } from "./deserialize";

describe("deserializeSearchTrialsHits", () => {
  it("should deserialize a response with multiple hits", () => {
    const timestamp = new Date().getTime() / 1000;
    const responseHits = [
      {
        objectID: "objectID1",
        public_title: "title1",
        registration_timestamp: timestamp
      },
      {
        objectID: "objectID2",
        public_title: "title2",
        registration_timestamp: timestamp
      }
    ];
    expect(deserializeSearchTrialsHits(responseHits)).toStrictEqual(
      Either.right([
        {
          trialId: "objectID1",
          publicTitle: "title1",
          registrationDate: new Date(timestamp)
        },
        {
          trialId: "objectID2",
          publicTitle: "title2",
          registrationDate: new Date(timestamp)
        }
      ])
    );
  });
});
