import { IndexingService } from "../services";
import {
  orderedSearchableAttributes,
  orderedFacets,
  orderedCustomRanking
} from "../../domain";

export const setIndexSettings = ({
  indexingService
}: {
  indexingService: IndexingService;
}) =>
  indexingService.setSettings({
    searchableAttributes: orderedSearchableAttributes,
    attributesForFaceting: orderedFacets,
    customRanking: orderedCustomRanking
  });
