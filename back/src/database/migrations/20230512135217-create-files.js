'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //metod up quando a migration for executada
  async up (queryInterface, Sequelize) {
return queryInterface.createTable('files',{
  id:{
    type:Sequelize.INTEGER,
allowNull:false,
autoIncrement:true,
primaryKey:true,

  },
name:{
type:Sequelize.STRING,
allowNull:false,
},
path:{
  type:Sequelize.STRING,
  allowNull:false,
  unique:true,
  },
 
created_at:{
type:Sequelize.DATE,
allowNull:false,
},
updated_at:{
  type:Sequelize.DATE,
  allowNull:false, 
}

})
  },
//metodo down quando aconteçe um rollback "um erro" para enviar os dados
  async down (queryInterface) {
    return queryInterface.dropTable('files')

  }
};
