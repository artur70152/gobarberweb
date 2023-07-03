// esse arquivo é para realizar a conexao com o banco de dados e 
// importar os models
import Appointment from "../app/models/Appointment";
import Sequelize from "sequelize";
import File from "../app/models/File";
import mongoose from "mongoose";
import User from "../app/models/User";
import databaseConfig from '../config/database'
const models=[User,File, Appointment];
class Database{
constructor(){
    this.init() 
this.mongo()
}
init(){
    // estabelece a conexao com o banco de dados
//this.connection é um objeto que contem todos os modelos registrados
//e associados a conexao do banco de dados 
this.connection=new Sequelize(databaseConfig)
    //this.connection é a variavel que sera usada como parametro nos
    //nos models para realizar a conexao 
    models
    .map(model=>model.init(this.connection))
//so vai chamar o metodo associate se o metodo associate existir
//(&& model.associate)
.map(model=>model.associate && model.associate(this.connection.models))
}
mongo(){
    this.mongoconnection=mongoose.connect(
        'mongodb://localhost:27017/gobarber',
    {useNewUrlParser: true, },
    );
    
    }
}
export default new Database()