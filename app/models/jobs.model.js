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
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Jobs;
