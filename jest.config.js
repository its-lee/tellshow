module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.(test|spec).js'],

  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!<rootDir>/dist/**',
    '!<rootDir>/coverage/**'
  ]
};
