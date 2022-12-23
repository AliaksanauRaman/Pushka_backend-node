const helpOffersController = require('./help-offers/help-offers.controller');

module.exports = (expressApp) => {
	expressApp.use('/help-offers', helpOffersController);
};
