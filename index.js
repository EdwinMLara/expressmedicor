const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const cors = require('cors');

/**
this is deprecated and converts in the next one
const bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
*/
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const postRoute = require('./routes/pacientes');

app.use('/pacientes',postRoute);

app.get('/',(req,res) =>{
    res.send('Hola Mundo!');
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true },
    ()=> console.log('conexion a la base de datos exitosa')
);

const PORT = process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log(`El servidor se inicio en ${PORT}`);
});