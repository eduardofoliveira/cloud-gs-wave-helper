const renderizador = require('./renderizador')
const nodemailer = require('nodemailer')
const qr = require('qr-image');
var fs = require('fs');

const gerar = function(dados){
    return new Promise((resolve, reject) => {
        var string = renderizador.render('xml', dados)
        
            var code = qr.image(string, { type: 'png' , size : 3})
            var output = fs.createWriteStream('template/qrcode.png')
            code.pipe(output)
        
            const transport = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                port: 465,
                auth: {
                    user: 'eduardo@cloudcom.com.br',
                    pass: ''
                }
            })
            
            if(dados.assinatura == 'brastel'){
                const HelperOptions = {
                    from: '"Suporte Basix" <suporte.basix@brastel.com.br>',
                    to: dados.email,
                    replyTo: {"name":'Suporte Basix', "address":'suporte.basix@brastel.com.br'},
                    subject: 'Instruções de configuração GrandStream Wave',
                    html: renderizador.render('email-brastel', dados),
                    attachments: [{
                            filename: 'brastel.gif',
                            path: './template/brastel.gif',
                            cid: 'unique@kreata.ee' //same cid value as in the html img src
                            },{
                            filename: 'qrcode.png',
                            path: './template/qrcode.png',
                            cid: 'unique@kreata.ed' //same cid value as in the html img src
                            }
                    ]
                }

                transport.sendMail(HelperOptions, (error, info) => {
                    if(error){
                        reject(error)
                    }
                    resolve('Mensagem enviada !!!')
                })
            }else{
                const HelperOptions = {
                    from: '"Suporte Basix" <suporte@cloudcom.com.br>',
                    to: dados.email,
                    replyTo: {"name":'Suporte Basix', "address":'suporte@cloudcom.com.br'},
                    subject: 'Instruções de configuração GrandStream Wave',
                    html: renderizador.render('email-cloud', dados),
                    attachments: [{
                            filename: 'cloudcom.jpg',
                            path: 'C:/nodejs/email/nodemailer/template/cloudcom.jpg',
                            cid: 'unique@kreata.ee' //same cid value as in the html img src
                            },{
                            filename: 'qrcode.png',
                            path: 'C:/nodejs/email/nodemailer/template/qrcode.png',
                            cid: 'unique@kreata.ed' //same cid value as in the html img src
                            }
                    ]
                }

                transport.sendMail(HelperOptions, (error, info) => {
                    if(error){
                        reject(error)
                    }
                    resolve('Mensagem enviada !!!')
                })
            }
    })
}

module.exports = {
    gerar
}




