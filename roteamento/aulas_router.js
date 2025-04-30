const express = require('express')

const router_aulas = express_Router()

//------------------------------------------------------------------------------------------------------

router_aulas.get('/aulas', (req, res) => {
    lerBancoDeDados((err, dados) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        res.status(200).send(dados);
    });
});

//------------------------------------------------------------------------------------------------------

router_aulas.get('/aulas/:id', (req, res) => {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aula = aulas.find(aula => aula.id == id);
        if (aula) {
            return res.status(200).json(aula);
        }
        return res.status(404).json({ msg: "Aula não encontrada" });
    });
});

//------------------------------------------------------------------------------------------------------

router_aulas.post('/aulas', (req, res) => {
    const dados = req.body;

    if (!dados || typeof dados !== 'object') {
        return res.status(400).json({ msg: "Corpo da requisição inválido ou ausente." });
    }

    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }

        dados['id'] = uuidv4();
        aulas.push(dados);

        escreverBancoDeDados(aulas, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(201).json(dados);
        });
    });
});


//------------------------------------------------------------------------------------------------------

router_aulas.put('/aulas/:id', (req, res) => {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if (aulaIndex === -1) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }

        aulas[aulaIndex] = { ...aulas[aulaIndex], ...req.body };

        escreverBancoDeDados(aulas, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(200).json(aulas[aulaIndex]);
        });
    });
});

//------------------------------------------------------------------------------------------------------

router_aulas.delete('/aulas/:id', (req, res) => {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if (aulaIndex === -1) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }

        aulas.splice(aulaIndex, 1);

        escreverBancoDeDados(aulas, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(204).send();
        });
    });
});

//------------------------------------------------------------------------------------------------------

module.exports = router_aulas