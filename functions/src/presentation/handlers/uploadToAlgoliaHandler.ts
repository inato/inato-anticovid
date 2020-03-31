import * as functions from "firebase-functions";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";

import { refreshTrialIndex, IndexingService } from "../../application";
import { TrialRepository } from "../../domain";

export const uploadToAlgoliaHandler = ({
  trialRepository,
  indexingService
}: {
  trialRepository: TrialRepository;
  indexingService: IndexingService;
}) => (_request: functions.https.Request, response: functions.Response) =>
  pipe(
    refreshTrialIndex({
      trialRepository,
      indexingService
    }),
    TaskEither.fold(
      error => {
        response.status(500).send(error.reason);
        return Task.of(undefined);
      },
      trialsCount => {
        response.send(`Indexed ${trialsCount} trials`);
        return Task.of(undefined);
      }
    )
  )();
