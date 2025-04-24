const InventionModel = require('../models/Invention');

// Получить список всех форм собственности
const getInventions = async (_req, res) => {
	const inventions = await InventionModel.find();

	res.json(inventions);
};

module.exports = { getInventions };
