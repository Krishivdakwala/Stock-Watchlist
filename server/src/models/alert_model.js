const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    alertName: {
      type: String,
      required: true,
    },
    isTriggered: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    data: {
      type: String,
    },
  },
  { collection: "users" }
);

const Alert = mongoose.model("AlertSchema", alertSchema);

module.exports = Alert;
