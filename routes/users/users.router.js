const express = require("express");
const Router = express.Router();
const {
  ChangeStatusUser,
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  Login,
  AddCredits,
} = require("./users.controller");

Router.post("", CreateUser);
Router.get("/:_id", GetUser);
Router.get("", GetAllUsers);
Router.put("/:_id", UpdateUser);
Router.patch("/:_id", ChangeStatusUser);
Router.post("/login", Login);
Router.post("/add-credits", AddCredits);

module.exports = Router;
