const mongoose = require('mongoose');

const MedicoSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    cedula:{
        type:Number,
        require:true
    }
});

module.exports = mongoose.model('Medico',MedicoSchema)