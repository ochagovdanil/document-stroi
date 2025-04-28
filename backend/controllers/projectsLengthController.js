const ProjectModel = require('../models/Project');

// Получить число проектов для текущего userId
const getProjectsLength = async (req, res) => {
	const { uid } = req.body;

	try {
		const projects = await ProjectModel.find({
			userId: uid,
		});

		res.json({
			length: projects.length,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getProjectsLength };
