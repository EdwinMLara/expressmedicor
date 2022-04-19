const express = require('express');
const router = express.Router();

const Paciente = require('../models/Paciente'); 


router.get('/count',async (req,res) =>{
    try {
        const numpacientes = await Paciente.count()
        res.json(numpacientes);
    } catch (error) {
        res.json({message : error});
    }
});

router.get('/:page/pages/:perPage',async (req,res) =>{
    let page = parseInt(req.params.page);
    let perPage = parseInt(req.params.perPage);
    let auxSkip = page*perPage;
    try {
        const pacientes = await Paciente.find()
        .skip(auxSkip)
        .limit(perPage);
        res.json(pacientes);
    } catch (error) {
        res.json({message : error});
    }
});



router.get("/getByName/:nombre",async (req,res) =>{
    try{
        const pacientes = await Paciente.find({"nombre": {'$regex':req.params.nombre ,'$options' : 'i'}});
        res.json(pacientes);
    }catch(error){
        res.json({message : error});
    }
});

/**the parameter is what is afther the las url given by the midelware
 * http://localhost/pacientes/<parameter>
 * http://localhost/pacientes/idPaciente
 * http://localhost:5000/pacientes/6050f16c6290ed1b3cdc1b50
 */
router.get('/:pacienteId',async (req,res) =>{
    try {
        const pacientes = await Paciente.findById(req.params.pacienteId);
        res.json(pacientes);
    } catch (error) {
        res.json({message : error});
    }
});

router.post('/insert',async (req,res) =>{
    const paciente = new Paciente({
        nombre : req.body.nombre,
        edad : req.body.edad,
        talla : req.body.talla,
        peso : req.body.peso,
        enfermedadesCronicas: req.body.enfermedadesCronicas,
        alergias : req.body.alergias,
        imageb64 : req.body.imageb64
    });

    try {
        const pacientSaved = await paciente.save(); 
        res.json(pacientSaved);
    } catch (error) {
        res.json({message : error});
    }
    
});

router.delete('/delete/:pacienteId',async (req,res) =>{
    try {
        const pacientDeleted = await Paciente.remove(
            {_id:req.params.pacienteId});
        res.json(pacientDeleted);
    } catch (error) {
        res.json({message : error});
    } 
});

router.patch('/update/:pacienteId',async (req,res) =>{
    try {
        const pacientUpdated = await Paciente.updateOne(
            {_id:req.params.pacienteId},
            {$set: {edad: req.body.edad}}
        );
        res.json(pacientUpdated);
    } catch (error) {
        res.json({message : error});
    }
});

module.exports = router;