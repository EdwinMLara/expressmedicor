const mongoose = require('mongoose');

const PacienteSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    edad:{
        type:Number,
        require:true
    },
    talla:{
        type:String,
        require:true
    },
    peso:{
        type: Number,
        require:true
    },
    enfermedadesCronicas:{
        type: String,
        require:true
    },
    alergias:{
        type: String,
        require:true
    },
    imageb64:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Pacientes',PacienteSchema);