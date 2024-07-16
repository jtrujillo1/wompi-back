'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('Products', [
        {
          id: '623eee0c-a0c0-402f-b67c-bb6f4e645961',
          name: 'adsa',
          price: 50000,
          image: 'ads',
          description: 'ads',
          status: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '623eee0c-a0c0-402f-b67c-bb6f4e645962',
          name: 'adsa',
          price: 50000,
          image: 'ads',
          description: 'ads',
          status: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '623eee0c-a0c0-402f-b67c-bb6f4e645963',
          name: 'adsa',
          price: 50000,
          image: 'ads',
          description: 'ads',
          status: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '623eee0c-a0c0-402f-b67c-bb6f4e645964',
          name: 'adsa',
          price: 50000,
          image: 'ads',
          description: 'ads',
          status: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '623eee0c-a0c0-402f-b67c-bb6f4e645965',
          name: 'adsa',
          price: 50000,
          image: 'ads',
          description: 'ads',
          status: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .then(() => {
        return queryInterface.bulkInsert('Stocks', [
          {
            id: '623eee0c-a0c0-402f-b67c-bb6f4e645966',
            productId: '623eee0c-a0c0-402f-b67c-bb6f4e645961',
            quantity: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '623eee0c-a0c0-402f-b67c-bb6f4e645967',
            productId: '623eee0c-a0c0-402f-b67c-bb6f4e645962',
            quantity: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '623eee0c-a0c0-402f-b67c-bb6f4e645968',
            productId: '623eee0c-a0c0-402f-b67c-bb6f4e645963',
            quantity: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '623eee0c-a0c0-402f-b67c-bb6f4e645969',
            productId: '623eee0c-a0c0-402f-b67c-bb6f4e645964',
            quantity: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '623eee0c-a0c0-402f-b67c-bb6f4e645916',
            productId: '623eee0c-a0c0-402f-b67c-bb6f4e645965',
            quantity: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface
      .bulkDelete('Products', {}, null)
      .then(() => queryInterface.bulkDelete('Stocks', {}, null));
  },
};
