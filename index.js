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
        professor: 'Ramon'
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

app.put('/aulas/:id',(req,res) => {
    const id = req.params.id
    const usuario = bancoDeDados.find(user => user.id == id)
    if (!usuario){
        res.status(404).json({msg:"Usuário não encontrado"})
    }
    res.send("ok")

    app.delete('/aulas/:id', (req,res) => {
        const userIndex = bancoDeDados.findIndex(user => user.id == id)
        if (userIndex === -1){
            res.status(404).json({msg:"Usuário não encontrado"})
        }
        bancoDeDados.splice(userIndex, 1)
        res.status(204).send()
    })
})
app.listen(PORT, () => {console.log('servidor online')})