const fs = require ('fs')

const texto = 'abcdefghijklmnopqrstuvwxy'
fs.writeFile('./teste.txt', texto, (err) => {
    if (err){
    console.log(err)
    }
})