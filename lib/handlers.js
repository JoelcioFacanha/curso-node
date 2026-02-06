const fortune = require("./fortune");

exports.home = (req, res) => {
  res.render("home");
};

exports.about = (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
};

exports.notFound = (req, res) => {
  res.status(404).render("404");
};

exports.serverError = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).render("500");
};

exports.info = (req, res) => {
  res.render("info", { headers: req.headers });
};
