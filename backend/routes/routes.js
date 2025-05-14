const express = require('express');

const { getErr } = require('../controllers/errorController');
const { getDocuments } = require('../controllers/documentsController');
const { getOksTypes } = require('../controllers/oksTypesController');
const { getOksSubtypes } = require('../controllers/oksSubtypesController');
const { getStages } = require('../controllers/stagesController');
const { getMaterialTypes } = require('../controllers/materialTypesController');
const { getMaterialUses } = require('../controllers/materialUsesController');
const {
	getEcoRequirements,
} = require('../controllers/ecoRequirementsController');
const { getSpecialCases } = require('../controllers/specialCasesController');
const { getClimateZones } = require('../controllers/climateZonesController');
const {
	getSpecialClimateZones,
} = require('../controllers/specialClimateZonesController');
const { getInventions } = require('../controllers/inventionsController');
const { saveProject } = require('../controllers/saveProjectController');
const {
	saveSharedProject,
} = require('../controllers/saveSharedProjectController');
const {
	getProjectsLength,
} = require('../controllers/projectsLengthController');
const {
	getSharedProjectsLength,
} = require('../controllers/sharedProjectsLengthController');
const {
	getProjectsByParams,
} = require('../controllers/projectsByParamsController');
const {
	removeProjectByName,
} = require('../controllers/removeProjectByNameController');
const {
	removeSharedProjectByName,
} = require('../controllers/removeSharedProjectByNameController');
const { getProjectByName } = require('../controllers/projectByNameController');
const {
	getSharedProjectByName,
} = require('../controllers/sharedProjectByNameController');
const {
	getSharedProjectsByParams,
} = require('../controllers/sharedProjectsByParamsController');

const router = express.Router();

// Список нормативных документов через их ID
router.post('/documents', getDocuments);

// Список всех типов ОКС
router.get('/oks-types', getOksTypes);

// Список подтипов ОКС по типу ОКС
router.post('/oks-subtypes', getOksSubtypes);

// Список всех этапов строительства
router.get('/stages', getStages);

// Список всех типов материалов
router.get('/material-types', getMaterialTypes);

// Список всех назначений материалов
router.get('/material-uses', getMaterialUses);

// Список всех экологических и санитарных требований
router.get('/eco-requirements', getEcoRequirements);

// Список всех особых условий эксплуатации
router.get('/special-cases', getSpecialCases);

// Список всех климатических зон
router.get('/climate-zones', getClimateZones);

// Список всех особых климатических зон
router.get('/special-climate-zones', getSpecialClimateZones);

// Список всех форм собственности
router.get('/inventions', getInventions);

// Сохранить новый проект
router.post('/save-project', saveProject);

// Сохранить новый доступный мне проект
router.post('/save-shared-project', saveSharedProject);

// Число проектов для userId
router.post('/projects-length', getProjectsLength);

// Число доступных мне проектов для userId
router.post('/shared-projects-length', getSharedProjectsLength);

// Все проекты по поисковым параметрам
router.post('/projects', getProjectsByParams);

// Все доступные мне проекты по поисковым параметрам
router.post('/shared-projects', getSharedProjectsByParams);

// Проект по названию
router.get('/projects/:name', getProjectByName);

// Доступный мне проект по названию
router.post('/shared-projects/:name', getSharedProjectByName);

// Удалить проект по названию
router.delete('/projects', removeProjectByName);

// Удалить доступный мне проект по названию
router.delete('/shared-projects', removeSharedProjectByName);

// Handle 404 error
router.get('*', getErr);

module.exports = router;
