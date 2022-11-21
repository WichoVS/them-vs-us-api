const mongoose = require("mongoose");
require("dotenv").config();

const Conectar = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@them-vs-us-dev.gtggf2c.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = Conectar();
