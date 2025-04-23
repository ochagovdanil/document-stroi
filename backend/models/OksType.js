const mongoose = require('mongoose');

// Тип ОКС
const OksTypeSchema = new mongoose.Schema({
	name: String,
	oks_subtype_ids: Array,
});

const OksTypeModel = mongoose.model('oks_type', OksTypeSchema);

module.exports = OksTypeModel;
