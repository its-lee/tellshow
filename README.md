# tellshow

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![](https://erguotou520.github.io/vue-version-badge/vue2.x.svg)
![CI](https://github.com/Cygnut/tellshow/actions/workflows/ci.yml/badge.svg)

Vue + Tailwind app for accessing RSS feeds. This isn't normally possible due to CORS, but is supported in this case by a proxy. Hosted here - https://cygnut.github.io/tellshow/.

_Please note_ - before accessing the app, due to CORS, you will need to visit and request access via https://cors-anywhere.herokuapp.com/corsdemo.

## Development

Run the following to install development & production dependencies locally

```sh
npm install
```

The following commands will help you get going

```sh
# Compile and enable hot-reloading for development
npm run serve

# Compile and minify for production
npm run build

# Lint and fix files
npm run lint
```

## Visual Studio Code Extensions

If you are developing in Visual Studio Code, the following extensions are suggested:

- Vetur: General Vue tooling
- ESLint: This allows eslint errors to show up in the 'Problems' pane
- Prettier ESLint: Allows code to be auto-formatted according to eslint & prettier rules

### Format on Save

1. Open `User` or `Workspace` settings
2. Filter to the relevant settings with `Format on`
3. For `Editor: Default Formatter` - select `Prettier ESLint`
4. For `Format on Save` - check this box
5. For `Format on Input` and `Format on Paste` ensure these are both unchecked, as they are not supported

This will lead to (at time of writing), the following configuration being saved in .vscode/settings.json

```json
{
  "editor.defaultFormatter": "rvest.vs-code-prettier-eslint",
  "editor.formatOnSave": true
}
```

## Dependencies

Following https://vuejs.org/v2/guide/installation.html for a Vue 2 app. Vue 3 isn't supported (well) on Mac for development due to issues with node versions (14's okay, 16 isn't) clashing with webpack's requirements for Vue 3. We still want webpack, but we'll have to use it on Vue 2's terms.

### Install the Vue CLI globally

```sh
npm install -g @vue/cli
```

### From https://dev.to/lavikara/setup-vue-webpack-and-babel-boo - more dependencies

```sh
npm install vue vue-router core-js --save
```

### Dev dependencies for compiling the app

```sh
npm install webpack@^4.46.0 webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env vue-loader vue-template-compiler -D
```

### SCSS support

```sh
npm install node-sass@^6 sass-loader@^10 -D
```

### Tailwind

Following https://www.sanity.io/guides/tailwind-css-with-vue-js, https://gsc13.medium.com/how-to-configure-webpack-5-to-work-with-tailwindcss-and-postcss-905f335aac2 etc

We're using compatibility builds of the packages as there is (as of April 2021) a compatibility issue between tailwindcss and postcss (https://github.com/tailwindlabs/tailwindcss/discussions/2854).

```sh
npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 -D
npx tailwindcss init
```

In ./tailwind.config.js

```js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
```

In ./postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

Update webpack.config.js so that it processes css using postcss.

```js
config.module.rules.push({
  test: /\.css$/i,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              // Convert modern CSS into something most browsers can understand
              'postcss-preset-env',
              {
                // Options
              }
            ]
          ]
        }
      }
    }
  ]
});
```

Then include these in a global css/scss file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### i18n

```sh
npm install vue-i18n@8.27.0
```

In order to run i18n reports (experimental - finds unused & missing 18n keys), you must also install:

```sh
npm install vue-cli-plugin-i18n@~1.0.1 -D
```

For this to work, you also need to add it as a script in package.json:

```json
"scripts": {
    "i18n:report": "vue-cli-service i18n:report --src './src/**/*.?(js|ts|vue)' --locales './src/locales/**/*.json'"
}
```

You'll also get an error unless you have a vue.config.js file containing at least:

```js
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en-gb',
      fallbackLocale: 'en-gb',
      localeDir: 'locales',
      // This is advised just to avoid overengineering i18n.
      enableInSFC: false,
      enableLegacy: false
    }
  }
};
```

_Note - this not find missing i18n keys between different locales - you'd need to write a unit test for this._

### Linting

Supporting detection of eslint lint violations during build:

```sh
npm install eslint@^6.8.0 eslint-loader@^4.0.2 eslint-plugin-vue@^7.1.0 -D
```

Supporting detection of prettier formatting violations during build:

```sh
npm install prettier@^1.19.1 eslint-plugin-prettier@^3.3.1 eslint-config-prettier@^6.15.0 @vue/eslint-config-prettier@^6.0.0 -D
```

Supporting eslint & prettier VSCode Extensions (ESLint & Prettier ESLint)

```sh
npm install prettier-eslint@10.1.0 vue-eslint-parser@~7.1.0 -D
```

### Unit testing

To support unit tests (following https://vue-test-utils.vuejs.org/installation/#semantic-versioning - this adds @vue/cli-plugin-unit-jest@^4.5.15 to devDependencies)

```sh
vue add unit-jest
```

For Vue Test Utils:

```sh
npm install @vue/test-utils@^1.3.0 -D
```

To allow jest to capture and report on code coverage, at the very least we need to add the following to jest.config.js

```json
{
  "collectCoverage": true,
  "collectCoverageFrom": ["**/*.{js,ts,vue}", "!**/node_modules/**", "!<rootDir>/dist/**"]
}
```

If you wish to place your tests next to their subjects, you'll need to add the following to jest.config.js

```json
{
  "testMatch": ["**/*.spec.js","**/*.spec.ts"]
}
```
