const User = require("./users.model");

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).lean().exec();

    res
      .send({
        success: true,
        message: "List of Users",
        data: users,
      })
      .end();
  } catch (error) {
    console.log(error);
  }
};

const GetUser = async (req, res) => {
  try {
    const _idUser = req.params._id;

    const user = await User.findById({ _id: _idUser }).lean().exec();

    res.send({
      success: true,
      message: "User",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const CreateUser = async (req, res) => {
  try {
    const bdy = req.body;

    const user = await User.create({
      Username: bdy.Username,
      Password: bdy.Password,
      Active: true,
    });

    res
      .send({
        success: true,
        message: "User Created",
        data: user,
      })
      .end();
  } catch (error) {
    console.log(error);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const _idUser = req.params._id;
    const bdy = req.body;

    const updUser = await User.findByIdAndUpdate(
      { _id: _idUser },
      {
        Username: bdy.Username,
        Password: bdy.Password,
      },
      {
        new: true,
      }
    );

    res
      .send({
        success: true,
        message: "User updated",
        data: updUser,
      })
      .end();
  } catch (error) {
    console.log(error);
  }
};

const ChangeStatusUser = async (req, res) => {
  try {
    const _idUser = req.params._id;
    let message = "";

    const oldUser = await User.findById({ _id: _idUser }).lean().exec();
    let user = null;
    if (oldUser != null) {
      user = await User.findByIdAndUpdate(
        { _id: _idUser },
        {
          Active: !oldUser.Active,
        },
        { new: true }
      );
      message = "User active status changed";
    } else {
      message = "User not found";
    }

    res
      .send({
        success: true,
        message: message,
        data: user,
      })
      .end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetAllUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  ChangeStatusUser,
};
