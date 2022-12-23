const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbFactory = require('./db-factory');
const setUpControllers = require('./set-up-controllers');
const startServer = require('./start-server');

async function main() {
	const expressApp = express();
	const dbClient = dbFactory.createClient();
	await dbClient.connect();

	expressApp.use(cors());
	expressApp.use(bodyParser.json());

	setUpControllers(expressApp);
	startServer(expressApp);
}

main();

process.on("SIGINT", async () => {
	await dbClient.destroy();
	process.exit();
});
