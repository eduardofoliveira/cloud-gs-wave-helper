const express = require('express')
const app = express()
const port = process.env.PORT || 80
const bodyParser = require('body-parser');
const gerador = require('./index')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    const dados = req.body
    gerador.gerar(dados)
        .then(res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(port, () => console.log('Express running on port: ' + port))