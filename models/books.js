

module.exports = function(sequelize, Sequelize) {
  

  var Book = sequelize.define("Book", {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ISBN: {
      dialectOptions: {
        supportBigNumbers: true
      }, 
      type: Sequelize.BIGINT,
      unique: 'compositeIndex'
    },
    title: Sequelize.STRING,
    authors: Sequelize.STRING,
    description: Sequelize.STRING(5000),
    publishedDate: Sequelize.STRING,
    pageCount: Sequelize.INTEGER, 
    currentPage: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }, 
    currentlyReading: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    thumbnail: Sequelize.STRING,
    rating: Sequelize.INTEGER,
    userId: Sequelize.INTEGER
  });

  return Book;

};

