'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/doador-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
router.post('/login', _ctrl.autenticar);
router.post('/register', _ctrl.post);

//Privado
router.get('/', auth, _ctrl.get);
router.get('/:id', auth, _ctrl.getById);
router.post('/', auth, _ctrl.post);
router.put('/:id', auth, _ctrl.put);
router.delete('/:id', auth, _ctrl.delete);

module.exports = router;