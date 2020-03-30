import * as functions from "firebase-functions";
import { setIndexSettings, IndexingService } from "../../application";

export const setAlgoliaSettingsHandler = ({
  indexingService
}: {
  indexingService: IndexingService;
}) => async (
  _request: functions.https.Request,
  response: functions.Response<any>
) => {
  await setIndexSettings({ indexingService });

  response.send(`Algolia settings have been set`);
};
