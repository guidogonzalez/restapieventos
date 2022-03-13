const controladorUsuario = require('../controllers/UsuariosController');
const express = require('express');
const { Router } = require('express');

const ruta = express.Router();

const upload = require('../middleware/upload');
const autenticar = require('../middleware/autenticar')

ruta.get('/usuario/:id', autenticar, controladorUsuario.buscarUsuario);

ruta.post('/registrar', upload.single('foto'), controladorUsuario.registrarUsuario);

ruta.put('/usuario/:id', autenticar, upload.single('foto'), controladorUsuario.actualizarUsuario);

ruta.post('/login', controladorUsuario.login);

module.exports = ruta;