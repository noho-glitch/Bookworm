var db = require("../models");
var request = require("request");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });


  app.get("/api/googlebooks", function (req, res) {
    var search = "Harry Potter"
    // get the user input
    request("https://www.googleapis.com/books/v1/volumes?q="+ search + ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No", function (error, response, body){
      if (!error && response.statusCode == 200){
        
        var bodyres = JSON.parse(body)
        console.log(body)
      }
      res.json(bodyres)
      // res.json(body.title)
    })
    // request("https://www.googleapis.com/books/v1/volumes?q=" + search + ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No")
    // var search = "harry+potter";
    // var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + search + ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No";
    // console.log(queryURL)
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function (response) {
    //   console.log(response)
    // });

  });
  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  // Hello
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
