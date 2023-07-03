import nodemailer from 'nodemailer';
import {resolve} from 'path'
import exphbs, {create} from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import mailConfig from '../config/mail'

class Mail{
constructor(){
    const {host,port,secure,auth}=mailConfig;
    //como o nodemailer chama uma conexao com algum serviço 
    //externo para enviar email
this.transporter=nodemailer.createTransport({
host,
port,
secure,

auth:auth.user ? auth:null,

})

this.configureTemplates()
}
configureTemplates(){
const viewPath= resolve(__dirname, '..', 'app', 'views', 'emails')
this.transporter.use('compile',nodemailerhbs({

viewEngine:create({
    layoutsDir: resolve(viewPath, 'layouts'),
partialsDir:resolve(viewPath,'partials'),
defaultLayout:'default',
extname:'.hbs',
}),
viewPath,
extName:'.hbs'


}))

}


sendMail(message){
    return this.transporter.sendMail({
...mailConfig.default,
...message,

    })
}


}
export default new Mail();