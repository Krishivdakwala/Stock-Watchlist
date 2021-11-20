const app = require("./src/app");
const connectDB = require("./src/db/mongoose");

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
