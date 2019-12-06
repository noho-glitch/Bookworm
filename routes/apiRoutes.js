var db = require("../models");
var request = require("request");
module.exports = function (app) {

  // Get the google API data 
  app.get("/api/googlebooks", function (req, res) {
    var parameter = "";
    var search = "Harry Potter"
    // get the user input
    request("https://www.googleapis.com/books/v1/volumes?q=" + search + parameter + ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No", function (error, response, body) {
      if (!error && response.statusCode == 200) {

        var bodyres = JSON.parse(body)
        console.log(body)
      }
      res.json(bodyres)
      // res.json(body.title)
    })


  });
  /***************************NOTES**********************/
  // get book id
  app.get("/api/mybooks/:id", function (req, res) {
    // get the book id 
    db.Note.findOne({
      where: {
        bookId: req.params.id
      }
    }).then(function (dbNotes) {
      res.json(dbNotes);
    });
  });
  // display all the notes
  app.get("/api/mybooks", function (req, res) {
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
  app.get("/api/mybooks/:id", function (req, res) {
    db.Note.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbNotes) {
      res.json(dbNotes);
    });
  });

  app.delete("/api/mybooks/:id", function (req, res) {
    db.Note.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbNotes
    ) {
      res.json(dbNotes);
    });
  });

<<<<<<< HEAD
  /*************BOOKS ****************/
=======
  /*************BOOKS ****************/ 

  //save a new book
  app.post("/api/favorites", function (req, res) {
    console.log("req.body" + req.body);
    db.Books.create(req.body);
  })
  //delete a book by id
  // app.delete("/api/favorites/:id", function (req, res) {
  //   db.Books.destroy({ where: { id: req.params.id } }).then(function ())
  // })
>>>>>>> 191034627a873a7ad03e0ccf2579040ddc3e9f5d
};

