var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var usersRouter = require("./routes/users/users.router");
var itemsRouter = require("./routes/items/items.router");
var itemsUserRouter = require("./routes/itemsPlayer/itemsPlayer.router");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/items-user", itemsUserRouter);

module.exports = app;
