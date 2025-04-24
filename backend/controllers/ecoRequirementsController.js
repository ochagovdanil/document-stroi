const EcoRequirementModel = require('../models/EcoRequirement');

// Получить список всех экологических и санитарных требований
const getEcoRequirements = async (_req, res) => {
	const ecoRequirements = await EcoRequirementModel.find();

	res.json(ecoRequirements);
};

module.exports = { getEcoRequirements };
