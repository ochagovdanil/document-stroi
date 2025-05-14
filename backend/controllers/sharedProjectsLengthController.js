const SharedProjectModel = require('../models/SharedProject');

// Получить число доступных мне проектов для текущего userId
const getSharedProjectsLength = async (req, res) => {
	const { uid } = req.body;

	try {
		const sharedProjects = await SharedProjectModel.find({
			userId: uid,
		});

		res.json({
			length: sharedProjects.length,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getSharedProjectsLength };
