const { v4: uuidv4 } = require('uuid');

const express = require('express'); // Importar módulo express do npm 
const fs = require('fs');
const app = express(); // Inicializa servidor express e salva na variável app
const PORT = 8000; // Define a porta para rodar o servidor
app.use(express.json()); // Informa ao servidor que vai receber dados em JSON

// Criar minhas rotas
app.get('/aulas', (req, res) => {
    fs.readFile('bancodedados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const dados = JSON.parse(data);
        res.status(200).send(dados);
    });
});

app.get('/aulas/:id', (req, res) => { // Procurar aula pelo ID
    const id = req.params.id; // Pegando o ID da URL
    fs.readFile('bancodedados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulas = JSON.parse(data); // Converte o arquivo texto -> JSON
        const aula = aulas.find(aula => aula.id == id); // Procura a aula pelo ID
        if (aula) { // Se achar a aula
            return res.status(200).json(aula); // Retorna a aula encontrada
        }
        return res.status(404).json({ msg: "Aula não encontrada" }); // Se não encontrar
    });
});

app.post('/aulas', (req, res) => {
    const dados = req.body;

    if (!dados || typeof dados !== 'object') {
        return res.status(400).json({ msg: "Corpo da requisição inválido ou ausente." });
    }

    fs.readFile('bancodedados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulas = JSON.parse(data);

        dados['id'] = uuidv4(); // Gera um ID único
        aulas.push(dados);

        fs.writeFile('bancodedados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(201).json(dados);
        });
    });
});


app.put('/aulas/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('bancodedados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulas = JSON.parse(data);
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if (aulaIndex === -1) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }
        // Atualiza os dados da aula com os dados recebidos no body
        aulas[aulaIndex] = { ...aulas[aulaIndex], ...req.body };
        fs.writeFile('bancodedados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(200).json(aulas[aulaIndex]);
        });
    });
});

app.delete('/aulas/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('bancodedados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulas = JSON.parse(data);
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if (aulaIndex === -1) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }
        aulas.splice(aulaIndex, 1); // Remove a aula do array
        fs.writeFile('bancodedados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(204).send(); // Retorna status 204 (sem conteúdo)
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
