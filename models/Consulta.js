const mongoose = require('mongoose');

const ConsultaSchema = mongoose.Schema({
    idPaciente : {
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    sintomas:{
        type:String,
        require:true
    },
    diagnostico:{
        type:String,
        require:true
    },
    temperatura:{
        type:Number,
        require:true
    },
    tensionArterial:{
        type:String,
        require:true
    },
    frecuenciaCardiaca:{
        type:Number,
        require:true
    },
    frecuenciaRespiratoria:{
        type:Number,
        require:true
    },
    receta : {
        type: Array,
        items:{
            cantidad : Number,
            nombre : String,
            prescripcion : String
        }
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Consultas',ConsultaSchema);