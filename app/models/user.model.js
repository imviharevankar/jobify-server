const mongoose = require("mongoose");

const User = mongoose.model(
  "USERS",
  new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      location: String,
      isClient: Boolean,
      amountEarned: Number,
      amountSpent: Number,
      jobsPosted: [],
      jobsAssigned: [],
      skills: [],
      // history: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "History",
      //   },
      // ],
      // watchlist: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "watchlist",
      //   },
      // ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
