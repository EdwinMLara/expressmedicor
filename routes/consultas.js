const express = require('express');
const router = express.Router();

const Consulta = require('../models/Consulta');


/**se utiliza para el paguinador
 * el look up funciona como inner join
 */
router.get('/:page/pages/:perPage', async (req, res) => {
    let page = parseInt(req.params.page);
    let perPage = parseInt(req.params.perPage);
    let auxSkip = page * perPage;
    try {
        const consultas = await Consulta.aggregate([{
            $lookup: {
                from: "pacientes",
                localField: "idPaciente",
                foreignField: "_id",
                as: "paciente"
            }
        }, { $sort: { date: -1 } }])
            .skip(auxSkip)
            .limit(perPage);
        res.json(consultas);
    } catch (error) {
        res.json({ message: error })
    }
});

router.get('/count', async (req, res) => {
    try {
        const numconsultas = await Consulta.countDocuments();
        res.json(numconsultas);
    } catch (error) {
        console.error(error);
        res.json({ message: error })
    }
});

router.get('/readByPacient/:pacienteId', async (req, res) => {
    try {
        const consultas = await Consulta.aggregate([{
            $lookup: {
                from: "pacientes",
                localField: "idPaciente",
                foreignField: "_id",
                as: "paciente"
            }
        }, { $sort: { date: -1 } }]);
        res.json(consultas);
        console.log('consultas por id de paciente');
    } catch (error) {
        res.json({ message: error });
    }
});


/**al resultado del lookup
 * se busca una coincidencia por la expresion regular
 * vale la pena mencionar que paciente es un array
 */
router.get('/getByName/:nombre', async (req, res) => {
    try {
        const consultas = await Consulta.aggregate([{
            $lookup: {
                from: "pacientes",
                localField: "idPaciente",
                foreignField: "_id",
                as: "paciente"
            }
        }
            , { $match: { "paciente.nombre": { "$regex": req.params.nombre, "$options": "i" } } }
            , { $sort: { date: -1 } }]);
        res.json(consultas);
    } catch (error) {
        console.log(error);
        res.json({ message: error })
    }
});

router.post('/insert', async (req, res) => {
    const consulta = new Consulta({
        idPaciente: req.body.idPaciente,
        sintomas: req.body.sintomas,
        diagnostico: req.body.diagnostico,
        temperatura: req.body.temperatura,
        tensionArterial: req.body.tensionArterial,
        frecuenciaCardiaca: req.body.frecuenciaCardiaca,
        frecuenciaRespiratoria: req.body.frecuenciaRespiratoria,
        receta: req.body.receta
    });
    try {
        const savedConsult = await consulta.save();
        res.json(savedConsult);
        console.log("insertado consulta");
    } catch (error) {
        res.json({ message: error });
    }
});

router.patch('/update/:consultaId', async (req, res) => {
    try {
        const updatedConsult = await Consulta.updateOne(
            { _id: req.params.consultaId },
            {
                $set: {
                    sintomas: req.body.sintomas,
                    diagnostico: req.body.diagnostico
                }
            }
        );
        res.json(updatedConsult);
    } catch (error) {
        res.json({ message: error });
    }
});


router.delete('/delete/:consultaId', async (req, res) => {
    try {
        const deletedConsult = await Consulta.remove(
            { _id: req.params.consultaId });
        res.json(deletedConsult);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;