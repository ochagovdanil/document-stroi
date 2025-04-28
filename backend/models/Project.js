const mongoose = require('mongoose');

// Проект
const ProjectSchema = new mongoose.Schema({
	userId: String,
	name: String,
	image: String,
	dateStart: String,
	dateEnd: String,
	documents: Array,
});

const ProjectModel = mongoose.model('project', ProjectSchema);

module.exports = ProjectModel;
