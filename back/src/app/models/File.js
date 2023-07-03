// apos a migration de create user a tabela users foi criada 
// esse arquivo aqui,user, dentro de models, servirá
// para editar essa tabela

//O metodo init de user fornece os nomes dos campos que devem
// ser preenchidos na requisição. A requisição é feita pelo cliente e
// seus dados armazenados no metodo store de UserController, o
//create do metodo store cria um usuario mas nao o posta ainda e depois
// esses dados armazenados em UserController são transmitidos como 
//parametro da função post em routes, ou seja, o usuario criado é 
//agora postado no banco de dados 

import Sequelize,{Model} from 'sequelize'
class File extends Model{
    //metodo estatico que recebe sequelize de parametro
    static init(sequelize){
super.init({
name:Sequelize.STRING,
path: Sequelize.STRING, 
url:{
type:Sequelize.VIRTUAL,
get(){
    console.log(this.path)
    //a variavel path js existe colocamos ela no final desse link e 
    //com o middleware do server express static, associamos a url com
    //a imagem que temos em um diretorio especifico todas as vezes que
    // a rota /files for requerida

//no pc  return `http://localhost:3333/files/${this.path}`
//no emulador android return `http://10.0.2.2:3333/files/${this.path}`

  //  return `http://localhost:3333/files/${this.path}`
    return `http://10.0.2.2:3333/files/${this.path}`
}
}
//virtual quer dizer que esse campo não vai existir na base,
// de daddos, apenas no nosso lado aqui 

},{sequelize})

//hooks sao trechos de codigo que sao acionados quando algo especifico
//acontece no codigo beforesave quer dizer que antes do usuario 
//ser salvo no banco de dados, afunção como segundo parametro ira
//rodar
//Sequelize e receberá a instância do modelo User atual como argumento. 

return this;
    }





}
export default File;