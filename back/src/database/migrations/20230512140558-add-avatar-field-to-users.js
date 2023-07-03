'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
'use strict';

module.exports={
  up:(queryInterface,Sequelize)=>{
return queryInterface.addColumn(
'users',
'avatar_id',
{
  type:Sequelize.INTEGER,
  //referencias é uma chave extrangeira
  //todo avatar_id da tabela users vai ser um id da tabela files
  references:{model:'files',key:'id'},
  //CASCADE:  a alteração tambem ocorre na tabela de usuarios
  onUpdate:'CASCADE',
  onDelete:'SET NULL',
  allowNull:true,
}


)

  },
  down:(queryInterface,Sequelize)=>{
return queryInterface.removeColumn('users', 'avatar_id')
  }
}