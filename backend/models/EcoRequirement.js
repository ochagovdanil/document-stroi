const mongoose = require('mongoose');

// Экологические и санитарные требования
const EcoRequirementSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const EcoRequirementModel = mongoose.model(
	'eco_requirement',
	EcoRequirementSchema
);

module.exports = EcoRequirementModel;
