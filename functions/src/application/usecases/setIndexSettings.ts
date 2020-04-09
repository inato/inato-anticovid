import { IndexingService } from '../services';
import {
  orderedSearchableAttributes,
  orderedFacets,
  orderedCustomRanking,
  attributesToHighlight,
} from '../../domain';

export const setIndexSettings = ({
  indexingService,
}: {
  indexingService: IndexingService;
}) =>
  indexingService.setSettings({
    searchableAttributes: orderedSearchableAttributes,
    attributesForFaceting: orderedFacets,
    customRanking: orderedCustomRanking,
    attributesToHighlight,
  });
