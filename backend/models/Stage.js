const mongoose = require('mongoose');

// Этап строительства
const StageSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const StageModel = mongoose.model('stage', StageSchema);

module.exports = StageModel;
