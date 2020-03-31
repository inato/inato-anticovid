import * as functions from "firebase-functions";
import { setIndexSettings, IndexingService } from "../../application";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";

export const setAlgoliaSettingsHandler = ({
  indexingService
}: {
  indexingService: IndexingService;
}) => (_request: functions.https.Request, response: functions.Response<any>) =>
  pipe(
    setIndexSettings({ indexingService }),
    TaskEither.fold(
      error => {
        response.status(500).send(error.reason);
        return Task.of(undefined);
      },
      () => {
        response.send(`Algolia settings have been set`);
        return Task.of(undefined);
      }
    )
  )();
