class DbClientLoggerDecorator {
	#dbClient;

	constructor(dbClient) {
		this.#dbClient = dbClient;
	}

	getDbInstance() {
		console.log('Reading db instance...');
		return this.#dbClient.getDbInstance();
	}

	async connect() {
		console.log('Trying to connect to db client...');
		const result = await this.#dbClient.connect();
		console.log('Connected successfully!');
		return result;
	}

	async destroy() {
		console.log('Trying to destroy db client...');
		const result = await this.#dbClient.destroy();
		console.log('Destroyed successfully!');
		return result;
	}
}

module.exports = DbClientLoggerDecorator;
