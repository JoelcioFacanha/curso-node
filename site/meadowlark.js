const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const fortune = require("./lib/fortunes");

const app = express();
const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
});

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res) => {
  res.status(404);
  res.render("404");
});
app.use((req, res) => {
  res.status(500);
  res.render("500");
});

app.listen(port, () => {
  console.log(`Meadowlark app listening on port ${port}`);
});
