const { v4: uuidv4 } = require('uuid');

const express = require('express'); // Importar módulo express do npm 
const fs = require('fs');
const app = express(); // Inicializa servidor express e salva na variável app
const PORT = 8000; // Define a porta para rodar o servidor
app.use(express.json()); // Informa ao servidor que vai receber dados em JSON

//------------------------------------------------------------------------------------------------------

app.get('/aulas', (req, res) => {
    lerBancoDeDados((err, dados) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        res.status(200).send(dados);
    });
});

//------------------------------------------------------------------------------------------------------

app.get('/aulas/:id', (req, res) => {
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

app.post('/aulas', (req, res) => {
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

app.put('/aulas/:id', (req, res) => {
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

app.delete('/aulas/:id', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
