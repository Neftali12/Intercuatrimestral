const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express;

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 100;
});