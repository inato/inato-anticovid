import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
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
      if (!firebase.apps.length) {
        firebase.initializeApp(config.firebase);
      }

      const docs = await firebase
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
  ) : (
    <Container />
  );
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
    opacity: 0.7;
  }

  &:active {
    opacity: 1;
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
  min-height: 30px;
`;
const SecondaryText = styled.span`
  color: ${colors.SecondaryText};
`;
