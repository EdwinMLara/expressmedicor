const express = require('express');
const router = express.Router();

const Consulta = require('../models/Consulta');

router.get('/',async (req,res) =>{
    try {
        const consultas = await Consulta.find();
        res.json(consultas);
    } catch (error) {
        res.json({message:error})
    }
})

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

router.post('/insert',async (req,res) =>{
    const consulta = new Consulta({
        idPaciente : req.body.idPaciente,
        sintomas : req.body.sintomas,
        diagnostico: req.body.diagnostico,
        receta: req.body.receta
    });
    try {
        const savedConsult = await consulta.save();
        res.json(savedConsult);
        console.log("insertado consulta");
    } catch (error) {
        res.json({message : error});
    }
});

router.patch('/update/:consultaId',async (req,res)=>{
    try {
        const updatedConsult = await Consulta.updateOne(
            {_id:req.params.consultaId},
            {$set :{
                sintomas : req.body.sintomas,
                diagnostico: req.body.diagnostico
            }}
        );
        res.json(updatedConsult);
    } catch (error) {
        res.json({message : error});
    }
});


router.delete('/delete/:consultaId',async (req,res) =>{
    try {
        const deletedConsult = await Consulta.remove(
            {_id:req.params.consultaId});
        res.json(deletedConsult);
    } catch (error) {
        res.json({message:error});
    }
});

module.exports = router;