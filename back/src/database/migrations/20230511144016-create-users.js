'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //metod up quando a migration for executada
  async up (queryInterface, Sequelize) {
return queryInterface.createTable('users',{
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
email:{
  type:Sequelize.STRING,
  allowNull:false,
  unique:true,
  },
  password_hash:{
    type:Sequelize.STRING,
    allowNull:false,
    },
    provider:{
      type:Sequelize.BOOLEAN,
      defaultValue:false,
      allowNull:false,
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
    return queryInterface.dropTable('users')

  }
};
