const mongoose = require('mongoose');

/**
 * Se van a genera 3 tipos de cuentas identificadas por valores númerios
 * 1 ----- Adminstrador
 * 2 ----- Medico Require el valor de la cedula
 * 3 ----- Administrador de inventarios
 */

const UsuariosSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    typeCount:{
        type:String,
        require:true
    },
    cedula:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Usuarios',UsuariosSchema);