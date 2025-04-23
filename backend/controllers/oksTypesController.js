const OksTypeModel = require('../models/OksType');

// Получить список всех типов ОКС
const getOksTypes = async (_req, res) => {
	const oksTypes = await OksTypeModel.find();

	res.json(oksTypes);
};

module.exports = { getOksTypes };
