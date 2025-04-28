const ProjectModel = require('../models/Project');

// Получить все проекты для текущего userId
const getProjectsByUid = async (req, res) => {
	const { uid } = req.body;

	try {
		const projects = await ProjectModel.find({
			userId: uid,
		});

		res.json(projects.reverse());
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getProjectsByUid };
