var db = require("../models");
var request = require("request");
module.exports = function (app) {

// Get the google API data 
  app.get("/api/googlebooks", function (req, res) {
    var parameter = "";
    var search = "Harry Potter"
    // get the user input
    request("https://www.googleapis.com/books/v1/volumes?q="+ search + parameter + ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No", function (error, response, body){
      if (!error && response.statusCode == 200){
        
        var bodyres = JSON.parse(body)
        console.log(body)
      }
      res.json(bodyres)
      // res.json(body.title)
    })
    

  });
/***************************NOTES**********************/ 
    // Get all notes
    app.get("/api/mybooks/:bookid/notes", function (req, res) {
      db.Note.findAll({}).then(function (dbNotes) {
        res.json(dbNotes);
      });
    });


  // Create a new note
  app.post("/api/mybooks", function (req, res) {
    console.log("This is the req body")
    console.log(req.body);
    db.Note.create(req.body)
    .then(function (dbNotes) {
      res.json(dbNotes);
    });
  });

  // Delete a note by id
  app.delete("/api/mybooks/:id", function (req, res) {
    db.Note.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  /*************BOOKS ****************/ 

  //save a new book
  app.post("/api/favorites", function (req, res) {
    console.log("req.body", JSON.stringify(req.body));
    db.Books.create(req.body);
  })
  //delete a book by id
  // app.delete("/api/favorites/:id", function (req, res) {
  //   db.Books.destroy({ where: { id: req.params.id } }).then(function ())
  // })
};

