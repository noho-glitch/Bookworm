// var authController = require("../controllers/authcontroller.js");

// module.exports = function(app) {

//   app.get("/signin", function(req, res) {
//     res.render("signin");
//   });

//   app.get("/signup", function(req, res) {
//     res.render("signup");
//   });

// };

var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {

  app.get('/signup', authController.signup);
  app.get('/signin', authController.signin);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/search',
    failureRedirect: '/signup'
  }));

  app.get('/dashboard', isLoggedIn, authController.dashboard);
  app.get('/logout', authController.logout);
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/search',
    failureRedirect: '/signin'
  }));

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("req.user is successful");
      console.log(req.user.id);

      // authcontroller search 
      authController.search(req, res); 

      return next();

    } else {

      res.redirect('/signin');

    }

  }

}