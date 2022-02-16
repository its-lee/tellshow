import messages from './index.js';

const defaultLocale = 'en-gb';

const findMismatchesFrom = (source, target, parentKeyPath = null) => {
  let mismatches = [];

  Object.entries(source).forEach(([key, value]) => {
    // Find any mismatches between our source key and the target at this level
    const keyPath = [parentKeyPath, key].filter(v => v).join('.');

    if (typeof value === 'object' && value !== null) {
      mismatches = mismatches.concat(findMismatchesFrom(value, target[key], keyPath));
    }

    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      mismatches.push(`Key '${keyPath}' present in one object, but not the other`);
    }
  });

  // Remove any empties introduced by recursion
  return mismatches.filter(v => v);
};

const findMismatches = (a, b) => {
  // For equality (and no mismatches), we need to ensure that both structures contain one another
  // - generally, this helps in removing extraneous/outdated keys.
  return findMismatchesFrom(a, b).concat(findMismatchesFrom(b, a));
};

const toMatchStructure = (actual, expected) => {
  const mismatches = findMismatches(actual, expected);

  return {
    message: () =>
      `expected ${expected} to match structure ${actual} - ${mismatches.length} mismatches: \n` +
      mismatches.join('\n'),
    pass: !mismatches.length
  };
};

expect.extend({
  toMatchStructure
});

describe('locales', () => {
  const knownLocale = messages[defaultLocale];

  Object.entries(messages).forEach(([locale, localeMessages]) => {
    it(`is set up so that the ${locale} locale have the same keys as the default locale (${defaultLocale})`, () => {
      expect(localeMessages).toMatchStructure(knownLocale);
    });
  });
});
