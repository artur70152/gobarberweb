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
//
import bcrypt from 'bcryptjs'
import Sequelize,{Model} from 'sequelize'
class User extends Model{
    //metodo estatico que recebe sequelize de parametro
    static init(sequelize){
super.init({
name:Sequelize.STRING,
email: Sequelize.STRING,
//virtual quer dizer que esse campo não vai existir na base,
// de daddos, apenas no nosso lado aqui 
password:Sequelize.VIRTUAL,
password_hash:Sequelize.STRING,
provider:Sequelize.BOOLEAN,

},{sequelize})

//hooks sao trechos de codigo que sao acionados quando algo especifico
//acontece no codigo beforesave quer dizer que antes do usuario 
//ser salvo no banco de dados, afunção como segundo parametro ira
//rodar
//Sequelize e receberá a instância do modelo User atual como argumento. 
this.addHook('beforeSave',async (user)=>{
if(user.password){
    user.password_hash=await bcrypt.hash(user.password,8)

}
   
})
return this;
    }


static associate(models){

this.belongsTo(models.File,{foreignKey:'avatar_id', as:'avatar'})
//this.belongsTo(models.File, { foreignKey: 'avatar_id' })
// indica que o modelo User pertence ao modelo File e a coluna na 
//tabela de usuários que armazenará a referência para o arquivo é 
//avatar_id. Isso implica que a tabela de usuários terá uma coluna
// chamada avatar_id que servirá como chave estrangeira, 
//relacionando cada usuário a um arquivo específico.




}





checkPassword(password){
    console.log(password)
    return bcrypt.compare(password, this.password_hash)

}




}
export default User;