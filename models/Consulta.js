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