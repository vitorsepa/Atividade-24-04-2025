const express = require('express');
const {pegarTodasAsAulas, deletarAulas} = require('../roteamento/controlador_aulas.js')
const { procurarAulas } = require('..roteamento/controlador_aulas.js');
const {atualizarAulas} = require('../roteamento/controlador_aulas.js');
const router_aulas = express_Router()

//------------------------------------------------------------------------------------------------------

router_aulas.get('/aulas', pegarTodasAsAulas)

//------------------------------------------------------------------------------------------------------

router_aulas.get('/aulas/:id', procurarAulas)

//------------------------------------------------------------------------------------------------------

router_aulas.post('/aulas', atualizarAulas)

//------------------------------------------------------------------------------------------------------

router_aulas.put('/aulas/:id', criarAulas)

//------------------------------------------------------------------------------------------------------

router_aulas.delete('/aulas/:id', deletarAulas)

//------------------------------------------------------------------------------------------------------

module.exports = router_aulas