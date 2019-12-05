'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    price: DataTypes.NUMBER,
    stock: DataTypes.NUMBER
  },
   {
     timestamps:false,
     tableName:'book'
   });
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};