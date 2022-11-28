const Items = require("./items.model");

const CreateItem = async (req, res) => {
  try {
    const qry = req.query;

    if (
      qry.Item === undefined ||
      qry.Item === "" ||
      qry.Price === undefined ||
      qry.Price <= 0
    )
      return res.send({
        success: false,
        message: "Item name is mandatory and Price must be higher than 0",
      });

    const newItem = await Items.create({
      Item: qry.Item,
      Price: qry.Price,
    });

    res
      .send({
        success: true,
        message: "Item added!",
        data: newItem,
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

const GetAllItems = async (req, res) => {
  try {
    const listItems = await Items.find().lean().exec();

    res
      .send({
        success: true,
        message: "List of items",
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

const GetItem = async (req, res) => {
  try {
    const qry = req.query;

    if (qry.Item === undefined || qry.Item === "")
      return res
        .send({
          success: false,
          message: "Item name is mandatory",
          data: null,
        })
        .end();

    const item = await Items.findOne({ Item: qry.Item }).lean().exec();

    if (item !== null)
      return res
        .send({
          success: true,
          message: "Item found",
          data: item,
        })
        .end();

    return res
      .send({
        success: false,
        message: "Item not found",
        data: item,
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

module.exports = { CreateItem, GetAllItems, GetItem };
