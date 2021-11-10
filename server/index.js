const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./models/user_model");

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
require("./db/mongoose");

app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string") {
    return res.json({ status: "error", error: "Invalid name" });
  }

  if (!password || typeof password !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (password.length < 6) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({
      name: name,
      email: email,
      password: hashed,
    });

    res.send({ status: "ok", msg: "user created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use" });
    }
    throw error;
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email: username }).lean();

  console.log(user);

  if (!user) {
    return res.json({ status: "error", msg: "user doesnt exist" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        username: user.email,
      },
      "stock-watchlist"
    );

    return res.json({ status: "ok", msg: "user logged in", token: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});