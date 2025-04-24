const ClimateZoneModel = require('../models/ClimateZone');

// Получить список всех климатических зон
const getClimateZones = async (_req, res) => {
	const climateZones = await ClimateZoneModel.find();

	res.json(climateZones);
};

module.exports = { getClimateZones };
