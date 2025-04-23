const fs = require ('fs')

console.log('antes')
try{
    const data = fs.readFileSync('./teste.txt','utf-8')
    console.log(data)
} catch (e) {
    console.log(e)
}

console.log('depois')
