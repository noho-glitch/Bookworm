module.exports = function(sequelize, Sequelize) {
  
<<<<<<< HEAD
  var Book = sequelize.define("books", {
=======
  var Books = sequelize.define("book", {
>>>>>>> 191034627a873a7ad03e0ccf2579040ddc3e9f5d
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    ISBN: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    title: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    authors:{
      type: Sequelize.STRING,
      notEmpty: true
    },
    pageCount: Sequelize.INTEGER,
    currentPage: Sequelize.INTEGER,
    imgThumbnail:Sequelize.STRING,
    imgUrl: Sequelize.STRING,
    rating: Sequelize.INTEGER,
    userId: Sequelize.INTEGER
  });

  return Book;
};

