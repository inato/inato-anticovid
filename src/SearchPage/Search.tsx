import React from "react";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  SortBy,
  Pagination
} from "react-instantsearch-dom";

import { ClinicalTrialHit } from "./ClinicalTrialHit";

const applicationId = "QC98I887KP";
const apiKey = "8675d3f84bdc4dd1412aa3baa1854319";
const searchClient = algoliasearch(applicationId, apiKey);

const indexName = "prod_data";

export const SearchPage = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Header />
      <Content />
      <Pagination />
    </InstantSearch>
  );
};

const Header = () => (
  <header className="header">
    <SearchBox
      translations={{ placeholder: "Search for clinical trials on Covid" }}
    />
  </header>
);

const Content = () => (
  <main>
    <div>
      <Stats />{" "}
      <SortBy
        defaultRefinement={indexName}
        items={[{ value: indexName, label: "Most Relevant" }]}
      />
    </div>

    <Hits hitComponent={ClinicalTrialHit} />
  </main>
);
