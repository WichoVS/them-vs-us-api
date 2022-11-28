const Items = require("../items/items.model");
const User = require("../users/users.model");
const ItemsPlayer = require("./itemsPlayer.model");

const GetItemsOfPlayer = async (req, res) => {
  try {
    const qry = req.query;

    if (qry.User === undefined || qry.User === "")
      return res
        .send({
          success: false,
          message: "User is mandatory",
          data: null,
        })
        .end();

    const listItems = await ItemsPlayer.find({ Player: qry.User })
      .lean()
      .exec();

    return res
      .send({
        success: true,
        message: "Items of Player",
        data: listItems,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .send({
        success: false,
        message: error.message,
        data: null,
      })
      .end();
  }
};

const SetPurchased = async (req, res) => {
  try {
    const qry = req.query;

    if (qry.Item === undefined || qry.Item === "")
      return res
        .send({
          success: false,
          message: "Item to purchase is mandatory",
          data: null,
        })
        .end();

    if (qry.User === undefined || qry.User === "")
      return res
        .send({
          success: false,
          message: "User is mandatory",
          data: null,
        })
        .end();

    const userP = await User.findById({ _id: qry.User }).lean().exec();
    const itemP = await Items.findOne({ Item: qry.Item }).lean().exec();

    const checkItemPurchased = await ItemsPlayer.findOne({
      Item: itemP.Item,
      Player: userP._id,
    })
      .lean()
      .exec();

    if (checkItemPurchased !== null)
      return res.send({
        success: false,
        message: "Item is already purchased",
        data: null,
      });

    if (userP === null) {
      return res
        .send({
          success: false,
          message: "User not found, transaction failed",
          data: null,
        })
        .end();
    }

    if (itemP === null) {
      return res
        .send({
          success: false,
          message: "Item not found, transaction failed",
          data: null,
        })
        .end();
    }

    let newItemToPlayer;
    if (userP.Credits < itemP.Price) {
      return res.send({
        success: false,
        message: "Not enough credits!",
        data: false,
      });
    }

    newItemToPlayer = await ItemsPlayer.create({
      Player: userP._id,
      Item: itemP.Item,
      isPurchased: true,
      isSelected: false,
    });

    res
      .send({
        success: true,
        message: "Item purchased by Player",
        data: newItemToPlayer,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .send({
        success: false,
        message: error.message,
        data: null,
      })
      .end();
  }
};

const SetSelected = async (req, res) => {
  try {
    const qry = req.query;

    if (qry.User === undefined || qry.User === "")
      return res
        .send({
          success: false,
          message: "User is mandatory",
          data: false,
        })
        .end();

    if (qry.Item === undefined || qry.Item === "")
      return res
        .send({
          success: false,
          message: "Item is mandatory",
          data: false,
        })
        .end();

    const oldItemSelected = await ItemsPlayer.findOneAndUpdate(
      {
        Player: qry.User,
        isSelected: true,
      },
      {
        isSelected: false,
      },
      { new: false }
    );

    const itemToUpd = await ItemsPlayer.findOneAndUpdate(
      {
        Item: qry.Item,
        Player: qry.User,
      },
      {
        isSelected: true,
      },
      { new: true }
    );

    if (itemToUpd === null)
      return res.send({
        success: false,
        message: "Item cannot be setted as Selected",
        data: false,
      });

    return res.send({
      success: true,
      message: "Item setted as Selected",
      data: itemToUpd,
    });
  } catch (error) {
    console.log(error);
    return res
      .send({
        success: false,
        message: error.message,
        data: null,
      })
      .end();
  }
};

const GetPurchased = async (req, res) => {
  //Regresar una lista con los items como isPurchased = true del jugador
  try {
    const qry = req.query;

    if (qry.User === undefined || qry.User === "")
      return res
        .send({
          success: false,
          message: "User is mandatory",
          data: null,
        })
        .end();

    const pList = await ItemsPlayer.find({
      Player: qry.User,
      isPurchased: true,
    })
      .lean()
      .exec();

    return res
      .send({
        success: true,
        message: "List of items purchased",
        data: pList,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .send({
        success: false,
        message: error.message,
        data: null,
      })
      .end();
  }
};

const GetSelected = async (req, res) => {
  //Regresar una lista con los items como isSelected = true del jugador
  try {
    const qry = req.query;

    if (qry.User === undefined || qry.User === "")
      return res
        .send({
          success: false,
          message: "User is mandatory",
          data: false,
        })
        .end();

    const sList = await ItemsPlayer.find({
      Player: qry.User,
      isSelected: true,
    })
      .lean()
      .exec();

    return res
      .send({
        success: true,
        message: "List of items selected",
        data: sList,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .send({
        success: false,
        message: error.message,
        data: null,
      })
      .end();
  }
};

module.exports = {
  GetItemsOfPlayer,
  SetPurchased,
  SetSelected,
  GetPurchased,
  GetSelected,
};
