module.exports = function(sequelize, Sequelize) {
  
  var Note = sequelize.define("Note", {
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
    userId: Sequelize.INTEGER,
      // notEmpty: true

    bookId: Sequelize.INTEGER
      
      // notEmpty: true
    
  });

  return Note;
};

