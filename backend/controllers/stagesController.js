const StageModel = require('../models/Stage');

// Получить список всех этапов строительства
const getStages = async (_req, res) => {
	const stages = await StageModel.find();

	res.json(stages);
};

module.exports = { getStages };
