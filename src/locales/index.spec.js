import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const defaultLocale = 'en-gb';

// We can't load all locales using the webpack technique via require.context in index.js
// as the unit tests aren't run post-webpack build. So we'll load them equivalently using
// fs.
const loadLocalesWithoutWebpack = () => {
  const localeDirs = readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const locales = {};
  for (const localeDir of localeDirs) {
    locales[localeDir] = {};

    const localePath = path.join(__dirname, localeDir);
    for (const langFile of readdirSync(localePath)) {
      const content = readFileSync(path.join(localePath, langFile));
      const name = langFile.split('.')[0];
      locales[localeDir][name] = JSON.parse(content);
    }
  }
  return locales;
};

const locales = loadLocalesWithoutWebpack();

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
  const knownLocale = locales[defaultLocale];

  Object.entries(locales).forEach(([locale, messages]) => {
    it(`is set up so that the ${locale} locale have the same keys as the default locale (${defaultLocale})`, () => {
      expect(messages).toMatchStructure(knownLocale);
    });
  });
});
