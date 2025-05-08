const mongoose = require('mongoose');

// Проект, которым поделились
const SharedProjectSchema = new mongoose.Schema({
	userId: String,
	name: String,
	image: String,
	dateStart: String,
	dateEnd: String,
	documents: Array,
	access: String, // r | w
});

const SharedProjectModel = mongoose.model(
	'shared_project',
	SharedProjectSchema
);

module.exports = SharedProjectModel;
