const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const cors = require('cors');

/**
this is deprecated and converts in the next one
const bodyParser  = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
*/
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loginRouter = require('./routes/rLogin');
const userRouter = require('./routes/rUsuarios');
const pacientesRoute = require('./routes/pacientes');
const consultasRoute = require('./routes/consultas');
const medicosRoute = require('./routes/rMedicos');


app.use('/login',loginRouter);
app.use('/usuarios',userRouter);
app.use('/pacientes',pacientesRoute);
app.use('/consultas',consultasRoute);
app.use('/medicos',medicosRoute);

app.get('/',(req,res) =>{
    res.send('Rest Service for Medico');
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true },
    ()=> console.log('conexion a la base de datos exitosa')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`El servidor se inicio en ${PORT}`);
});