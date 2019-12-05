module.exports = function(sequelize, Sequelize) {
  
  var Books = sequelize.define("books", {
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
    pageCount:{
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    currentPage:{
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    imgThumbnail:{
      type: Sequelize.STRING,
      notEmpty: true
    }, 
    imgUrl:{
      type: Sequelize.STRING,
      notEmpty: true
    }, 
    rating: Sequelize.INTEGER,
    userId:{
      type: Sequelize.INTEGER,
      notEmpty: true
    }
  
  });

  return Books;
};

