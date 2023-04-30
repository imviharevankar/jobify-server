const mongoose = require("mongoose");

const Dropdown = mongoose.model(
  "dropdown",
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

module.exports = Dropdown;
