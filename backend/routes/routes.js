const express = require('express');
const { getErr } = require('../controllers/errorController');
const { getProjects } = require('../controllers/projectsController');

const router = express.Router();

// Get all projects
router.get('/projects', getProjects);

// Handle 404 error
router.get('*', getErr);

module.exports = router;
