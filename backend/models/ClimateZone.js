const mongoose = require('mongoose');

// Климатические зоны
const ClimateZoneSchema = new mongoose.Schema({
	name: String,
	document_ids: Array,
});

const ClimateZoneModel = mongoose.model('climate_zone', ClimateZoneSchema);

module.exports = ClimateZoneModel;
