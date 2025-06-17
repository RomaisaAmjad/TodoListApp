'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      'tasks',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        timestamps: false 
      }
    );
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('tasks');
  }
};
