const mongoose = require('mongoose');

// Назначение материала
const MaterialUseSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const MaterialUseModel = mongoose.model('material_use', MaterialUseSchema);

module.exports = MaterialUseModel;
