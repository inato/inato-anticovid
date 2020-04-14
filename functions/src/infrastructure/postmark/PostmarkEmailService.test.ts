import * as Option from 'fp-ts/lib/Option';

import { searchFactory, facetFiltersFactory } from '../../domain';

import { serializeSearchToQueryParams } from './PostmarkEmailService';

describe('PostmarkEmailService', () => {
  describe('serializeSearchToQueryParams', () => {
    it('should serialize search', () => {
      const search = searchFactory({
        searchQuery: Option.some('search'),
        facetFilters: facetFiltersFactory({
          recruitmentStatus: [],
          therapeuticClasses: [],
          surrogateOutcomesExtracted: [],
          clinicalOutcomesExtracted: [],
          studyTypes: [],
          countries: ['France'],
          hasResultsPublications: false,
          totalRecruitmentSize: { min: 500, max: undefined },
        }),
      });
      expect(serializeSearchToQueryParams(search)).toStrictEqual(
        'query=search&refinementList%5Bcountries%5D%5B0%5D=France&range%5Btotal_recruitment_size%5D%5Bmin%5D=500',
      );
    });
  });
});
