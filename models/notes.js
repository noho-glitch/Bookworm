module.exports = function(sequelize, Sequelize) {
  
  var Notes = sequelize.define("notes", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    noteTitle: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    noteText:{
      type: Sequelize.STRING,
      notEmpty: true
    },
    userId:{
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    bookId:{
      type: Sequelize.INTEGER,
      notEmpty: true
    }
  });

  return Notes;
};

