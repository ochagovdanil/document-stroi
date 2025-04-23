const express = require('express');
const { getErr } = require('../controllers/errorController');
const { getDocuments } = require('../controllers/documentsController');
const { getOksTypes } = require('../controllers/oksTypesController');
const { getOksSubtypes } = require('../controllers/oksSubtypesController');

const router = express.Router();

// Список всех нормативных документов
router.get('/documents', getDocuments);

// Список всех типов ОКС
router.get('/oks-types', getOksTypes);

// Список всех подтипов ОКС по типу ОКС
router.post('/oks-subtypes', getOksSubtypes);

// Handle 404 error
router.get('*', getErr);

module.exports = router;
