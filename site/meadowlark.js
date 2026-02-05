const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

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
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
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
