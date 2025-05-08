const SharedProjectModel = require('../models/SharedProject');

// Получить все доступные мне проекты по поисковым параметрам
const getSharedProjectsByParams = async (req, res) => {
	const { uid, query, dateStart, dateEnd } = req.body;

	try {
		// Базовые условия поиска
		const searchConditions = {
			userId: uid,
		};

		if (query && query.trim() !== '') {
			searchConditions.name = { $regex: query, $options: 'i' };
		}

		if (dateStart !== '') {
			searchConditions.dateStart = dateStart;
		}

		if (dateEnd !== '') {
			searchConditions.dateEnd = dateEnd;
		}

		// Выполняем поиск с собранными условиями
		const sharedProjects = await SharedProjectModel.find(searchConditions);
		res.json(sharedProjects.reverse());
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getSharedProjectsByParams };
