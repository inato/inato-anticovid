import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import config from "../../config";
import { colors } from "../../ui";

import { searchStateToUrl } from "./SearchPage";

const searchSuggestionCollection = "suggestions";

export interface SearchSuggestion {
  name: string;
  study_type?: Array<string>;
  recruitment_status?: Array<string>;
}

export const SearchSuggestions = () => {
  const [searchSuggestions, setSearchSuggestions] = useState<
    Array<SearchSuggestion>
  >([]);

  useEffect(() => {
    const suggestions: Array<SearchSuggestion> = [];
    const fetchSuggestions = async () => {
      const app = initializeApp(config.firebase);
      const docs = await app
        .firestore()
        .collection(searchSuggestionCollection)
        .get();
      docs.forEach(suggestion =>
        suggestions.push({
          ...suggestion.data(),
          name: suggestion.id
        } as SearchSuggestion)
      );
      setSearchSuggestions(suggestions);
    };
    fetchSuggestions();
  }, []);

  const history = useHistory();

  return searchSuggestions.length > 0 ? (
    <Container>
      <SecondaryText>or try our suggestions: </SecondaryText>
      {searchSuggestions.map((searchSuggestion, index) => (
        <Suggestion
          to={searchStateToUrl(history.location, {
            refinementList: searchSuggestion
          })}
          key={searchSuggestion.name}
        >
          {searchSuggestion.name}
          {index < searchSuggestions.length - 1 ? "," : null}{" "}
        </Suggestion>
      ))}
    </Container>
  ) : null;
};

const Suggestion = styled(Link)`
  display: inline-block;
  text-decoration: none;
  padding: 2px;
  color: ${colors.Primary};
  border: none;
  background: none;
  font-size: 14px;

  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 0.8;
  }

  &::after {
    content: "";
    background: ${colors.Primary};
    display: block;
    height: 2px;
    width: 0;
    transition: width 0.3s;
  }

  &:hover::after {
    content: "";
    width: 100%;
    transition: width 0.3s;
  }
`;

const Container = styled.div`
  margin-top: 4px;
`;
const SecondaryText = styled.span`
  color: ${colors.SecondaryText};
`;
