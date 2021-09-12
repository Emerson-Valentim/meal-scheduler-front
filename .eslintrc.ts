// eslint-disable-next-line import/no-anonymous-default-export
export default {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'prettier',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', '@typescript-eslint'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never']
  },
};
