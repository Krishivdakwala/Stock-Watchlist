const express = require("express");
const router = express.Router();

const Alert = require("../models/alert_model");

router.post("/create", async (req, res) => {
  const { userId, alertName, data } = req.body;
  try {
    const response = await Alert.create({
      userId: userId,
      alertName: alertName,
      data: data,
    });

    res.send({
      status: "ok",
      msg: "alert created",
      data: {
        userId: userId,
        alertName: alertName,
      },
    });

    console.log("Alert Created : ", response);
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

router.post("/update", async (req, res) => {
  const { userId, alertName } = req.body;
  try {
    const alert = await Alert.findOneAndUpdate(
      { userId: userId, alertName: alertName },
      {
        $set: {
          isTriggered: false,
        },
      }
    );

    res.send({
      status: "ok",
      msg: "alert updated to triggered",
      data: {
        userId: userId,
        alertName: alertName,
      },
    });

    console.log("Alert Updated : ", response);
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

module.exports = router;
