'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //metod up quando a migration for executada
  async up (queryInterface, Sequelize) {
return queryInterface.createTable('appointments',{
  id:{
    type:Sequelize.INTEGER,
allowNull:false,
autoIncrement:true,
primaryKey:true,

  },
 date:{
allowNull:false,
type:Sequelize.DATE
 },
user_id:{
  type:Sequelize.INTEGER,
  references:{model:'users',key:'id'},
  onUpdate:'CASCADE',
  onDelete:'SET NULL',
  allowNull:true,
},
provider_id:{
  type:Sequelize.INTEGER,
  references:{model:'users',key:'id'},
  onUpdate:'CASCADE',
  onDelete:'SET NULL',
  allowNull:true,
},
canceled_at:{
  type:Sequelize.DATE,

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
    return queryInterface.dropTable('appointments')

  }
};
