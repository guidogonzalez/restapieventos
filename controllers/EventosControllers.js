const mongoose = require('mongoose');
const Evento = require('../models/Evento');

const consultarEventos = (req, res) => {
    Evento.find((err, eventos) => {

        if (err) {
            res.status(409).json({
                codigo: "EREVT001",
                mensaje: "Ha ocurrido un error al recuperar los eventos."
            })
        }

        res.status(200).json(eventos);
    })
};

const consultarEvento = (req, res) => {
    Evento.findById(req.params.id, (err, evento) => {

        if (err) {
            res.status(409).json({
                codigo: "ERUSR001",
                mensaje: "No se ha encontrado el usuario."
            })
        }

        res.status(200).json(evento);
    })
};

const crearEvento = (req, res) => {
    let evento = new Evento({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fechaEvento: req.body.fechaEvento,
        fotos: req.body.fotos,
        precio: req.body.precio,
        idCreador: req.body.idCreador,
        fotoCreador: req.body.fotoCreador,
        nombreCreador: req.body.nombreCreador
    })
    if (req.files) {
        let path = ''
        req.files.forEach(function(files, index, arr) {
            path += files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        path = path.replace('\\', '/');
        evento.fotos = path
    }

    evento.save((err, usr) =>{

        if (err) {
            res.status(409).json({
                codigo: "EREVT002",
                mensaje: "Ha ocurrido un error al crear el evento."
            })
        }

        res.status(200).json(usr)
    })
};

const actualizarEvento = (req, res) => {

    try {
        Evento.findById(req.params.id).then((evento) => {

            if (req.body.nombre && req.body.nombre != evento.nombre) {
                evento.nombre = req.body.nombre
            }

            if (req.body.descripcion && req.body.descripcion != evento.descripcion) {
                evento.descripcion = req.body.descripcion
            }

            if (req.body.fechaEvento && req.body.fechaEvento != evento.fechaEvento) {
                evento.fechaEvento = req.body.fechaEvento
            }

            if (req.body.precio && req.body.precio != evento.precio) {
                evento.precio = req.body.precio
            }

            if (req.body.fotoCreador && req.body.fotoCreador != evento.fotoCreador) {
                evento.fotoCreador = req.body.fotoCreador
            }

            if (req.body.nombreCreador && req.body.nombreCreador != evento.nombreCreador) {
                evento.nombreCreador = req.body.nombreCreador
            }

            if (req.file) {
                path = req.file.path;
                path = path.replace('\\', '/');
                if (evento.fotos != path) {
                    evento.fotos = path
                }
            }

            evento.save();
            res.send(evento);
        })

    } catch (error) {
        res.status(409).json({
            mensaje: "Ha ocurrido un error al actualizar el usuario.",
            codigo: "ERUSR002"
        })
    }
};

const eliminarEvento = async (req, res) => {

    try {
        const evento = await Evento.findById(req.params.id);
        evento.remove();
        res.send(evento);

    } catch (error) {
        res.status(409).json({
            mensaje: "Ha ocurrido un error al actualizar el usuario.",
            codigo: "ERUSR002"
        })
    }
};

module.exports = { consultarEventos, consultarEvento, crearEvento, actualizarEvento, eliminarEvento }