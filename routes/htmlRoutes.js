var db = require("../models");

module.exports = function(app) {

  // app.get("/", function(req, res) {
  //   db.Books.findAll({}).then(function(dbbookworm) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbbookworm
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    res.render("signin");
  });

  app.get("/search", function(req, res) {
    res.render("search");
  });

  app.get("/mybooks", function(req, res) {
    res.render("mybooks");
  });

  // Load example page and pass in an example by id
  app.get("/book/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
