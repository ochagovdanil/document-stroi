const mongoose = require('mongoose');

// Особые условия эксплуатации
const SpecialCaseSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const SpecialCaseModel = mongoose.model('special_case', SpecialCaseSchema);

module.exports = SpecialCaseModel;
