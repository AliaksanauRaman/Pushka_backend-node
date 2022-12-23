class EnvironmentService {
	#environment;

	constructor(nodeJsProcessEnvironment) {
		this.#environment = nodeJsProcessEnvironment;
	}

	getPort() {
		const { PORT } = this.#environment;

		if (PORT === undefined) {
			throw new Error(`Current environment does not have 'PORT' value!`);
		}

		return Number(PORT); 
	}

	getMongoDbConnectionURI() {
		const { MONGO_DB_CONNECTION_URI } = this.#environment;

		if (MONGO_DB_CONNECTION_URI === undefined) {
			throw new Error(`Current environment does not have 'MONGO_DB_CONNECTION_URI' value!`);
		}

		return MONGO_DB_CONNECTION_URI;
	}

	getDbName() {
		const { DB_NAME } = this.#environment;

		if (DB_NAME === undefined) {
			throw new Error(`Current environment does not have 'DB_NAME' value!`);
		}

		return DB_NAME;
	}
}

module.exports = new EnvironmentService(process.env);