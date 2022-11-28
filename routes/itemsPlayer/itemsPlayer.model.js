const mongoose = require("mongoose");

const ItemsPlayerSchema = new mongoose.Schema(
  {
    Player: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    Item: { type: String, required: true },
    isPurchased: { type: Boolean, required: false },
    isSelected: { type: Boolean, required: false },
  },
  { versionKey: false }
);

const ItemsPlayer = mongoose.model("ItemsPlayer", ItemsPlayerSchema);

module.exports = ItemsPlayer;
