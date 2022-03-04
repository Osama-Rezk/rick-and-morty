const isCI = require('is-ci');

module.exports = (_, config) => {
	const isDev = config.watchForFileChanges;
	console.log('isDev', isDev, isCI);
	if (!isCI) {
		config.baseUrl = 'http://localhost:3000';
	}
	Object.assign(config, {
		integrationFolder: 'cypress/e2e',
	});

	return config;
};
