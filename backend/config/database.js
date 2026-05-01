const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  try {
    mongoose.connect(await process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};
