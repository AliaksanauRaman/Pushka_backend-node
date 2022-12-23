const uuid = require('uuid');

const HELP_OFFERS_COLLECTION_NAME = 'help-offers';

class HelpOffersMongoDbService {
	#helpOffersCollection;

	constructor(dbInstance) {
		this.#helpOffersCollection = dbInstance.collection(HELP_OFFERS_COLLECTION_NAME);
	}

	async getAll() {
		const cursor = await this.#helpOffersCollection.find();
		const allHelpOffers = await cursor.toArray();
		return allHelpOffers;
	}

	async getPublished() {
		const cursor = await this.#helpOffersCollection.find({ isPublished: true });
		const publishedHelpOffers = await cursor.toArray();
		return publishedHelpOffers;
	}

	async createApplication(helpOfferDto) {
		const uniqueDocumentId = uuid.v4();
		
		const insertionResult = await this.#helpOffersCollection.insert({
			...helpOfferDto,
			isPublished: false,
			_id: uniqueDocumentId,
			createdAt: new Date(),
			lastModified: new Date(),
		});

		return insertionResult.insertedIds[0];
	}

	async publishApplication(applicationId) {
		const updateResult = await this.#helpOffersCollection.updateOne(
			{ _id: applicationId },
			{
				$set: { isPublished: true },
				$currentDate: { lastModified: true },
			},
		);

		return updateResult;
	}
}

module.exports = HelpOffersMongoDbService;
