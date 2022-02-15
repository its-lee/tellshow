module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/vue'
    // 'eslint-config-prettier'
  ],
  globals: {
    Logger: 'readonly',
    webkit: 'readonly'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['prettier', 'vue'],
  root: false,
  rules: {
    curly: ['error', 'all'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
    'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        alphabetical: false,
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ]
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [],
        registeredComponentsOnly: true
      }
    ],
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue'],
        shouldMatchCase: false
      }
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        multiline: {
          allowFirstLine: false,
          max: 1
        },
        singleline: 20
      }
    ],
    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props']
      }
    ],
    'vue/no-useless-mustaches': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false
      }
    ],
    'vue/no-useless-v-bind': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false
      }
    ],
    'vue/no-v-html': 'off',
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'beforeCreate',
          'created',
          'beforeMount',
          'mounted',
          'beforeUpdate',
          'updated',
          'activated',
          'beforeDestroy',
          'destroyed',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
    // 'vue/singleline-html-element-content-newline': 'off',
    // 'vue/multiline-html-element-content-newline': 'off',
    // 'vue/sort-keys': [
    //   'error',
    //   'asc',
    //   {
    //     caseSensitive: true,
    //     ignoreChildrenOf: ['model'],
    //     ignoreGrandchildrenOf: ['computed', 'directives', 'inject', 'props', 'watch'],
    //     minKeys: 2,
    //     natural: false
    //   }
    // ]
  }
};
