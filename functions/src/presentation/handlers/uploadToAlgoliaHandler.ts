import * as functions from "firebase-functions";

import { refreshTrialIndex, IndexingService } from "../../application";
import { TrialRepository } from "../../domain";

export const uploadToAlgoliaHandler = ({
  trialRepository,
  indexingService
}: {
  trialRepository: TrialRepository;
  indexingService: IndexingService;
}) => async (
  _request: functions.https.Request,
  response: functions.Response
) => {
  const trialsCount = await refreshTrialIndex({
    trialRepository,
    indexingService
  });
  response.send(`Indexed ${trialsCount} trials`);
};
