const mongoose = require("mongoose");

const Jobs = mongoose.model(
  "jobs",
  new mongoose.Schema(
    {
      jobId: String,
      description: String,
      title: String,
      skills: [String],
      timeline: String,
      category: String,
      createdBy: String,
      location: String,
      amount: Number,
      amountStatus: String,
      deadline: Date,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Jobs;
