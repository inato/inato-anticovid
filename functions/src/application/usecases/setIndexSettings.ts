import { IndexingService } from "../services";

export const setIndexSettings = ({
  indexingService
}: {
  indexingService: IndexingService;
}) => indexingService.setSettings();
