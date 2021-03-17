const express = require('express');
const router = express.Router();

const Consulta = require('../models/Consulta');

router.get('/readByPacient/:pacienteId',async (req,res) =>{
    try {
        const consultas = await Consulta.find({
            idPaciente: req.params.pacienteId
        });
        res.json(consultas);
        console.log('consultas por id de paciente');
    } catch (error) {
        res.json({message : error});
    }
});

router.post('/insert/:pacienteId',async (req,res) =>{
    const consulta = new Consulta({
        idPaciente : req.params.pacienteId,
        sintomas : req.body.sintomas,
        diagnostico: req.body.diagnostico
    });
    try {
        const savedConsult = await consulta.save();
        res.json(savedConsult);
        console.log("insertado consulta");
    } catch (error) {
        res.json({message : error});
    }
});

module.exports = router;