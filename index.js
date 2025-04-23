const express = require('express')

const app = express()
const PORT = 8000
app.use(express.json())

const bancoDeDados = [
    {
        id:1,
        titulo:'desenvolvimento de sistemas',
        curso:'técnico desenvolvimento',
        turma: '3B',
        professor: 'ramon'
    }
]
app.get('/aulas', (req, res) => {
    res.status(200).send(bancoDeDados)
})
app.post('/aulas', (req, res) => {
    const dados = req.body
    dados['id'] = bancoDeDados.lenght + 1
    bancoDeDados.push(dados)
    req.status(201)

})

app.put('/aulas')

app.listen(PORT, () => {console.log('servidor online')})