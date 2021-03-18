const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv/config');

const Login = require('../models/Login');

router.post('/',async (req,res) =>{
    const userTest = {
        username : 'EdwinMLara',
        password : 'admin'
    }

    let token = jwt.sign(
        userTest,process.env.SECRET_KEY,{expiresIn: '1h'},(err,token) =>{
            res.json({token});
        });
    
    console.log("afuera",token);
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