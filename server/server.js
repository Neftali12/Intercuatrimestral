const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()

app.get('/', function(req, res) {
    res.send('<h1> Bienvenido a mi INTERCUATRIMESTRAL </h1>')
});

app.get('/usuario', function(req, res) {
    res.json({
        ok: '200',
        mensaje: 'Bienvenido'
    });
});

app.get('/departamento', function(req, res) {
    res.send('<h1> Bienvenido a departamento </h1>')
});

app.get('/empleado', function(req, res) {
    res.send('<h1> Bienvenido a empleado </h1>')
});

app.listen(3000, () => {
    console.log('El servidor esta en linea por el puerto 3000');
});