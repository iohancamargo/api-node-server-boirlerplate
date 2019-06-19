'use strict'

const express = require('express');
const auth = require('../middlewares/authentication');
const controller = require('../controllers/user-controller');

const router = express.Router();

let _ctrl = new controller();

//Publico
router.post('/register', _ctrl.post);
router.post('/login', _ctrl.autenticar);

//Privado
router.get('/', auth, _ctrl.get);
router.post('/', auth, _ctrl.post);
router.put('/:id', auth, _ctrl.put);
router.get('/:id', auth, _ctrl.getById);
router.delete('/:id', auth, _ctrl.delete);

module.exports = router;