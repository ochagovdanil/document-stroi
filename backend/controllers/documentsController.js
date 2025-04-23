const DocumentModel = require('../models/Document');

// Получить список всех нормативных документов
const getDocuments = async (_req, res) => {
	const documents = await DocumentModel.find();

	res.json(documents);
};

module.exports = { getDocuments };
