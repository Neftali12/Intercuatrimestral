const express = require('express');
const _ = require('underscore');
const Empleado = require('../models/empleado');
const app = express();

app.get('/empleado', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 100;

    Empleado.find({ activo: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', 'nombre, primer_apellido, segundo_apellido')
        .populate('departamento', 'nombre, numero_empleados, extension_telefonica')
        .exec((err, empleados) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de empleados obtenida con exito'
            });
        });
});

app.get('/usuario/:id', function(req, res) {
    let idEmpleado = req.params.id;

    Empleado.findById({ _id: idEmpleado })
        .populate('usuario', 'nombre, primer_apellido, segundo_apellido')
        .populate('departamento', 'nombre, numero_empleados, extension_telefonica')
        .exec((err, empleados) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurruio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Empleados listados con exito',
                conteo: empleados.length,
                empleados
            });
        });
});

app.post('/empleado', function(req, res) {
    let empl = new Empleado({
        id_usuario: req.body.id_usuario,
        id_departamento: req.body.id_departamento,
        nombre_del_puesto: req.body.nombre_del_puesto,
        anios_servicio: req.body.anios_servicio,
        hora_entrada: req.body.hora_entrada,
        hora_salida: req.body.hora_salida
    });

    empl.save((err, emplDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar empleado',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Empleado registrado con exito',
            emplDB
        });
    });
});

app.put('/empleado/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre_del_puesto', 'anios_servicio']);

    Empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, emplDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Empleado actualizado con exito',
                empleado: emplDB
            });
        });
});

app.delete('/empleado/:id', function(req, res) {
    let id = req.params.id;

    Empleado.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' },
        (err, emplDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al eliminar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Empleado eliminado con exito',
                emplDB
            });
        });
});

module.exports = app;