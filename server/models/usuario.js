const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    primer_apellido: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    segundo_apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    edad: {
        type: Number,
    },
    curp: {
        type: String,
        unique: true,
        required: [true, 'La CURP es necesaria']
    },
    telefono: {
        type: Number
    },
    mail: {
        type: String,
        unique: true,
        required: [true, 'El mail es necesario']
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);