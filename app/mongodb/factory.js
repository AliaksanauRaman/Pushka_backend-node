const mongoDbClient = require("./client");

const HelpOffersMongoDbService = require("../help-offers/help-offers-mongodb.service");

const DbClientLoggerDecorator = require("../classes/db-client-logger-decorator");

class MongoDbFactory {
	createClient() {
		return new DbClientLoggerDecorator(mongoDbClient);
	}

	createHelpOffersDbService() {
		return new HelpOffersMongoDbService(mongoDbClient.getDbInstance());
	}
}

module.exports = MongoDbFactory;
