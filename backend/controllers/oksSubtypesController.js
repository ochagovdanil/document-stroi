const OksSubtypeModel = require('../models/OksSubtype');

// Получить список всех подтипов ОКС по типу ОКС
const getOksSubtypes = async (req, res) => {
	const { ids } = req.body;

	try {
		const oksSubtypes = await OksSubtypeModel.find({
			oks_subtype_id: { $in: ids },
		});

		res.json(oksSubtypes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getOksSubtypes };
