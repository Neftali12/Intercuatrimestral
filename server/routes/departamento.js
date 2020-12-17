const express = require('express');
const _ = require('underscore');
const Departamento = require('../models/departamento');
const app = express();

app.get('/departamento', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 100;

    Departamento.find({ activo: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('empleado', 'nombre, primer_apellido, segundo_apellido')
        .exec((err, departamentos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Departamentos listados con exito',
                departamentos
            });
        });
});

app.get('/departamento/:id', function(req, res) {
    let idDepartamento = req.params.id;

    Departamento.findById({ _id: idDepartamento })
        .populate('empleado', 'nombre, primer_apellido, segundo_apellido')
        .exec((err, departamentos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Departamentos listados con exito',
                conteo: departamentos.length,
                departamentos
            });
        });
});

app.post('/departamento', function(req, res) {
    let dpto = new Departamento({
        id_jefe_de_area: req.body.id_jefe_de_area,
        nombre: req.body.nombre,
        numero_empleados: req.body.numero_empleados,
        extension_telefonica: req.body.extension_telefonica
    });

    dpto.save((err, dptoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al registrar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Departamento registrado con exito',
            dptoDB
        });
    });
});

app.put('/departamento/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'numero_empleados']);

    Departamento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, dptoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Departamento actualizado con exito',
                departamento: dptoDB
            });
        });
});

app.delete('/departamento/:id', function(req, res) {

    let id = req.params.id;

    Departamento.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' },
        (err, dptoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de eliminar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Departamento eliminado con exito',
                dptoDB
            });
        });
});

module.exports = app;