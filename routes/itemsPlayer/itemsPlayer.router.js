const express = require("express");
const {
  GetItemsOfPlayer,
  SetSelected,
  SetPurchased,
  GetPurchased,
  GetSelected,
} = require("./itemsPlayer.controller");
const Router = express.Router();

Router.get("", GetItemsOfPlayer);
Router.post("/purchase", SetPurchased);
Router.post("/select", SetSelected);
Router.get("/purchase", GetPurchased);
Router.get("/select", GetSelected);

module.exports = Router;
