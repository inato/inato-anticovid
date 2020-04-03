import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import config from "../../config";
import { colors, linkCss } from "../../ui";

import { searchStateToUrl } from "./SearchPage";

const searchSuggestionCollection = "suggestions";

export interface SearchSuggestion {
  name: string;
  study_type?: Array<string>;
  recruitment_status?: Array<string>;
}

const Container = styled.div`
  margin-top: 4px;
  min-height: 30px;
`;

const Suggestion = styled(Link)`
  ${linkCss};
`;

const SecondaryText = styled.span`
  color: ${colors.SecondaryText};
`;

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
        <>
          <Suggestion
            to={searchStateToUrl(history.location, {
              refinementList: searchSuggestion
            })}
            key={searchSuggestion.name}
          >
            {searchSuggestion.name}
          </Suggestion>
          {index < searchSuggestions.length - 1 ? "," : null}{" "}
        </>
      ))}
    </Container>
  ) : (
    <Container />
  );
};
