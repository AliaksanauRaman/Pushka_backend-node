const environmentService = require('./services/environment.service');

module.exports = (expressApp) => {
	const port = environmentService.getPort();

	expressApp.listen(
		port,
		() => console.log(`Server is listening on port: ${port}...`),
	);
};
