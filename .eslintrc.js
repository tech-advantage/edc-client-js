module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "@typescript-eslint/tslint"
  ],
  "rules": {
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "off",
      {
        "accessibility": "explicit"
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/naming-convention": ["error",
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'classProperty',
        format: ['camelCase', 'UPPER_CASE'],
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-inferrable-types": [
      "error",
      {
        "ignoreParameters": true
      }
    ],
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-shadow": [
      "error",
      {
        "hoist": "all"
      }
    ],
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/quotes": [
      "error",
      "single"
    ],
    "@typescript-eslint/semi": [
      "error",
      "always"
    ],
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "arrow-body-style": "error",
    "brace-style": [
      "error",
      "1tbs"
    ],
    "constructor-super": "error",
    "curly": "error",
    "dot-notation": "off",
    "eol-last": "error",
    "eqeqeq": [
      "error",
      "smart"
    ],
    "guard-for-in": "error",
    "id-blacklist": "off",
    "id-match": "off",
    "indent": "off",
    "max-len": [
      "error",
      {
        "code": 250
      }
    ],
    "no-bitwise": "error",
    "no-caller": "error",
    "no-console": [
      "error",
      {
        "allow": [
          "warn",
          "error",
        ]
      }
    ],
    "no-debugger": "error",
    "no-empty": "off",
    "no-empty-function": "off",
    "no-eval": "error",
    "no-fallthrough": "error",
    "no-new-wrappers": "error",
    "no-restricted-imports": [
      "error",
      "rxjs"
    ],
    "no-shadow": "off",
    "no-throw-literal": "error",
    "no-trailing-spaces": "off",
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "prefer-const": "error",
    "quotes": ["error", "single"],
    "radix": "error",
    "semi": "error",
    "spaced-comment": [
      "error",
      "always",
      {
        "markers": [
          "/"
        ]
      }
    ],
    "@typescript-eslint/tslint/config": [
      "error",
      {
        "rules": {
          "import-spacing": true,
          "whitespace": [
            true,
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type"
          ]
        }
      }
    ]
  }
};
