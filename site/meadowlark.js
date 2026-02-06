const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const handlers = require("../lib/handlers");

const app = express();
const port = process.env.PORT || 3000;

app.engine(
  "hbs",
  expressHandlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.disable("x-powered-by");

app.get("/", handlers.home);
app.get("/about", handlers.about);
app.get("/info", handlers.info);

app.use(express.static(path.join(__dirname, "public")));
app.use(handlers.notFound);
app.use(handlers.serverError);

app.listen(port, () => {
  console.log(`Meadowlark app listening on port ${port}`);
});
