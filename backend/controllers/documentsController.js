const DocumentModel = require('../models/Document');

// Получить список нормативных документов по их ID
const getDocuments = async (req, res) => {
	const { ids } = req.body;

	try {
		const documents = await DocumentModel.find({
			document_id: { $in: ids },
		});

		res.json(documents);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { getDocuments };
