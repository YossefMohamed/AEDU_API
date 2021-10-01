const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((e) => {
      console.log("DB Connnnnected");
    })
    .catch((e) => {
        console.log(e)
    });
};

module.exports = connectDB;