var authController = require("../controllers/authcontroller.js");

module.exports = function(app) {

  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // authController.signup);
  // app.get("/signin", authController.signin);

};
