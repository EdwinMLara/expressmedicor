const express = require('express');
const router = express.Router();
const Usuarios = require('../models/Usuario');
const bcrypt = require('bcrypt');

router.post('/insert',async(req,res) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashecPassword = await bcrypt.hash(req.body.password,salt);
    
        const usuario = new Usuarios({
            username:req.body.username,
            password:hashecPassword,
            nombre:req.body.name,
            typeCount:req.body.typeCount,
            cedula:req.body.cedula 
        });

        console.log(usuario);

        const savedUser = await usuario.save();
        res.json(savedUser);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return
    }
});

router.get('/',async (req,res) =>{
    try{
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    }
    catch(error){
        res.json({message:error});
    }
});

module.exports = router;