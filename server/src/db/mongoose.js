const mongoose = require("mongoose");

const dbname = "Stocks-DB";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://stock-watchlist:stock-watchlist@cluster0.5wmyu.mongodb.net/${dbname}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
