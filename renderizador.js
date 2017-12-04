const ejs = require('ejs')
const read = require('fs').readFileSync
const join = require('path').join

const render = function(nome_arquivo, dados){
    let path = join(__dirname, `template/${nome_arquivo}.ejs`)
    return ejs.compile(read(path, 'utf8'), {filename: path})(dados)
}

module.exports = {
    render
}