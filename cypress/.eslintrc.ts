module.exports = {
	root: true,
	plugins: ['eslint-plugin-cypress'],
	extends: ['react-app', 'plugin:cypress/recommended'],
	env: { 'cypress/globals': true },
	types: ['cypress', '@testing-library/cypress'],
};
