const mongoose = require('mongoose');

// Особые климатические зоны
const SpecialClimateZoneSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const SpecialClimateZoneModel = mongoose.model(
	'special_climate_zone',
	SpecialClimateZoneSchema
);

module.exports = SpecialClimateZoneModel;
