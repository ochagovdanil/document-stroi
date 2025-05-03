const ProjectModel = require('../models/Project');
const DocumentModel = require('../models/Document');

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

		// Если в проект были добавлены документы ручным способом (самим юзером), то их IDs надо инкрементировать от наибольшего имеющегося в БД
		// Находим наибольший document_id в таблице нормативных документов
		const allDocuments = await DocumentModel.find();
		let maxId = -1;

		for (document of allDocuments)
			if (document.document_id > maxId) maxId = document.document_id;

		// Инкрементируем IDs документов, которые были добавлены ручным способом (самим юзером)
		for (document of documents) {
			if (document.document_id === -1) document.document_id = ++maxId;
		}

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
