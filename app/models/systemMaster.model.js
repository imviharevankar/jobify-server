const mongoose = require("mongoose");

const SystemMaster = mongoose.model(
  "systemMaster",
  new mongoose.Schema(
    {
      dropdown: String,
      values: [String],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = SystemMaster;
