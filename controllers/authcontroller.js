var db = require("../models");

var exports = (module.exports = {});

exports.signup = function (req, res) {
    res.render("signup");
};

exports.signin = function (req, res) {
    res.render("signin");
};

exports.dashboard = function (req, res) {
    res.render('dashboard');
}

exports.search = function (req, res) {
    res.render('/search');
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        console.log("User successfully logged out");
    });
    res.redirect('/');    
}