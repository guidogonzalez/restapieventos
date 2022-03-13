const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaUsuario = new Schema({
    nombre: {type: String},
    apellidos: {type: String},
    email: {type: String},
    fechaNacimiento: {type: Date},
    foto: {type: String},
    contrasena: {type: String}
});

module.exports = Usuario = mongoose.model('Usuario', schemaUsuario);