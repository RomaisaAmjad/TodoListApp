'use strict';

const bcrypt = require('bcryptjs'); 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Romaisa',
        email: 'romaisa123@gmail.com',
        password: await bcrypt.hash('Romaisa123', 12),
      },
      {
        username: 'Areeba',
        email: 'areeba456@gmail.com',
        password: await bcrypt.hash('Areeba', 12),
      },{
        username: 'Neha',
        email: 'neha456@gmail.com',
        password: await bcrypt.hash('Neha123', 12),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
