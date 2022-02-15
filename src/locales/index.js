const locales = {};

// Require all json files in subfolders, recursively.
const files = require.context('.', true, /^.*\.json$/);

files.keys().forEach(file => {
  const [, locale, filename] = file.split('/');

  // Ensure the locale exists before attempting to set on it.
  locales[locale] = locales[locale] || {};

  // Create name by removing ./ and .json from the relative filepath key.
  const name = filename.replace(/(\.\/|\.json)/g, '');

  // Add the i18n file content to the final set of locales
  locales[locale][name] = files(file);
});

export default locales;
