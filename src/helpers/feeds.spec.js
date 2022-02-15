import { feeds, parseFeedOrDefault } from './feeds';
import appMessages from '@/locales/en-gb/app';

describe('helpers/feeds', () => {
  Object.entries(feeds).forEach(([feed]) => {
    it(`is set up so that the defined feed '${feed}' has a i18n entry`, () => {
      expect(appMessages.feeds[feed]).toBeDefined();
    });
  });

  it('parseFeedOrDefault returns a valid feed on a bad value passed', () => {
    const actual = parseFeedOrDefault('non-existing-feed-name');
    expect(feeds[actual]).toBeDefined();
  });

  it('parseFeedOrDefault returns the correct feed on a good value passed', () => {
    const expected = Object.keys(feeds)[0];
    const actual = parseFeedOrDefault(expected);
    expect(actual).toEqual(expected);
  });
});
