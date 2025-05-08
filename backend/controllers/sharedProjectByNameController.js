const SharedProjectModel = require('../models/SharedProject');

// Получить доступный мне проект по названию
const getSharedProjectByName = async (req, res) => {
	const { name } = req.params;
	const { uid } = req.body;

	try {
		const project = await SharedProjectModel.findOne({ userId: uid, name });

		if (!project) {
			return res.status(404).json({ error: 'Shared project not found' });
		}

		res.status(200).json(project);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getSharedProjectByName };
