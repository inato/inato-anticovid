import { trialIdFactory } from '../trial';

import { subscriptionFactory } from './subscriptionFactory';

describe('Subscription', () => {
  describe('buildWithNewSearchResultsAndEmailSentDate', () => {
    it('should append new search results', () => {
      const originalSearchResults = [
        trialIdFactory('trialId1'),
        trialIdFactory('trialId2'),
      ];
      const newSearchResults = [trialIdFactory('trialId3')];
      const subscription = subscriptionFactory({
        searchResults: originalSearchResults,
      });
      expect(
        subscription.buildWithNewSearchResultsAndEmailSentDate({
          newSearchResults,
          lastEmailSentDate: new Date(),
        }).searchResults,
      ).toStrictEqual([...originalSearchResults, ...newSearchResults]);
    });
  });
});
