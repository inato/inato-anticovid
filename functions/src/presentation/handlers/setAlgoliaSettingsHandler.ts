import * as functions from 'firebase-functions';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TaskEither from 'fp-ts/lib/TaskEither';
import * as Task from 'fp-ts/lib/Task';

import {
  setIndexSettings,
  IndexingService,
  ReportingService,
} from '../../application';

export const setAlgoliaSettingsHandler = ({
  indexingService,
  reportingService,
}: {
  reportingService: ReportingService;
  indexingService: IndexingService;
}) => (_request: functions.https.Request, response: functions.Response<any>) =>
  pipe(
    setIndexSettings({ indexingService }),
    TaskEither.fold(
      error => {
        reportingService.reportError(error.toError());
        response.status(500).send(error.reason);
        return Task.of(undefined);
      },
      () => {
        response.send(`Algolia settings have been set`);
        return Task.of(undefined);
      },
    ),
  )();
