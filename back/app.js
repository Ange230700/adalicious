const express = require("express");
const path = require("path");
const app = express();
const usersRouter = require("./routes/user");
const menusRouter = require("./routes/menu");
const ordersRouter = require("./routes/order");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/user", usersRouter);
app.use("/menus", menusRouter);
app.use("/orders", ordersRouter);

app.use(function (err, req, res, next) {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
});

app
  .listen("3310", () => {
    console.info("Serveur démarré.");
  })
  .on("error", (e) => {
    console.error(e);
  });

module.exports = app;
