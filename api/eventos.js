const controladorEvento = require('../controllers/EventosControllers');
const express = require('express');
const { Router } = require('express');

const ruta = express.Router();

const upload = require('../middleware/upload');
const autenticar = require('../middleware/autenticar')

ruta.get('/eventos', autenticar, controladorEvento.consultarEventos);
ruta.get('/eventos/:id', autenticar, controladorEvento.consultarEvento);
ruta.post('/nuevoEvento', autenticar, upload.array('fotos'), controladorEvento.crearEvento);
ruta.put('/eventos/:id', autenticar, upload.array('fotos'), controladorEvento.actualizarEvento);
ruta.delete('/eventos/:id', autenticar, controladorEvento.eliminarEvento);

module.exports = ruta;