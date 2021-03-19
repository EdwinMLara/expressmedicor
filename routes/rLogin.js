const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv/config');

const Usuarios = require('../models/Usuario');

router.post('/',async (req,res) =>{
    try {
        const usuario = await Usuarios.findOne({
            username: req.body.username
        }); 
        if(usuario !== null){
            let match = await bcrypt.compare(req.body.password,usuario.password)
                        .then(result => result).catch(err =>{
                            console.log(err);
                        })
            if(match){
                jwt.sign({username:req.body.username,password:usuario.password},process.env.SECRET_KEY,{expiresIn: '1h'},(err,token) =>{
                    if(err !== null){
                        res.json({
                            status:1001,
                            message:"error al genera el token"
                        });
                    }else{        
                        res.json({status:200,token});
                    }
                });
            }else{
                res.json({
                    status:500,
                    message:"contraseña invalida"
                });
            }
        }else{
            res.json({
                status:400,
                message:"usuario invalido"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }

});

router.post('/verificar',verificarToken,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET_KEY,(err,authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:"authorizacion concedida",
                authData
            })
        }
    })

})

function verificarToken(req,res,next){
    const bearerToken =  req.headers['authorization'];
    console.log(bearerToken);
    if(typeof bearerToken !== 'undefined'){
        const autorizarionToken = bearerToken.split(" ")[1];
        req.token = autorizarionToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = router;