const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema(
  {
    Item: { type: String, required: true },
    Price: { type: Number, required: true },
  },
  { versionKey: false }
);

const Items = mongoose.model("Items", ItemsSchema);

module.exports = Items;
