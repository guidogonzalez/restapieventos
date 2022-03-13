const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaEvento = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    fechaEvento: {type: Date},
    fotos: {type: String},
    precio: {type: Number},
    idCreador: {type: String},
    fotoCreador: {type: String},
    nombreCreador: {type: String}
});

module.exports = Evento = mongoose.model('Evento', schemaEvento);