const smsController = require('../controllers/smsController');
const express = require('express');
const router = express.Router();


router.get('/recepcionMensajesAGV/:clienteID', smsController.getParams);


module.exports = router;