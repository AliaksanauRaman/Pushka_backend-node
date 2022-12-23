const { MongoClient } = require('mongodb');

const environmentService = require('../services/environment.service');

class MongoDbClient {
	#environmentService = null;
	#client = null;
	#dbInstance = null;

	constructor(environmentService) {
		this.#environmentService = environmentService;
	}

	getDbInstance() {
		if (this.#client === null) {
			throw new Error('Client is not connected yet!');
		}

		if (this.#dbInstance === null) {
			const dbName = this.#environmentService.getDbName();
			this.#dbInstance = this.#client.db(dbName);
		}

		return this.#dbInstance;
	}

	async connect() {
		const client = this.#createClient();
		this.#client = client;
		return client.connect();
	}

	async destroy() {
		if (this.#client === null) {
			throw new Error('Client is not connected yet!');
		}

		await this.#client.close();
	}

	#createClient = () => {
		const connectionUri = this.#environmentService.getMongoDbConnectionURI();
		return new MongoClient(connectionUri);
	}
}

module.exports = new MongoDbClient(environmentService);
