const MaterialUseModel = require('../models/MaterialUse');

// Получить список всех назначений материалов
const getMaterialUses = async (_req, res) => {
	const materialUses = await MaterialUseModel.find();

	res.json(materialUses);
};

module.exports = { getMaterialUses };
