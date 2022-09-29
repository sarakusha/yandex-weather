/*
 * @license
 * Copyright (c) 2019. Nata-Info
 * @author Andrei Sarakeev <avs@nata-info.ru>
 *
 * This file is part of the "mcd" project.
 * For the full copyright and license information, please view
 * the EULA file that was distributed with this source code.
 */

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: [
    'import',
    '@typescript-eslint',
    // 'react-hooks',
    'sonarjs',
    'prettier',
    // 'tree-shaking',
  ],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    // 'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the
    // @typescript-eslint/eslint-plugin
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    // 'prettier/@typescript-eslint',
    // 'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended
    // configs e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // "import/extensions": ["error", "never"],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    // "react/jsx-indent": "off",
    // "react/prop-types": "off",
    // "react/jsx-curly-brace-presence": "off",
    // "react/state-in-constructor": "off",
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",
    // "spaced-comment": ["error", "always", { markers: ["/"] }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    // "@typescript-eslint/no-unused-vars": [
    //   "error",
    //   {
    //     ignoreRestSiblings: true,
    //     args: "after-used",
    //   },
    // ],
    // "@typescript-eslint/no-empty-function": "off",
    // "@typescript-eslint/no-empty-interface": "off",
    // "@typescript-eslint/explicit-function-return-type": [
    //   "warn",
    //   {
    //     allowExpressions: true,
    //     allowTypedFunctionExpressions: true,
    //     allowHigherOrderFunctions: true,
    //   },
    // ],
    // "@typescript-eslint/ban-ts-ignore": "off",
    // "arrow-parens": ["error", "as-needed"],
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'assert'] }],
    'no-nested-ternary': 'off',
    // "import/no-unresolved": [2, { ignore: [".png?inline"] }],
    // "no-unused-expressions": ["error", { allowShortCircuit: true }],
    // "import/no-extraneous-dependencies": [
    //   "error",
    //   { devDependencies: ["**/*.test.ts", "**/*.spec.ts", "**/*.mock.ts"] },
    // ],
    // "no-constant-condition": ["error", { checkLoops: false }],
    // "sonarjs/cognitive-complexity": ["warn", 20],
    // "react/jsx-no-duplicate-props": ["error", { ignoreCase: false }],
    // "react/jsx-wrap-multilines": [
    //   "error",
    //   { declaration: false, assignment: false },
    // ],
    // "@typescript-eslint/camelcase": "off",
    /* Ошибка импорта ts */
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'react/no-unknown-property': [
      2,
      {
        'ignore': [
          'jsx',
          'global'
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React
      // to use
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
