const ProjectModel = require('../models/Project');

// Получить проект по названию
const getProjectByName = async (req, res) => {
	const { name } = req.params;

	try {
		const project = await ProjectModel.findOne({ name });

		if (!project) {
			return res.status(404).json({ error: 'Project not found' });
		}

		res.status(200).json(project);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getProjectByName };
