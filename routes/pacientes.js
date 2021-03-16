const express = require('express');
const router = express.Router();

const Paciente = require('../models/Paciente'); 

router.get('/',(req,res) =>{
    res.send('Estamos en pacientes');
})

router.post('/insert',(req,res) =>{
    console.log(req.body);
    const paciente = new Paciente({
        nombre : req.body.nombre,
        edad : req.body.edad
    });

    paciente.save()
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(err =>{
        console.log(err);
        res.json({mensaje : err});
    });
})

module.exports = router;