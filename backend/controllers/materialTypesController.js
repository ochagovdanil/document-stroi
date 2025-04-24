const MaterialTypeModel = require('../models/MaterialType');

// Получить список всех типов материалов
const getMaterialTypes = async (_req, res) => {
	const materialTypes = await MaterialTypeModel.find();

	res.json(materialTypes);
};

module.exports = { getMaterialTypes };
