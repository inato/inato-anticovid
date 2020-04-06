import * as functions from "firebase-functions";
import { pipe } from "fp-ts/lib/pipeable";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";

import {
  refreshTrialIndex,
  IndexingService,
  LoggingService,
  ReportingService
} from "../../application";
import { TrialRepository } from "../../domain";

export const refreshAlgoliaTrialIndexHandler = ({
  trialRepository,
  indexingService,
  loggingService,
  reportingService
}: {
  reportingService: ReportingService;
  trialRepository: TrialRepository;
  indexingService: IndexingService;
  loggingService: LoggingService;
}) => (_request: functions.https.Request, response: functions.Response) =>
  pipe(
    refreshTrialIndex({
      trialRepository,
      indexingService,
      loggingService
    }),
    TaskEither.fold(
      error => {
        reportingService.reportError(error.toError());
        response.status(500).send(error.reason);
        return Task.of(undefined);
      },
      trialsCount => {
        response.send(`Indexed ${trialsCount} trials`);
        return Task.of(undefined);
      }
    )
  )();
