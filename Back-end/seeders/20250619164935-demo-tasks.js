'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tasks",
      [
        {
          title: "Complete onboarding",
          description: "Finish setting up profile and preferences.",
          isCompleted: false,
          userId: 1,
          
        },
        {
          title: "Submit documents",
          description: "Upload necessary ID and address verification files.",
          isCompleted: false,
          userId: 1,
          
        },
        {
          title: "Setup billing",
          description: "Add billing method and review invoices.",
          isCompleted: true,
          userId: 2,
        
        },
        {
          title: "Write first blog post",
          description: "Draft and publish your welcome post.",
          isCompleted: false,
          userId: 2,
          
        },
        {
          title: "Review tasks",
          description: "Go through all pending tasks for the week.",
          isCompleted: false,
          userId: 3,
       
        },
        {
          title: "Attend team meeting",
          description: "Weekly check-in with project team on Zoom.",
          isCompleted: true,
          userId: 3,
         
        },
        {
          title: "Chai",
          description: "I need alot of alot of tea!",
          isCompleted: true,
          userId: 1,
         
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
