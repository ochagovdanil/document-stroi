const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
	name: String,
});

const ProjectModel = mongoose.model('project', ProjectSchema);

module.exports = ProjectModel;
