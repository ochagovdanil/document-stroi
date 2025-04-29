const ProjectModel = require('../models/Project');

// Удалить проект по названию
const removeProjectByName = async (req, res) => {
	const { name } = req.body;

	try {
		const result = await ProjectModel.deleteOne({ name: name });

		if (result.deletedCount === 0) {
			return res.status(404).json({ error: 'Project not found' });
		}

		res.status(200).json({ message: 'Project deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { removeProjectByName };
