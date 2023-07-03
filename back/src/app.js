import express from 'express'
import path from 'path'
import cors from 'cors'
import routes from './routes'
//importa e executa o index de database
import './database/index'
class App{
//toda vez que a classe for chamada o metodo constructor é
 //chamado automaticamente

constructor(){
this.server=express()
//para chamar os dois metodos dentro do constructor
this.middlewares()
this.routes()


}
middlewares(){
    this.server.use(cors())
this.server.use(express.json())
//this.server.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))
//indica que o servidor está configurado para tratar as requisições 
//feitas ao caminho '/files'. Quando uma requisição é feita nesse 
//caminho, o middleware express.static é acionado.

//Quando configurado, o express.static define um diretório no qual 
//os arquivos estáticos serão armazenados. Quando uma requisição é 
//feita para o servidor para um arquivo estático, o middleware 
//verifica se o arquivo solicitado existe nesse diretório e, se 
//existir, o envia como resposta para o cliente.
this.server.use('/files',express.static(path.resolve(__dirname, '..', 'temp','uploads')))
//Portanto, quando uma requisição é feita para /files, 
//o middleware express.static procura os arquivos estáticos no 
//diretório temp/uploads e os serve em resposta à requisição.
// Isso permite que os arquivos armazenados nesse diretório 
//sejam acessíveis e exibidos em um navegador ou consumidos 
//por outros componentes da aplicação.
}
routes(){
this.server.use(routes)
}
}
export default new App().server;