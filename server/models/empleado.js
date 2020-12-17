const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento'
    },
    nombre_del_puesto: {
        type: String
    },
    anios_servicio: {
        type: Number
    },
    hora_entrada: {
        type: Number
    },
    hora_salida: {
        type: Number
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Empleado', empleadoSchema);