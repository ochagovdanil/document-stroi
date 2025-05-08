const SharedProjectModel = require('../models/SharedProject');

// Удалить доступный мне проект по названию
const removeSharedProjectByName = async (req, res) => {
	const { uid, name } = req.body;

	try {
		const result = await SharedProjectModel.deleteOne({
			userId: uid,
			name: name,
		});

		if (result.deletedCount === 0) {
			return res.status(404).json({ error: 'Shared project not found' });
		}

		res.status(200).json({
			message: 'Shared project deleted successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { removeSharedProjectByName };
