import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        languageOptions: { globals: globals.browser },
        rules: {
            quotes: ['error', 'single'],
            indent: ['error', 4],
            semi: ['error', 'always'],
            'no-undef': 'off',
            'eol-last': ['error', 'always'],
            'no-useless-catch': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'accessor-pairs': 'error',
            'eqeqeq': ['error', 'always'],
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    'accessibility': 'explicit'
                }
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    'selector': 'interface',
                    'format': ['PascalCase'],
                    'prefix': ['I']
                }
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    'allowExpressions': true,
                    'allowTypedFunctionExpressions': true,
                    'allowHigherOrderFunctions': true
                }
            ],
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
