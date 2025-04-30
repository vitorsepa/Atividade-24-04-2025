const { v4: uuidv4 } = require('uuid');

const express = require('express'); // Importar módulo express do npm 
const fs = require('fs');
const router_aulas = require('./roteamento/aulas_router')
const app = express(); // Inicializa servidor express e salva na variável app
const PORT = 8000; // Define a porta para rodar o servidor
app.use(express.json()); // Informa ao servidor que vai receber dados em JSON

const listarAulas = () => {

}

const atualizarAulas = () => {
    
}

app.use('', router_aulas)

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});