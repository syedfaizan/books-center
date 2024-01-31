"use strict";
module.exports = (sequelize, DataTypes) => {
  let Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      description: DataTypes.STRING,
      website: DataTypes.STRING,
      author: DataTypes.STRING,
      genre: {
        type: DataTypes.ENUM,
        values: ["Poetry", "fiction", "nonfiction", "drama", "prose"],
      },
      published: DataTypes.DATE,
      inStock: { type: DataTypes.BOOLEAN, default: true },
      ISBN: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {}
  );
  Book.associate = function (models) {
    // associations can be defined here
  };
  return Book;
};
