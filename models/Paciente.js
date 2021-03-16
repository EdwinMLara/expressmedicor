const mongoose = require('mongoose');

const PacienteSchema = mongoose.Schema({
    nombre : {
        type:String,
        require:true
    },
    edad : {
        type:Number,
        require:true
    },
    date :{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Pacientes',PacienteSchema);