const SpecialClimateZoneModel = require('../models/SpecialClimateZone');

// Получить список всех особых климатических зон
const getSpecialClimateZones = async (_req, res) => {
	const specialClimateZones = await SpecialClimateZoneModel.find();

	res.json(specialClimateZones);
};

module.exports = { getSpecialClimateZones };
