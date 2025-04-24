const mongoose = require('mongoose');

// Тип материала
const MaterialTypeSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const MaterialTypeModel = mongoose.model('material_type', MaterialTypeSchema);

module.exports = MaterialTypeModel;
