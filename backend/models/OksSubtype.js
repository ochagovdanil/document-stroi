const mongoose = require('mongoose');

// Подтип ОКС
const OksSubtypeSchema = new mongoose.Schema({
	name: String,
	oks_subtype_id: Number,
	document_ids: Array,
});

const OksSubtypeModel = mongoose.model('oks_subtype', OksSubtypeSchema);

module.exports = OksSubtypeModel;
