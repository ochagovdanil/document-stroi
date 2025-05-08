const mongoose = require('mongoose');

// Нормативный документ
const DocumentSchema = new mongoose.Schema({
	name: String,
	link: String,
	document_id: Number,
	category: String,
	type: String,
});

const DocumentModel = mongoose.model('document', DocumentSchema);

module.exports = DocumentModel;
