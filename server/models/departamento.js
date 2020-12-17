const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    id_jefe_de_area: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado'
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    numero_empleados: {
        type: Number
    },
    extension_telefonica: {
        type: Number
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Departamento', departamentoSchema)