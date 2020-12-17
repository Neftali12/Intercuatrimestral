const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Usuario.find({ activo: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista obtenida con exito',
                conteo: usuarios.length,
                usuarios
            });
        });
});

app.get('/usuario/:id', function(req, res) {
    let idUsuario = req.params.id;

    Usuario.findById({ _id: idUsuario })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Usuario obtenido con exito',
                usuarios
            });
        });
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    let usr = new Usuario({
        nombre: body.nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        edad: body.edad,
        curp: body.curp,
        telefono: body.telefono,
        mail: body.mail
    });

    usr.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario registrado con exito',
            usrDB
        });
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'curp']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error en la actualización',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Usuario modificado con exito',
                usuario: usrDB
            });
        });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    console.log(req.params);
    console.log(id);

    Usuario.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un erro al momento de eliminar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Usuario eliminado con exito',
                usrDB
            });
        });
});

module.exports = app;