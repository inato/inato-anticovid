import * as Option from 'fp-ts/lib/Option';

import { FacetFilters, facetFiltersFactory } from './Facets';

export interface Search {
  searchQuery: Option.Option<string>;
  facetFilters: FacetFilters;
}

export const searchFactory = ({
  searchQuery = Option.some('search'),
  facetFilters = facetFiltersFactory(),
}: Partial<Search> = {}): Search => ({ searchQuery, facetFilters });
