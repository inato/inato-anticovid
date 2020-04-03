import * as Option from "fp-ts/lib/Option";
import { FacetFilters } from "./Facets";

export interface Search {
  searchQuery: Option.Option<string>;
  facetFilters: FacetFilters;
}
