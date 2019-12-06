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

    ISBN: Sequelize.INTEGER,
    title: Sequelize.STRING,
    authors: Sequelize.STRING,
    pageCount: Sequelize.INTEGER,
    currentPage: Sequelize.INTEGER,
    imgThumbnail:Sequelize.STRING,
    imgUrl: Sequelize.STRING,
    rating: Sequelize.INTEGER,
    userId: Sequelize.INTEGER
  });

  return Book;
};

