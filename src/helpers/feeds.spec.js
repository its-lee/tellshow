import { feeds } from './feeds';
import feedMessages from '@/locales/en-gb/feed';

describe('helpers/feeds', () => {
  Object.entries(feeds).forEach(([feed]) => {
    it(`is set up so that the defined feed '${feed}' has a i18n entry`, () => {
      expect(feedMessages.feeds[feed]).toBeDefined();
    });
  });
});
