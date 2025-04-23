const fs = require ('fs')

const texto = 'abcdefghijklmnopqrstuvwxyz'
fs.writeFile('./teste.txt', texto, (err) => {
    if (err){
    console.log(err)
    }
})