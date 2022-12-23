const express = require('express');
const helpOffersController = express.Router();

const dbFactory = require('../db-factory');

// Only admins/moderators can get all help offers
helpOffersController.get('/', async (req, res) => {
	const helpOffersDbService = dbFactory.createHelpOffersDbService();
	
	const allHelpOffers = await helpOffersDbService.getAll();

	res.status(200).send(allHelpOffers);
});

helpOffersController.get('/published', async (req, res) => {
	const helpOffersDbService = dbFactory.createHelpOffersDbService();
	
	const publishedHelpOffers = await helpOffersDbService.getPublished();

	res.status(200).send(publishedHelpOffers);
});

helpOffersController.post('/create-application', async (req, res) => {
	const helpOffersDbService = dbFactory.createHelpOffersDbService();
	
	const applicationId = await helpOffersDbService.createApplication(req.body);

	res.status(201).send({ message: 'Ok', applicationId });
});

// Only admins/moderators can publish
helpOffersController.patch('/publish-application/:applicationId', async (req, res) => {
	const helpOffersDbService = dbFactory.createHelpOffersDbService();

	await helpOffersDbService.publishApplication(req.params.applicationId);

	res.status(200).send({ message: 'Ok' });
});

module.exports = helpOffersController;
