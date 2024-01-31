"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      subtitle: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.ENUM,
        values: ["Poetry", "fiction", "nonfiction", "drama", "prose"],
      },
      published: {
        type: Sequelize.DATE,
      },
      inStock: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      ISBN: {
        type: Sequelize.STRING,
        unique: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Books");
  },
};
