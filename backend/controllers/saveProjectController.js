const ProjectModel = require('../models/Project');

// Сохранить новый проект
const saveProject = async (req, res) => {
	const { userId, name, image, dateStart, dateEnd, documents } = req.body;

	try {
		// Проверяем если у данного пользователя уже есть проект с таким же названием
		const projectsWithDuplicateNames = await ProjectModel.find({ userId });
		const isNameAlreadyExists = projectsWithDuplicateNames.some(
			project => project.name === name
		);

		if (isNameAlreadyExists)
			return res.status(409).json({
				error: 'Проект с таким именем уже существует для данного пользователя!',
			});

		// Сохраняем проект
		const newProject = new ProjectModel({
			userId,
			name,
			image,
			dateStart,
			dateEnd,
			documents,
		});

		await newProject.save();
		res.status(201).json(newProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { saveProject };
