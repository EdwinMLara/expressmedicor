const express = require('express');
const router = express.Router();

const MedicoModel = require('../models/Medico');

router.get('/',async (req,res) => {
    try {
        const medicos = await MedicoModel.find();
        res.json(medicos);
    } catch (error) {
        res.json({message : error})
    }
});


router.post('/insert',async (req,res) => {
    const newMedico = new MedicoModel({
        nombre : req.body.nombre,
        cedula: req.body.cedula
    });

    try {
        const savedNewMedico = await newMedico.save();
        res.json(savedNewMedico);
    } catch (error) {
        res.json({message:error})
    }
});

module.exports = router;