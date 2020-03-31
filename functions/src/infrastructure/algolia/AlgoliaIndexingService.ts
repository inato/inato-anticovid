import { IndexingService } from "../../application";
import { Trial } from "../../domain";
import { serialize } from "./serialize";
import { SearchIndex } from "algoliasearch";
import * as TaskEither from "fp-ts/lib/TaskEither";
import { unknownError } from "../../domain/errors";
import { pipe } from "fp-ts/lib/pipeable";

export class AlgoliaIndexingService implements IndexingService {
  constructor(private readonly algoliaIndex: SearchIndex) {}

  indexTrials(trials: ReadonlyArray<Trial>) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () =>
            this.algoliaIndex.replaceAllObjects(
              trials.map(trial => serialize(trial)),
              {
                safe: true,
                batchSize: 50
              }
            ))(),
        e => unknownError(e instanceof Error ? e.message : "Unknown error")
      ),
      TaskEither.map(({ objectIDs }) => objectIDs)
    );
  }

  setSettings({
    searchableAttributes,
    attributesForFaceting,
    customRanking
  }: {
    searchableAttributes: ReadonlyArray<string>;
    attributesForFaceting: ReadonlyArray<string>;
    customRanking: ReadonlyArray<string>;
  }) {
    return pipe(
      TaskEither.tryCatch(
        () =>
          (async () =>
            this.algoliaIndex.setSettings({
              searchableAttributes,
              attributesForFaceting,
              customRanking
            }))(),
        e => unknownError(e instanceof Error ? e.message : "Unknown error")
      ),
      TaskEither.map(() => undefined)
    );
  }
}
