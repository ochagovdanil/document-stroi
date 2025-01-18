const ProjectModel = require('../models/Project');

// Returns all projects in a MongoDB document
const getProjects = async (_req, res) => {
	const projects = await ProjectModel.find();

	res.json(projects);
};

module.exports = { getProjects };
