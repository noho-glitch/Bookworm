

module.exports = function(sequelize, Sequelize) {
  

  var Book = sequelize.define("Book", {

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

