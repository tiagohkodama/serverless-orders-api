module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Not using a `project` here to avoid type-aware parsing which can
    // produce warnings when TypeScript versions differ between tools.
    sourceType: 'module',
    ecmaVersion: 2022
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    // Allow `any` in places for gradual typing/migration
    '@typescript-eslint/no-explicit-any': 'off',
    // Optional chaining followed by non-null assertion is used in this codebase;
    // disable the rule to avoid unsafe false positives for now.
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
  },
  ignorePatterns: ['dist/', 'node_modules/', 'coverage/', '.serverless/']
};
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Not using a `project` here to avoid type-aware parsing which can
    // produce warnings when TypeScript versions differ between tools.
    sourceType: 'module',
    ecmaVersion: 2022
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    // Allow `any` in places for gradual typing/migration
    '@typescript-eslint/no-explicit-any': 'off',
    // Optional chaining followed by non-null assertion is used in this codebase;
    // disable the rule to avoid unsafe false positives for now.
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
  },
  ignorePatterns: ['dist/', 'node_modules/', 'coverage/', '.serverless/']
};
