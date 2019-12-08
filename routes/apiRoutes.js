var db = require("../models");
var request = require("request");
module.exports = function (app) {

  // Get the google API data 
  app.get("/api/googlebooks", function (req, res) {
    var parameter = "";
    var search = "Harry Potter"
    var refine = "&orderBy=relevance&"
    // get the user input
    request("https://www.googleapis.com/books/v1/volumes?q=" + search + parameter + refine + ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No", function (error, response, body) {
      if (!error && response.statusCode == 200) {

        var bodyres = JSON.parse(body)
        // console.log(body)
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
    // console.log("This is the req body")
    // console.log(req.body);
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

  /*************BOOKS ****************/ 


  // display all the books
  app.get("/api/fav-books", function (req, res) {

    // console.log("fav-books/:id req is:", req);
    // console.log("fav-books/:id req.body is:", req.body);  
    // console.log("fav-books/:id req.user.id is:", req.user.id); 
    
    // console.log("res is: ", res); 

    db.Book.findAll({
      where: {
        userId: req.user.id
      }
    }).then(function (dbBooks) {
      res.json(dbBooks);
    });
  });

  

  //save a new book

  app.post("/api/favorites", function (req, res) {
    
    // console.log("req is: ", req); 
    // console.log("req.session is: ", req.session); 
    console.log("req.body.id is: ", req.body.id); 
    
    req.body.userId = req.user.id; 
    // console.log("req.body.userId", req.body.userId); 

    // console.log("newBook: ", newBook); 

    db.Book.create(req.body).then( function(newfavBook) {
      res.status(201).json(newfavBook);
    })
  }) 


// DELETE A BOOK 
  app.get("/api/book-delete/:id", function (req, res) {
    console.log("This is req.body", req.body)
    db.Book.findOne({
      where: {
        id: req.body.id
      }
    }).then(function (dbBooks) {
      res.json(dbBooks);
    });
  });

  app.delete("/api/book-delete/:id", function (req, res) {
    db.Book.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (
      dbBooks
    ) {
      res.json(dbBooks);
    });
  });




};


