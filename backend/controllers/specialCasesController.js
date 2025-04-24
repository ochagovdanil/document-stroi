const SpecialCaseModel = require('../models/SpecialCase');

// Получить список всех особых условий эксплуатации
const getSpecialCases = async (_req, res) => {
	const specialCases = await SpecialCaseModel.find();

	res.json(specialCases);
};

module.exports = { getSpecialCases };
