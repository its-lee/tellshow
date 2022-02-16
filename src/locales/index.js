import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const loadViaFs = () => {
  const messages = {};
  // We can't load all locales using the webpack technique via require.context in index.js
  // as the unit tests aren't run post-webpack build. So we'll load them equivalently using fs.
  readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .forEach(locale => {
      // Find the locale directory
      const localeDir = path.join(__dirname, locale);
      readdirSync(localeDir).forEach(filename => {
        // Load the content and place it in the correct position in messages.
        const content = readFileSync(path.join(localeDir, filename));
        const name = filename.split('.')[0];
        messages[locale] = messages[locale] || {};
        messages[locale][name] = JSON.parse(content);
      });
    });
  return messages;
};

const loadViaWebpack = () => {
  const messages = {};

  // Require all json files in subfolders, recursively
  const files = require.context('.', true, /^.*\.json$/);

  files.keys().forEach(file => {
    const [, locale, filename] = file.split('/');

    // Ensure the locale exists before attempting to set on it
    messages[locale] = messages[locale] || {};

    // Create name by removing ./ and .json from the relative filepath key
    const name = filename.replace(/(\.\/|\.json)/g, '');

    // Add the i18n file content to the final set of messages
    messages[locale][name] = files(file);
  });

  return messages;
};

export default process.env.JEST_WORKER_ID ? loadViaFs() : loadViaWebpack();
