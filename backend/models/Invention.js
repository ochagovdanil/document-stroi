const mongoose = require('mongoose');

// Форма собственности
const InventionSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const InventionModel = mongoose.model('invention', InventionSchema);

module.exports = InventionModel;
