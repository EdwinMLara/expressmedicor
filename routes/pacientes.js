const express = require('express');
const router = express.Router();

const Paciente = require('../models/Paciente'); 

router.get('/',(req,res) =>{
    res.send('Estamos en pacientes');
})

router.post('/insert',async (req,res) =>{
    console.log(req.body);
    const paciente = new Paciente({
        nombre : req.body.nombre,
        edad : req.body.edad
    });

    try {
        const pacientSaved = await paciente.save();
        res.json(pacientSaved);
    } catch (error) {
        res.json({message : error});
    }
    
})

module.exports = router;