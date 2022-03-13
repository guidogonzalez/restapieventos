const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');
const res = require('express/lib/response');

const buscarUsuario = (req, res) => {
    Usuario.findById(req.params.id, (err, usuario) => {

        if (err) {
            res.status(409).json({
                codigo: "ERUSR001",
                mensaje: "No se ha encontrado el usuario."
            })
        }

        res.status(200).json(usuario);
    })
};

const registrarUsuario = (req, res) => {
    bcrypt.hash(req.body.contrasena, 10, function (err, hashedPass) {
        if (err) {
            res.status(409).json({
                error: err
            })
        }

        let usuario = new Usuario({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            fechaNacimiento: req.body.fechaNacimiento,
            contrasena: hashedPass
        })
        if (req.file) {

            path = req.file.path;
            path = path.replace('\\', '/');
            usuario.foto = path
        }

        usuario.save((err, usr) => {

            if (err) {
                res.status(409).json({
                    mensaje: "Ha ocurrido un error al crear el usuario.",
                    codigo: "ERUSR001"
                })
            }

            res.status(200).json(usr)
        })
    })
};

const actualizarUsuario = (req, res) => {

    try {
        Usuario.findById(req.params.id).then(async (usuario) => {

            if (req.body.nombre && req.body.nombre != usuario.nombre) {
                usuario.nombre = req.body.nombre
            }

            if (req.body.apellidos && req.body.apellidos != usuario.apellidos) {
                usuario.apellidos = req.body.apellidos
            }

            if (req.body.email && req.body.email != usuario.email) {
                usuario.email = req.body.email
            }

            if (req.body.fechaNacimiento && req.body.fechaNacimiento != usuario.fechaNacimiento) {
                usuario.fechaNacimiento = req.body.fechaNacimiento
            }

            if (req.file) {
                path = req.file.path;
                path = path.replace('\\', '/');
                if (usuario.foto != path) {
                    usuario.foto = path
                }
            }

            if (req.body.contrasena) {
                // Comparamos la pass y si es diferente la actualizamos
                const comparar = await bcrypt.compare(req.body.contrasena, usuario.contrasena)
                if (!comparar) {
                    const hashedPass = await bcrypt.hash(req.body.contrasena, 10)
                    usuario.contrasena = hashedPass
                }
            }

            await usuario.save();
            res.send(usuario);
        })

    } catch (error) {
        res.status(409).json({
            mensaje: "Ha ocurrido un error al actualizar el usuario.",
            codigo: "ERUSR002"
        })
    }
};

const login = (req, res, next) => {
    var nombreUsuario = req.body.email
    var contrasena = req.body.contrasena

    Usuario.findOne({ $or: [{ email: nombreUsuario }, { nombre: nombreUsuario }] }).then(
        usuario => {
            if (usuario) {
                bcrypt.compare(contrasena, usuario.contrasena, function (err, result) {
                    if (err) {
                        res.status(409).json({
                            codigo: "ERUSR003",
                            mensaje: err.message
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ nombre: usuario.nombre }, 'sessionToken', { expiresIn: '2d' })

                        res.json({
                            _id: usuario._id,
                            nombre: usuario.nombre,
                            email: usuario.email,
                            contrasena: usuario.contrasena,
                            fechaNacimiento: usuario.fechaNacimiento,
                            foto: usuario.foto,
                            codigo: "OK",
                            mensaje: 'Conectado correctamente.',
                            token
                        })
                    } else {
                        res.status(409).json({
                            codigo: "ERUSR004",
                            mensaje: 'Contraseña incorrecta.'
                        })
                    }
                })
            } else {
                res.status(409).json({
                    codigo: "ERUSR005",
                    mensaje: 'Usuario no encontrado.'

                })
            }
        })
};

module.exports = { buscarUsuario, registrarUsuario, actualizarUsuario, login }