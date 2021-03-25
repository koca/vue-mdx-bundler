const configs = require('kcd-scripts/config')

const esModules = [
  'xdm',
  'unist-util-position-from-estree',
  'estree-walker',
  'periscopic',
  'remark-mdx-frontmatter',
  'js-yaml',
].join('|')

module.exports = Object.assign(configs.jest, {
  testEnvironment: './tests/jest.environment.js',
  transformIgnorePatterns: [`/node_modules/(?!${esModules}).+/`],
  transform: {
    '^.+\\.(js|ts|jsx|tsx|cjs|mjs)$': './tests/transform.js',
    // '.(ts|tsx)$': require.resolve('ts-jest/dist'),
    // '.(js|jsx)$': require.resolve('babel-jest'), // jest's default
    // '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  resolver: 'jest-module-field-resolver',
  snapshotSerializers: ['jest-serializer-vue'],
})
