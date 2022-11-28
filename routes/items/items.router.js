const express = require("express");
const { GetItem, GetAllItems, CreateItem } = require("./items.controller");
const Router = express.Router();

Router.get("/", GetItem);
Router.get("/all", GetAllItems);
Router.post("/", CreateItem);

module.exports = Router;
