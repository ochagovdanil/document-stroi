const SharedProjectModel = require('../models/SharedProject');
const ProjectModel = require('../models/Project');

// Сохранить новый доступный мне проект
const saveSharedProject = async (req, res) => {
	const { userId, uri } = req.body;

	const finalUri = uri.slice(0, uri.length - 1);
	const accessRight = uri[uri.length - 1];

	try {
		// Вытягиваем проект по _id, который надо добавить текущему юзеру
		const project = await ProjectModel.findById(finalUri);

		if (!project)
			return res.status(404).json({
				error: 'Не удалось найти проект по данной ссылке!',
			});

		// Проверяем если у данного пользователя уже есть проект с таким же названием
		const projectsWithDuplicateNames = await SharedProjectModel.find({
			userId,
		});
		const isNameAlreadyExists = projectsWithDuplicateNames.some(
			prj => prj.name === project.name
		);

		if (isNameAlreadyExists)
			return res.status(409).json({
				error: 'Доступный проект с таким именем уже существует для данного пользователя!',
			});

		// Сохраняем доступный мне проект текущему юзеру
		const newProject = new SharedProjectModel({
			userId,
			name: project.name,
			image: project.image,
			dateStart: project.dateStart,
			dateEnd: project.dateEnd,
			documents: project.documents,
			access: accessRight, // r | w
		});

		await newProject.save();
		res.status(201).json(newProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { saveSharedProject };
