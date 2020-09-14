import * as Either from 'fp-ts/lib/Either';
import * as Option from 'fp-ts/lib/Option';
import algoliasearch, { SearchIndex } from 'algoliasearch';

import {
  trialFactory,
  trialIdFactory,
  facetFiltersFactory,
  orderedCustomRanking,
  orderedSearchableAttributes,
  orderedFacets,
  attributesToHighlight,
} from '../../domain';
import { loggingServiceFactory } from '../../application';

import { AlgoliaIndexingService } from './AlgoliaIndexingService';

const TEST_API_KEY = 'a13b2921031d090fc9a870816ffc98b3';
const ALGOLIA_CLIENT_ID = 'QC98I887KP';
const INDEX_NAME = `test_data_${Math.floor(Math.random() * 10000)}`;

const ALGOLIA_CLIENT = algoliasearch(ALGOLIA_CLIENT_ID, TEST_API_KEY);
const TEST_INDEX = ALGOLIA_CLIENT.initIndex(INDEX_NAME);

const algoliaIndexingServiceFactory = (algoliaIndex: SearchIndex) => {
  return new AlgoliaIndexingService({
    algoliaIndex,
    loggingService: loggingServiceFactory(),
  });
};

describe('AlgoliaIndexingService', () => {
  beforeEach(async () => {
    await TEST_INDEX.clearObjects().wait();
  });

  afterAll(async () => {
    await TEST_INDEX.delete().wait();
  });

  describe('setSettings', () => {
    it('should call setSettings index method', async () => {
      const indexingService = algoliaIndexingServiceFactory(TEST_INDEX);
      const result = await indexingService.setSettings({
        customRanking: orderedCustomRanking,
        searchableAttributes: orderedSearchableAttributes,
        attributesForFaceting: orderedFacets,
        attributesToHighlight,
      })();

      expect(result).toStrictEqual(Either.right(undefined));
    });
  });

  describe('indexTrials', () => {
    it('should index trials', async () => {
      const indexingService = algoliaIndexingServiceFactory(TEST_INDEX);
      const result = await indexingService.indexTrials([
        trialFactory({ trialId: trialIdFactory('trialId1') }),
        trialFactory({ trialId: trialIdFactory('trialId2') }),
      ])();

      expect(result).toStrictEqual(Either.right(['trialId1', 'trialId2']));
    });
  });

  describe('searchTrials', () => {
    it('should find trials about Chloroquine with 100 recruitment target maximum', async () => {
      const indexingService = algoliaIndexingServiceFactory(TEST_INDEX);
      const registrationDate = new Date();
      await indexingService.indexTrials(
        [
          trialFactory({
            trialId: trialIdFactory('trialId1'),
            publicTitle: 'Chloroquine',
            registrationDate,
            totalRecruitmentSize: 1,
          }),
          trialFactory({
            trialId: trialIdFactory('trialId2'),
            publicTitle: 'Chloroquine',
            totalRecruitmentSize: 1000,
          }),
          trialFactory({ trialId: trialIdFactory('trialId3') }),
        ],
        { wait: true },
      )();

      await indexingService.setSettings({
        customRanking: orderedCustomRanking,
        searchableAttributes: orderedSearchableAttributes,
        attributesForFaceting: orderedFacets,
        attributesToHighlight,
      })();

      const results = await indexingService.searchTrials({
        searchQuery: Option.some('Chloroqune'),
        facetFilters: facetFiltersFactory({
          totalRecruitmentSize: { min: undefined, max: 100 },
        }),
      })();

      expect(results).toStrictEqual(
        Either.right([
          {
            publicTitle: 'Chloroquine',
            registrationDate,
            trialId: 'trialId1',
          },
        ]),
      );
    });
  });
});
