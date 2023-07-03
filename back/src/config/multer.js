// o multer é uma biblioteca e funciona como middleware
// que permite a manipulação de arquivos 
//em outro formato que não o JSON,
import multer from 'multer'
import crypto from 'crypto'
//extname retorna a extensão de um arquivo baseado no nome 
//da imagem ou de um arquivo 
// resolve percorre um caminho dentro da aplicação 
import {extname, resolve} from 'path'
export default{
    //sotage é uma chave de um objeto para
    // como o multer vai guardar as imagens
storage:multer.diskStorage({
destination:resolve(__dirname,"..","..","temp","uploads"),
filename:(req,file,cb)=>{
    // req sao os dados da requisição (aqueles que ja temos)
    //file são os dados do arquivo do upload
    //cb função callback
// filename é como vamos formatar o arquivo de imagem
//crypto é utilizada para gerar caracteres aleatorios
//randomBytes é para passar o numero de caracteres a serem gerados
crypto.randomBytes(16,(err,res)=>{
if(err) return cb(err)
//null pois o primeiro parametro do callback é um erro 
//res.tostring , res é a resposta do randombytes, ('hex') é para 
//transformar 16 bytes de conteudo aleatorio em uma string 
//hexadecimal
return cb(null,res.toString('hex')+ file.originalname)
})
},

}),

}