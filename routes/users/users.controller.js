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

    console.log(bdy.Username, bdy.Password);

    if (
      bdy.Username === "" ||
      bdy.Username === undefined ||
      bdy.Password === "" ||
      bdy.Password === undefined
    )
      return res
        .send({
          success: false,
          message: "Username and Password are mandatory",
          data: null,
        })
        .end();

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

    if (_idUser === undefined || _idUser === "")
      return res
        .send({
          success: false,
          message: "Id User is Mandatory",
          data: null,
        })
        .end();

    if (
      bdy.Username === undefined ||
      bdy.Username === "" ||
      bdy.Password === undefined ||
      bdy.Password === ""
    )
      return res
        .send({
          success: false,
          message: "Username and Password are mandatory",
          data: null,
        })
        .end();

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

const Login = async (req, res) => {
  try {
    const qry = req.query;

    if (
      qry.Username === "" ||
      qry.Username === undefined ||
      qry.Password === "" ||
      qry.Password === undefined
    )
      return res
        .send({
          success: false,
          message: "Username and Password are Mandatory",
          data: null,
        })
        .end();

    const user = await User.findOne({
      Username: qry.Username,
      Password: qry.Password,
    })
      .lean()
      .exec();

    if (user !== null) {
      res
        .send({
          success: true,
          message: "Login success!",
          data: user,
        })
        .end();
    } else {
      res
        .send({
          success: false,
          message: "Login failed",
          data: user,
        })
        .end();
    }
  } catch (error) {
    console.log(error);
  }
};

const AddCredits = async (req, res) => {
  try {
    const qry = req.query;

    if (
      qry.User === undefined ||
      qry.User === "" ||
      qry.Credits === undefined ||
      qry.Credits === ""
    )
      return res
        .send({
          success: false,
          message: "User and Credits to add are mandatory",
          data: null,
        })
        .end();

    const userToAdd = await User.findById({ _id: qry.User }).lean().exec();
    if (userToAdd === null)
      return res
        .send({
          success: false,
          message: "User not found",
          data: false,
        })
        .end();

    const userUpdtd = await User.findByIdAndUpdate(
      { _id: userToAdd._id },
      {
        Credits: userToAdd.Credits + parseInt(qry.Credits),
      },
      { new: true }
    );

    res
      .send({
        success: true,
        message: "Credits added!",
        data: userUpdtd,
      })
      .end();
  } catch (error) {
    console.log(error);
    res
      .send({
        success: false,
        message: error.message,
        data: null,
      })
      .end();
  }
};

module.exports = {
  GetAllUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  ChangeStatusUser,
  Login,
};
