import React, { useEffect, useState, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import config from '../../../config';
import { colors } from '../../ui';
import { InternalLink } from '../../ui/InternalLink';

import { searchStateToUrl } from './SearchPage';

const searchSuggestionCollection = 'suggestions';

export interface SearchSuggestion {
  name: string;
  study_type?: Array<string>;
  recruitment_status?: Array<string>;
}

const Container = styled.div`
  margin-top: 4px;
  min-height: 30px;
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
          name: suggestion.id,
        } as SearchSuggestion),
      );
      setSearchSuggestions(suggestions);
    };
    fetchSuggestions();
  }, []);

  const history = useHistory();

  return searchSuggestions.length > 0 ? (
    <Container>
      <SecondaryText>or try our suggestions: </SecondaryText>
      {searchSuggestions.map(({ name, ...searchSuggestion }, index) => (
        <Fragment key={name}>
          <InternalLink
            to={searchStateToUrl(history.location, {
              refinementList: searchSuggestion,
            })}
          >
            {name}
          </InternalLink>
          {index < searchSuggestions.length - 1 ? ',' : null}{' '}
        </Fragment>
      ))}
    </Container>
  ) : (
    <Container />
  );
};
